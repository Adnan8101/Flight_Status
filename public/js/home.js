document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, email, password }),
        });

        const data = await res.json();
        if (data.token) {
            alert('Registration successful');
            window.location.href = '/';
        } else {
            alert(data.message);
        }
    } catch (err) {
        console.error(err);
        alert('An error occurred');
    }
});

document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (data.token) {
            alert('Login successful');
            window.location.href = '/home';
        } else {
            alert(data.message);
        }
    } catch (err) {
        console.error(err);
        alert('An error occurred');
    }
});
