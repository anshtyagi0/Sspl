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
    document.querySelector('.deleteRecord').style.display = 'flex';
    document.querySelector('.nav').style.display = 'flex';
    if (getCookie("email") == ' ' || !getCookie("email")) {
        location.href = '/'
    }
})

async function validateSubmit() {
    let formname = document.getElementById("form").value;
    let res = await fetch("https://ssplbackend.anshtyagi.com/api/check-role", {
        method: "POST",
        headers: {
            "email": getCookie("email")
        }
    })
    const rodata = await res.json();
    if (rodata.role != 'admin') {
        return (location.href = '/');
    }

    if (formname == 'none' || formname == '' || !formname) return alert("Select valid form from list.");
    else if (formname === 'lpgeneral' || formname === 'training' || formname === 'miscellaneous' || formname === 'fellowship' || formname === 'import' || formname === 'project') {
        let useremail = getCookie("email");
        let sno = document.getElementById("sno").value;
        if (!sno || sno == 0 || sno < 0 ) return alert("Please enter valid Sno.")
        fetch("https://ssplbackend.anshtyagi.com/api/delete-record", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "usermail": useremail
            },
            body: JSON.stringify({
                "tableName": formname,
                "sno": sno
            })
        })
            .then(res => res.text())
            .then(msg => {
                alert(msg);
                location.href = '/form/admin/deleteRecord.html'
            })
            .catch(err => {
                console.error("Error deleting record:", err);
                alert("Failed to delete record. Error: " + err);
            });
    } else {
        return alert("Select valid form from list.");
    }
}

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