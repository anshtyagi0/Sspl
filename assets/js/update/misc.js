document.addEventListener('DOMContentLoaded', async () => {

    document.querySelector('.nav').style.display = 'flex'
    let a = document.querySelectorAll('.buttons');
    document.querySelector('.miscellaneous').style.display = 'flex';
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
        const response = await fetch(`https://ssplbackend.anshtyagi.com/api/formfetch?sno=${sno}&table=miscellaneous`);
        if (!response.ok) throw new Error('Failed to fetch data');

        const data = await response.json();
        document.getElementById('sno').value = data.SNo || '';
        document.getElementById('cb').value = data.CB_No_Particulars || '';
        document.getElementById('revCA').value = data.REV_CA || '';
        document.getElementById('revDCDA').value = data.REV_DCDA || '';
        document.getElementById('otherActivity').value = data.Other_Activity || '';
        document.getElementById('securitycont').value = data.Security_Cont || '';
        document.getElementById('hygienemaintcont').value = data.Hygiene_Maint_Cont || '';
        document.getElementById('environcontrol').value = data.Environ_Control || '';
        document.getElementById('tel').value = data.Tel_R || '';
        document.getElementById('rajbhasha').value = data.Rajbhasha || '';
        document.getElementById('officeentt').value = data.Office_Entt || '';
        document.getElementById('stationarypostage').value = data.Stationary_Postage || '';
        document.getElementById('officeappliance').value = data.Office_Appliance || '';
        document.getElementById('labourwelfare').value = data.Labour_Welfare || '';
        document.getElementById('membfeesociety').value = data.Memb_Fee_Society || '';
        document.getElementById('apprenticefee').value = data.Apprentice_Fee || '';
        document.getElementById('racceptaminterview').value = data.RAC_CEPTAM_Interview || '';
        document.getElementById('honararium').value = data.Honararium || '';
        document.getElementById('tanondrdopers').value = data.TA_Non_DRDO_Pers || '';
        document.getElementById('printingbinding').value = data.Printing_Binding || '';
        document.getElementById('othermisc').value = data.Other_Misc || '';
        document.getElementById('chequeNoDVNo').value = data.Cheque_No_DV_No || '';
        document.getElementById('remarks').value = data.Remarks || '';
        document.getElementById('allocation').value = data.Allocation_Revenue || '';
        document.getElementById('cashassignment').value = data.Cash_Assignment || '';

    } catch (error) {
        console.error('Error fetching miscellaneous data:', error);
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
    const formname = 'miscellaneous';

    let sno = document.getElementById('sno').value;
    if (!sno) {
        sno = Number(prompt('I was unable to get SNo. Please enter it manually', '0'));
    }

    let cb = document.getElementById('cb').value;
    if (!cb || cb.trim() === '') return alert('Please fill the data.');

    let revCA = document.getElementById('revCA').value;
    let revDCDA = document.getElementById('revDCDA').value;
    let otherActivity = document.getElementById('otherActivity').value;
    let securitycont = document.getElementById('securitycont').value;
    let hygienemaintcont = document.getElementById('hygienemaintcont').value;
    let environcontrol = document.getElementById('environcontrol').value;
    let tel = document.getElementById('tel').value;
    let rajbhasha = document.getElementById('rajbhasha').value;
    let officeentt = document.getElementById('officeentt').value;
    let stationarypostage = document.getElementById('stationarypostage').value;
    let officeappliance = document.getElementById('officeappliance').value;
    let labourwelfare = document.getElementById('labourwelfare').value;
    let membfeesociety = document.getElementById('membfeesociety').value;
    let apprenticefee = document.getElementById('apprenticefee').value;
    let racceptaminterview = document.getElementById('racceptaminterview').value;
    let honararium = document.getElementById('honararium').value;
    let tanondrdopers = document.getElementById('tanondrdopers').value;
    let printingbinding = document.getElementById('printingbinding').value;
    let othermisc = document.getElementById('othermisc').value;
    let chequeNoDVNo = document.getElementById('chequeNoDVNo').value;
    let remarks = document.getElementById('remarks').value;
    let allocation = document.getElementById('allocation').value;
    let cashassignment = document.getElementById('cashassignment').value;

    let email = getCookie('email');
    if (!email) return alert("Please refresh as session terminated.");

    let formdata = {
        "CB_No_Particulars": cb,
        "REV_CA": revCA,
        "REV_DCDA": revDCDA,
        "Other_Activity": otherActivity,
        "Security_Cont": securitycont,
        "Hygiene_Maint_Cont": hygienemaintcont,
        "Environ_Control": environcontrol,
        "Tel_R": tel,
        "Rajbhasha": rajbhasha,
        "Office_Entt": officeentt,
        "Stationary_Postage": stationarypostage,
        "Office_Appliance": officeappliance,
        "Labour_Welfare": labourwelfare,
        "Memb_Fee_Society": membfeesociety,
        "Apprentice_Fee": apprenticefee,
        "RAC_CEPTAM_Interview": racceptaminterview,
        "Honararium": honararium,
        "TA_Non_DRDO_Pers": tanondrdopers,
        "Printing_Binding": printingbinding,
        "Other_Misc": othermisc,
        "Cheque_No_DV_No": chequeNoDVNo,
        "Remarks": remarks,
        "Allocation_Revenue": allocation,
        "Cash_Assignment": cashassignment,
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
            location.href = `/form/update/misc.html?sno=${sno}`;
        })
        .catch(error => {
            alert("Error updating form: " + error.message);
            location.href = `/form/update/misc.html?sno=${sno}`;
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
