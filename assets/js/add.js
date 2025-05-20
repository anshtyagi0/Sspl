document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelector('.loader').style.display = 'none';
        let a = document.querySelectorAll('.select');
        document.querySelector('.heading').style.display = 'flex';
        a.forEach(i => {
            i.style.display = 'flex';
        });
        document.querySelector('.btn').style.display = 'block';
    }, 1500);
    if (getCookie("email") == ' ' || !getCookie("email")) {
        location.href = '/'
    }
})


function formcheck() {
    let select = document.getElementById('select-menu').value;
    if (select == 'none') {
        alert('Please select a valid option.')
    } else if (select == 'lp-general') {
        location.href = '/form/add/lpgeneral.html';
    } else if (select == 'training') {
        return;
    } else if (select == 'misc') {
        return;
    } else if (select == 'fellowship') {
        return;
    } else if (select == 'import') {
        return;
    } else if (select == 'project') {
        location.href = '/form/add/project.html';
    } else {
        alert('Please select a valid option.')
    }
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