document.addEventListener('DOMContentLoaded', () => {
    let a = document.querySelectorAll('.select');
    document.querySelector('.heading').style.display = 'flex';
    a.forEach(i => {
        i.style.display = 'flex';
    });
    document.querySelector('.nav').style.display = 'flex'
    document.querySelector('.btn').style.display = 'block';
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
    location.href='/';
}


function formcheck() {
    let select = document.getElementById('select-menu').value;
    if (select == 'none') {
        alert('Please select a valid option.')
    } else if (select == 'lp-general') {
        location.href = '/form/add/lpgeneral.html';
    } else if (select == 'training') {
        location.href = '/form/add/training.html';
    } else if (select == 'misc') {
        location.href = '/form/add/misc.html';
    } else if (select == 'fellowship') {
        location.href = '/form/add/fellowship.html';
    } else if (select == 'import') {
        location.href = '/form/add/import.html';
    } else if (select == 'project') {
        location.href = '/form/add/project.html';
    } else {
        alert('Please select a valid option.')
    }
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