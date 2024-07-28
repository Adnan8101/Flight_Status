document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('userName');
    const loginButton = document.getElementById('loginButton');
    const loginSubmitButton = document.getElementById('loginSubmitButton');
    const registerLink = document.getElementById('registerLink');

    if (userName) {
        loginButton.innerText = userName;
        loginButton.onclick = () => {
            const dropdown = document.getElementById('userDropdown');
            dropdown.classList.toggle('show');
        };
    } else {
        loginButton.onclick = () => {
            window.location.href = '/login';
        };
    }

    if (loginSubmitButton) {
        loginSubmitButton.onclick = (event) => {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    localStorage.setItem('userName', data.userName);
                    window.location.href = '/';
                } else {
                    alert('Login failed. Please check your credentials and try again.');
                }
            })
            .catch(error => console.error('Error:', error));
        };
    }

    if (registerLink) {
        registerLink.onclick = (event) => {
            event.preventDefault();
            window.location.href = '/register';
        };
    }
});

function checkAuth(event) {
    fetch('/api/checkAuth')
        .then(response => {
            if (response.status === 401) {
                event.preventDefault();
                const errorPopup = document.getElementById('errorPopup');
                errorPopup.classList.add('show');
                setTimeout(() => errorPopup.classList.remove('show'), 3000);
            }
        })
        .catch(error => console.error('Error:', error));
}
