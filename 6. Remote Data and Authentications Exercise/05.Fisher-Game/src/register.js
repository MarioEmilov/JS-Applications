const form = document.getElementById('register');
const url = 'http://localhost:3030/users/register';

form.addEventListener('submit', register);

async function register(ev) {
    ev.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get('email');
    const password = formData.get('password');
    const repass = formData.get('rePass');

    if (!email.trim() || !password.trim()) {
        alert('Fill all fields!');
        return;
    }

    if (password.trim() !== repass.trim()) {
        alert('Incorrect password!');
        return;
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    if (!response.ok) {
        const error = await response.json();
        alert(`Error: ${error.message}`);
        return;
    }

    const data = await response.json();
    sessionStorage.setItem('userData', JSON.stringify({ token: data.accessToken, _id: data._id }));
    location.pathname = 'index.html';
}