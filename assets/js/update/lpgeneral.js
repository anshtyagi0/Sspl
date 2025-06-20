document.addEventListener('DOMContentLoaded', async () => {

    document.querySelector('.nav').style.display = 'flex'
    let a = document.querySelectorAll('.buttons');
    document.querySelector('.lpgeneral').style.display = 'flex';
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
        const response = await fetch(`https://ssplbackend.anshtyagi.com/api/formfetch?sno=${sno}&table=lpgeneral`);
        if (!response.ok) throw new Error('Failed to fetch data');

        const data = await response.json();
        document.getElementById('sno').value = data.SNo || '';
        document.getElementById('cb').value = data.CB_No_Particulars || '';
        document.getElementById('revCA').value = data.REV_CA || '';
        document.getElementById('revDCDA').value = data.REV_DCDA || '';
        document.getElementById('cap').value = data.Cap || '';
        document.getElementById('Projtask').value = data.Proj_Task || '';
        document.getElementById('buildup').value = data.Build_up || '';
        document.getElementById('Maint').value = data.Maint || '';
        document.getElementById('tptmainthiring').value = data.Tpt_Maint_Hiring_FOL || '';
        document.getElementById('Bookjournal').value = data.Books_journal || '';
        document.getElementById('infotech').value = data.Info_tech || '';
        document.getElementById('DGSD').value = data.DGSD || '';
        document.getElementById('others').value = data.Others || '';
        document.getElementById('chequeNoDVNo').value = data.Cheque_No_DV_No || '';
        document.getElementById('Remarks').value = data.Remarks || '';
        document.getElementById('arevenue').value = data.Allocation_Revenue || '';
        document.getElementById('Cash').value = data.Cash_Assignment || '';
        document.getElementById('allocation').value = data.Allocation_Capital || '';

    } catch (error) {
        console.error('Error fetching lpgeneral data:', error);
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
    const formname = 'lpgeneral';

    let sno = document.getElementById('sno').value;
    if (!sno) {
        sno = Number(prompt('I was unable to get SNo. Please enter it manually', '0'));
    }

    const cb = document.getElementById('cb').value;
    if (!cb || cb.trim() === '') {
        return alert("Please enter CB No Particulars.");
    }

    const revCA = document.getElementById('revCA').value;
    const revDCDA = document.getElementById('revDCDA').value;
    const cap = document.getElementById('cap').value;
    const Projtask = document.getElementById('Projtask').value;
    const buildup = document.getElementById('buildup').value;
    const Maint = document.getElementById('Maint').value;
    const tptmainthiring = document.getElementById('tptmainthiring').value;
    const Bookjournal = document.getElementById('Bookjournal').value;
    const infotech = document.getElementById('infotech').value;
    const DGSD = document.getElementById('DGSD').value;
    const others = document.getElementById('others').value;
    const chequeNoDVNo = document.getElementById('chequeNoDVNo').value;
    const remarks = document.getElementById('Remarks').value;
    const AllocationRevenue = document.getElementById('arevenue').value;
    const Cash = document.getElementById("Cash").value;
    const AllocationCapital = document.getElementById('allocation').value;

    const email = getCookie('email');
    if (!email) return alert("Please refresh as session expired or not logged in.");

    const formdata = {
        "CB_No_Particulars": cb,
        "REV_CA": revCA,
        "REV_DCDA": revDCDA,
        "Cap": cap,
        "Proj_Task": Projtask,
        "Build_up": buildup,
        "Maint": Maint,
        "Tpt_Maint_Hiring_FOL": tptmainthiring,
        "Books_journal": Bookjournal,
        "Info_tech": infotech,
        "DGSD": DGSD,
        "Others": others,
        "Cheque_No_DV_No": chequeNoDVNo,
        "Remarks": remarks,
        "Allocation_Revenue": AllocationRevenue,
        "Cash_Assignment": Cash,
        "Allocation_Capital": AllocationCapital,
        "Created_by": email
    };

    fetch("https://ssplbackend.anshtyagi.com/api/formupdate", {
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
            location.href = `/form/update/lpgeneral.html?sno=${sno}`;
        })
        .catch(error => {
            alert("Error updating form: " + error.message);
            location.href = `/form/update/lpgeneral.html?sno=${sno}`;
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
