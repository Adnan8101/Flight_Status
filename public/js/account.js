document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('/api/account', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        if (result.success) {
            document.getElementById('firstName').value = result.user.firstName;
            document.getElementById('lastName').value = result.user.lastName;
            document.getElementById('phoneNumber').value = result.user.phoneNumber;
            document.getElementById('email').value = result.user.email;
        } else {
            alert('Failed to load account details.');
        }
    } catch (error) {
        console.error('Error fetching account details:', error);
    }

    document.getElementById('editButton').addEventListener('click', function() {
        toggleEditMode(true);
    });

    document.getElementById('saveButton').addEventListener('click', async function() {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const email = document.getElementById('email').value;

        try {
            const response = await fetch('/api/updateAccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ firstName, lastName, phoneNumber, email })
            });

            const result = await response.json();
            if (result.success) {
                alert('Account details updated successfully.');
                toggleEditMode(false);
            } else {
                alert('Failed to update account details.');
            }
        } catch (error) {
            console.error('Error updating account details:', error);
        }
    });

    document.getElementById('cancelButton').addEventListener('click', function() {
        toggleEditMode(false);
    });

    document.getElementById('homeButton').addEventListener('click', function() {
        window.location.href = '/';
    });

    function toggleEditMode(editMode) {
        const isReadOnly = !editMode;
        document.getElementById('firstName').readOnly = isReadOnly;
        document.getElementById('lastName').readOnly = isReadOnly;
        document.getElementById('phoneNumber').readOnly = isReadOnly;
        document.getElementById('email').readOnly = isReadOnly;
        document.getElementById('editButton').style.display = isReadOnly ? 'inline' : 'none';
        document.getElementById('saveButton').style.display = editMode ? 'inline' : 'none';
        document.getElementById('cancelButton').style.display = editMode ? 'inline' : 'none';
    }
});
