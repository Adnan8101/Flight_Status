document.getElementById('showSignupForm').addEventListener('click', function() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('signupContainer').style.display = 'block';
});

document.getElementById('showLoginForm').addEventListener('click', function() {
    document.getElementById('signupContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'block';
});

document.getElementById('signupForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('signupPassword').value;

    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName, lastName, phoneNumber, email, password })
    });

    const result = await response.json();
    showNotification(result.message, result.success);

    if (result.success) {
        setTimeout(() => {
            document.getElementById('signupContainer').style.display = 'none';
            document.getElementById('loginContainer').style.display = 'block';
        }, 2000);
    }
});

document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    showNotification(result.message, result.success);

    if (result.success) {
        setTimeout(() => {
            window.location.href = '/home';
        }, 2000);
    }
});

function showNotification(message, success) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.backgroundColor = success ? '#4caf50' : '#f44336';
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}
