document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelector('.loader').style.display = 'none';
        let a = document.querySelectorAll('.buttons');
        document.querySelector('.miscellaneous').style.display = 'flex';
        a.forEach(i => {
            i.style.display = 'flex';
        });
    }, 1500);
    if (getCookie("email") == ' ' || !getCookie("email")) {
        location.href = '/'
    }
})

function validateSubmit() {
    let formname = 'miscellaneous';

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
            location.href = '/form/add/misc.html'
        })
        .catch(error => {
            alert("Error submitting form: " + error.message);
            location.href = '/form/add/misc.html'
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