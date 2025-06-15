document.addEventListener('DOMContentLoaded', async () => {

    document.querySelector('.nav').style.display = 'flex'
    let a = document.querySelectorAll('.buttons');
    document.querySelector('.training').style.display = 'flex';
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
        const response = await fetch(`https://ssplbackend.anshtyagi.com/api/formfetch?sno=${sno}&table=training`);
        if (!response.ok) throw new Error('Failed to fetch data');

        const data = await response.json();
        document.getElementById('sno').value = data.SNo || '';
        document.getElementById('cb').value = data.CB_No_Particulars || '';
        document.getElementById('revCA').value = data.REV_CA || '';
        document.getElementById('revDCDA').value = data.REV_DCDA || '';
        document.getElementById('cep').value = data.CEP || '';
        document.getElementById('regfee').value = data.Reg_Fee_Sem_Symp_Conl_Course || '';
        document.getElementById('coursefee').value = data.Course_Fee || '';
        document.getElementById('highereduRT').value = data.Higher_Edu_RT || '';
        document.getElementById('higheredudirpower').value = data.Higher_Edu_Dir_Power || '';
        document.getElementById('highereduphd').value = data.Higher_Edu_PhD || '';
        document.getElementById('coursebylab').value = data.Course_by_Lab || '';
        document.getElementById('others').value = data.Others || '';
        document.getElementById('chequeNoDVNo').value = data.Cheque_No_DV_No || '';
        document.getElementById('Remarks').value = data.Remarks || '';
        document.getElementById('allocation').value = data.Allocation_Revenue || '';

    } catch (error) {
        console.error('Error fetching training data:', error);
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
    const formname = 'training';

    let cb = document.getElementById('cb').value;
    if (!cb || cb.trim() === '') return alert('Please fill the data.');

    let sno = document.getElementById('sno').value;
    if (!sno) {
        sno = Number(prompt('I was unable to get SNo. Please enter it manually', '0'));
    }

    let revCA = document.getElementById('revCA').value;
    let revDCDA = document.getElementById('revDCDA').value;
    let cep = document.getElementById('cep').value;
    let regfee = document.getElementById('regfee').value;
    let coursefee = document.getElementById('coursefee').value;
    let highereduRT = document.getElementById('highereduRT').value;
    let higheredudirpower = document.getElementById('higheredudirpower').value;
    let highereduphd = document.getElementById('highereduphd').value;
    let coursebylab = document.getElementById('coursebylab').value;
    let others = document.getElementById('others').value;
    let chequeNoDVNo = document.getElementById('chequeNoDVNo').value;
    let remarks = document.getElementById('Remarks').value;
    let allocation = document.getElementById('allocation').value;

    let email = getCookie('email');
    if (!email) return alert("Please refresh as session terminated.");

    let formdata = {
        "CB_No_Particulars": cb,
        "REV_CA": revCA,
        "REV_DCDA": revDCDA,
        "CEP": cep,
        "Reg_Fee_Sem_Symp_Conl_Course": regfee,
        "Course_Fee": coursefee,
        "Higher_Edu_RT": highereduRT,
        "Higher_Edu_Dir_Power": higheredudirpower,
        "Higher_Edu_PhD": highereduphd,
        "Course_by_Lab": coursebylab,
        "Others": others,
        "Cheque_No_DV_No": chequeNoDVNo,
        "Remarks": remarks,
        "Allocation_Revenue": allocation,
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
            location.href = `/form/update/training.html?sno=${sno}`;
        })
        .catch(error => {
            alert("Error updating form: " + error.message);
            location.href = `/form/update/training.html?sno=${sno}`;
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
