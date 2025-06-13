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
    let sno = document.getElementById('sno').value;
    if (select == 'none') {
        alert('Please select a valid option.')
    } else if (!sno || isNaN(sno) || sno < 0) {
        alert("Please enter a valid SNo.")
    } else if (select == 'lp-general' && sno) {
        location.href = `/form/update/lpgeneral.html?sno=${sno}`;
    } else if (select == 'training' && sno) {
        location.href = `/form/update/training.html?sno=${sno}`;
    } else if (select == 'misc' && sno) {
        location.href = `/form/update/misc.html?sno=${sno}`;
    } else if (select == 'fellowship' && sno) {
        location.href = `/form/update/fellowship.html?sno=${sno}`;
    } else if (select == 'import' && sno) {
        location.href = `/form/update/import.html?sno=${sno}`;
    } else if (select == 'project' && sno) {
        location.href = `/form/update/project.html?sno=${sno}`;
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