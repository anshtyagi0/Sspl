document.addEventListener('DOMContentLoaded', () => {
    fetch("https://ssplbackend.anshtyagi.com/api/check-role", {
        method: "POST",
        headers: {
            "email": getCookie("email")
        }
    }).then((res) => res.json())
        .then((data) => {
            if (data.role != "admin") {
                location.href = '/';
            }
        }).catch((err) => {
            console.error(err);
        })
    let a = document.querySelectorAll('.buttons');
    document.querySelector('.heading').style.display = 'flex';
    document.querySelector('.nav').style.display = 'flex';
    a.forEach(i => {
        i.style.display = 'flex';
    });
    if (getCookie("email") == ' ' || !getCookie("email")) {
        location.href = '/'
    }
})
function back() {
    window.history.back();
}
function signout() {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    location.href = '/';
}

function getCookie(c_name) {
    const nameEQ = c_name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length));
    }
    return null;
}