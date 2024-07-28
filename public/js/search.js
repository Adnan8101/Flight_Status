document.getElementById('searchForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const flightNumber = document.getElementById('flightNumber').value;

    try {
        const response = await fetch('/api/searchFlights', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ flightNumber })
        });

        const result = await response.json();
        if (result.success) {
            displayResults(result.data);
        } else {
            document.getElementById('results').innerHTML = '<p>No flight found.</p>';
        }
    } catch (error) {
        console.error('Error searching flights:', error);
        document.getElementById('results').innerHTML = '<p>Error searching flights. Please try again later.</p>';
    }
});

function displayResults(data) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (!data) {
        resultsContainer.innerHTML = '<p>No flight found.</p>';
        return;
    }

    const flightInfo = `
        <p><strong>Flight Number:</strong> ${data.flight.iata}</p>
        <p><strong>Airline:</strong> ${data.airline.name}</p>
        <p><strong>Departure Airport:</strong> ${data.departure.airport}</p>
        <p><strong>Arrival Airport:</strong> ${data.arrival.airport}</p>
        <p><strong>Status:</strong> ${data.flight_status}</p>
        <p><strong>Scheduled Departure:</strong> ${data.departure.scheduled}</p>
        <p><strong>Scheduled Arrival:</strong> ${data.arrival.scheduled}</p>
    `;

    resultsContainer.innerHTML = flightInfo;
}
