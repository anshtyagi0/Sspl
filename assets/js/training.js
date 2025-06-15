document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('.nav').style.display = 'flex'
    let a = document.querySelectorAll('.buttons');
    document.querySelector('.training').style.display = 'flex';
    a.forEach(i => {
        i.style.display = 'flex';
    });
    if (getCookie("email") == ' ' || !getCookie("email")) {
        location.href = '/'
    }
    let formname = 'training';
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
    let formname = 'training';
    let cb = document.getElementById('cb').value;
    if (!cb || cb.trim() === '') return alert('Please fill the data.')
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
        "SNo": sno,
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
    }

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
            location.href = '/form/add/training.html'
        })
        .catch(error => {
            alert("Error submitting form: " + error.message);
            location.href = '/form/add/training.html'
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