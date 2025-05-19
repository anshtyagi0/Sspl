document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelector('.loader').style.display = 'none';
        document.querySelector('.login').style.display = 'flex';
    }, 1500);
    if(getCookie('user') !== '') {
        location.href='./main.html'
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
    if (email=='abc@abc.com' && pass=='123') {
        createCookie('user', email, 1)
        location.href='./main.html'
    } else {
        alert("login failed.")
    }
}
function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}