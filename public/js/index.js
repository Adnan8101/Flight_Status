document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('/api/checkAuth', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        if (result.authenticated) {
            const userSection = document.getElementById('userSection');
            userSection.innerHTML = `
                <button id="userNameButton">${result.user.firstName}</button>
                <div id="userDropdown" class="dropdown-content">
                    <a href="#" id="accountLink">Account</a>
                    <a href="#" id="signoutLink">Sign out</a>
                </div>
            `;

            document.getElementById('userNameButton').addEventListener('click', function() {
                const dropdown = document.getElementById('userDropdown');
                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
            });

            document.getElementById('accountLink').addEventListener('click', function() {
                window.location.href = '/account';
            });

            document.getElementById('signoutLink').addEventListener('click', function() {
                signOut();
            });
        }
    } catch (error) {
        console.error('Error checking authentication:', error);
    }
});

function signOut() {
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/login';
}
