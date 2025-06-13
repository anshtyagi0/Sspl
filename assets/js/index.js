document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelector('.loader').style.display = 'none';
        document.querySelector('.login').style.display = 'flex';
    }, 1500);
    if (getCookie('email') || getCookie('email').length > 0) {
        location.href = './main.html'
    }
});

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const icon = document.querySelector('.show-icon');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    }
}

function validateLogin() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById("password").value;
    const url = 'http://localhost:8080/api/login';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: pass })
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw err; });
            }
            return response.json();
        })
        .then(data => {
            if (data.user === "matched") {
                // Set cookie for 1 hour (1/24 of a day)
                createCookie("email", email);
                createCookie("role", data.role);
                location.href = '/main.html'
                // Redirect or other logic here
            } else {
                alert("Login failed: Invalid credentials.");
            }
        })
        .catch(err => {
            alert("Login failed: Invalid credentials.");
            console.log("Login error: " + (err.message || "Unknown error"));
        });
}

function createCookie(name, value) {
    const hours = 1;
    const date = new Date();
    date.setTime(date.getTime() + (hours * 60 * 60 * 1000)); // convert hours to milliseconds
    const expires = "; expires=" + date.toUTCString();
    const secure = "; Secure";
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/" + secure;
}

function getCookie(c_name) {
    const nameEQ = c_name + "=";
    const ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length));
    }
    return null;
}
