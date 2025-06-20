document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('.nav').style.display = 'flex'
    let a = document.querySelectorAll('.buttons');
    document.querySelector('.lpgeneral').style.display = 'flex';
    a.forEach(i => {
        i.style.display = 'flex';
    });

    if (getCookie('email') == ' ' || !getCookie('email')) {
        location.href = '/'
    }
    let formname = 'lpgeneral';
    fetch(`http://localhost:8080/api/sno/${formname}`).then(response => {
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
    location.href='/';
}

function validateSubmit() {
    let formname = 'lpgeneral';
    let cb = document.getElementById('cb').value;
    if (!cb || cb.trim() === '') {
        return alert("Please fill data.")
    }
    let sno = document.getElementById('sno').value;
    if (!sno) {
        sno = Number(prompt('I was unable to get SNo. Please enter it manually', '0'));
    }
    let revCA = document.getElementById('revCA').value;
    let revDCDA = document.getElementById('revDCDA').value;
    let cap = document.getElementById('cap').value;
    let Projtask = document.getElementById('Projtask').value;
    let buildup = document.getElementById('buildup').value;
    let Maint = document.getElementById('Maint').value;
    let tptmainthiring = document.getElementById('tptmainthiring').value;
    let Bookjournal = document.getElementById('Bookjournal').value;
    let infotech = document.getElementById('infotech').value;
    let DGSD = document.getElementById('DGSD').value;
    let others = document.getElementById('others').value;
    let chequeNoDVNo = document.getElementById('chequeNoDVNo').value;
    let remarks = document.getElementById('Remarks').value;
    let AllocationRevenue = document.getElementById('arevenue').value;
    let Cash = document.getElementById("Cash").value;
    let AllocationCapital = document.getElementById('allocation').value;
    let email = getCookie('email');
    if (!email) return alert("Please refresh as session terminated.")

    let formdata = {
        "SNo": sno,
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
    }
    fetch("http://localhost:8080/api/add/form", {
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
            location.href = '/form/add/lpgeneral.html'
        })
        .catch(error => {
            alert("Error submitting form: " + error.message);
            location.href = '/form/add/lpgeneral.html'
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
