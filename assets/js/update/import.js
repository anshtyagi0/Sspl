document.addEventListener('DOMContentLoaded', async () => {

    document.querySelector('.nav').style.display = 'flex'
    let a = document.querySelectorAll('.buttons');
    document.querySelector('.import').style.display = 'flex';
    a.forEach(i => {
        i.style.display = 'flex';
    });

    if (getCookie('email') == ' ' || !getCookie('email')) {
        location.href = '/'
    }
    const urlParams = new URLSearchParams(window.location.search);
    const sno = urlParams.get('sno');
    if (!sno) {
        alert('S No not provided in URL');
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/api/formfetch?sno=${sno}&table=import`);
        if (!response.ok) throw new Error('Failed to fetch data');

        const data = await response.json();
        document.getElementById('sno').value = data.SNo || '';
        document.getElementById('PONoAndDt').value = data.PO_No_And_Date || '';
        document.getElementById('Particulars').value = data.Particulars || '';
        document.getElementById('SupplyAgency').value = data.Supply_Agency || '';
        document.getElementById('importedFE').value = data.REV_Imported_FE || '';
        document.getElementById('importedRE').value = data.REV_Imported_RE || '';
        document.getElementById('CapimportedFE').value = data.CAP_Imported_FE || '';
        document.getElementById('CapimportedRE').value = data.CAP_Imported_RE || '';
        document.getElementById('revDCDA').value = data.REV_DCDA || '';
        document.getElementById('capDCDA').value = data.CAP_DCDA || '';
        document.getElementById('DV_TENo').value = data.DV_TE_No || '';
        document.getElementById('Remarks').value = data.Remarks || '';

    } catch (error) {
        console.error('Error fetching import data:', error);
        alert('Could not fetch data. Please try again later.');
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

function validateSubmit() {
    const formname = 'import';

    const PONoAndDt = document.getElementById('PONoAndDt').value;
    if (!PONoAndDt || PONoAndDt.trim() === '') return alert('Please enter PO No and Date.');

    let sno = document.getElementById('sno').value;
    if (!sno) {
        sno = Number(prompt('I was unable to get SNo. Please enter it manually', '0'));
    }

    const Particulars = document.getElementById('Particulars').value;
    const SupplyAgency = document.getElementById('SupplyAgency').value;
    const importedFE = document.getElementById('importedFE').value;
    const importedRE = document.getElementById('importedRE').value;
    const CapimportedFE = document.getElementById('CapimportedFE').value;
    const CapimportedRE = document.getElementById('CapimportedRE').value;
    const revDCDA = document.getElementById('revDCDA').value;
    const capDCDA = document.getElementById('capDCDA').value;
    const DV_TENo = document.getElementById('DV_TENo').value;
    const Remarks = document.getElementById('Remarks').value;

    const email = getCookie('email');
    if (!email) return alert("Please refresh as session expired or not logged in.");

    const formdata = {
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

    fetch("http://localhost:8080/api/formupdate", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "formname": formname,
            "sno": sno
        },
        body: JSON.stringify(formdata)
    })
        .then(response => {
            if (!response.ok) {
                return response.text().then(err => { throw new Error(err); });
            }
            return response.text();
        })
        .then(result => {
            alert("Success: " + result);
            location.href = `/form/update/import.html?sno=${sno}`;
        })
        .catch(error => {
            alert("Error updating form: " + error.message);
            location.href = `/form/update/import.html?sno=${sno}`;
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
