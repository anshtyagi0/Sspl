document.addEventListener('DOMContentLoaded', async () => {

    document.querySelector('.nav').style.display = 'flex'
    let a = document.querySelectorAll('.buttons');
    document.querySelector('.fellowship').style.display = 'flex';
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
        const response = await fetch(`http://localhost:8080/api/formfetch?sno=${sno}&table=fellowship`);
        if (!response.ok) throw new Error('Failed to fetch data');

        const data = await response.json();
        document.getElementById('sno').value = data.SNo || '';
        document.getElementById('cb').value = data.CB_No_Particulars || '';
        document.getElementById('revCA').value = data.REV_CA || '';
        document.getElementById('revDCDA').value = data.REV_DCDA || '';
        document.getElementById('chequeNoDVNo').value = data.Cheque_No_DV_No || '';
        document.getElementById('Remarks').value = data.Remarks || '';
        document.getElementById('Allocation').value = data.Allocation_Revenue || '';

    } catch (error) {
        console.error('Error fetching fellowship data:', error);
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
    const formname = 'fellowship';

    const cb = document.getElementById('cb').value;
    if (!cb || cb.trim() === '') return alert('Please fill the CB No Particulars.');

    let sno = document.getElementById('sno').value;
    if (!sno) {
        sno = Number(prompt('SNo not found. Please enter it manually:', '0'));
        if (!sno || isNaN(sno)) return alert("Invalid SNo.");
    }

    const revCA = document.getElementById('revCA').value;
    const revDCDA = document.getElementById('revDCDA').value;
    const chequeNoDVNo = document.getElementById('chequeNoDVNo').value;
    const remarks = document.getElementById('Remarks').value;
    const allocation = document.getElementById('Allocation').value;

    const email = getCookie('email');
    if (!email) return alert("Session expired. Please refresh the page.");

    const formdata = {
        "CB_No_Particulars": cb,
        "REV_CA": revCA,
        "REV_DCDA": revDCDA,
        "Cheque_No_DV_No": chequeNoDVNo,
        "Remarks": remarks,
        "Allocation_Revenue": allocation,
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
            location.href = `/form/update/fellowship.html?sno=${sno}`;
        })
        .catch(error => {
            alert("Error updating form: " + error.message);
            location.href = `/form/update/fellowship.html?sno=${sno}`;
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
