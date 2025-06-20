document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('.nav').style.display = 'flex'
    let a = document.querySelectorAll('.buttons');
    document.querySelector('.import').style.display = 'flex';
    a.forEach(i => {
        i.style.display = 'flex';
    });

    if (getCookie('email') == ' ' || !getCookie('email')) {
        location.href = '/'
    }
    let formname = 'import';
    fetch(`https://ssplbackend.anshtyagi.com/api/sno/${formname}`).then(response => {
        if (!response.ok) {
            return response.text().then(err => { throw new Error(err); });
        }
        return response.text();
    }).then(sno => {
        document.getElementById('sno').value = parseInt(sno);
    }).catch(error => {
        console.error('Error fetching sno:', error.message);
    });
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

function validateSubmit() {
    let formname = 'import';

    let PONoAndDt = document.getElementById('PONoAndDt').value;
    if (!PONoAndDt || PONoAndDt.trim() === '') return alert('Please enter PO No and Date.');
    let sno = document.getElementById('sno').value;
    if (!sno) {
        sno = Number(prompt('I was unable to get SNo. Please enter it manually', '0'));
    }
    let Particulars = document.getElementById('Particulars').value;
    let SupplyAgency = document.getElementById('SupplyAgency').value;
    let importedFE = document.getElementById('importedFE').value;
    let importedRE = document.getElementById('importedRE').value;
    let CapimportedFE = document.getElementById('CapimportedFE').value;
    let CapimportedRE = document.getElementById('CapimportedRE').value;
    let revDCDA = document.getElementById('revDCDA').value;
    let capDCDA = document.getElementById('capDCDA').value;
    let DV_TENo = document.getElementById('DV_TENo').value;
    let Remarks = document.getElementById('Remarks').value;

    let email = getCookie('email');
    if (!email) return alert("Please refresh as session expired or not logged in.");

    let formdata = {
        "SNo": sno,
        "PO_No_And_Date": PONoAndDt,
        "Particulars": Particulars,
        "Supply_Agency": SupplyAgency,
        "REV_Imported_FE": importedFE,
        "REV_Imported_RE": importedRE,
        "CAP_Imported_FE": CapimportedFE,
        "CAP_Imported_RE": CapimportedRE,
        "REV_DCDA": revDCDA,
        "CAP_DCDA": capDCDA,
        "DV_TE_No": DV_TENo,
        "Remarks": Remarks,
        "Created_by": email
    };

    fetch("https://ssplbackend.anshtyagi.com/api/add/form", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "formname": formname
        },
        body: JSON.stringify(formdata)
    }).then(response => {
        if (!response.ok) {
            return response.text().then(err => { throw new Error(err); });
        }
        return response.text();
    })
        .then(result => {
            alert("Success: " + result);
            location.href = '/form/add/import.html'
        })
        .catch(error => {
            alert("Error submitting form: " + error.message);
            location.href = '/form/add/import.html'
        });

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
