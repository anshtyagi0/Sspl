document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('.nav').style.display = 'flex'
    let a = document.querySelectorAll('.buttons');
    document.querySelector('.project').style.display = 'flex';
    a.forEach(i => {
        i.style.display = 'flex';
    });
    if (getCookie("email") == ' ' || !getCookie("email")) {
        location.href = '/'
    }
    let url = 'http://localhost:8080/api/projectlist'
    fetch(url).then(response => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
    })
        .then(data => {
            const dataList = document.getElementById("projectList");
            dataList.innerHTML = ""; // Clear any existing options

            data.forEach(project => {
                const option = document.createElement("option");
                option.value = project.name; // or project.title / project.id depending on your API
                dataList.appendChild(option);
            });
        })
        .catch(error => {
            alert('Error while fetching projectlist: ' + error)
        });
    let formname = 'project';
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
    location.href = '/';
}

function validateSubmit() {
    let formname = 'project';
    let po = document.getElementById('po').value;
    if (!po || po.trim() === '') {
        return alert("Please fill data.")
    }
    let sno = document.getElementById('sno').value;
    if (!sno) {
        sno = Number(prompt('I was unable to get SNo. Please enter it manually', '0'));
    }
    let project = document.getElementById("project").value;
    let particulars = document.getElementById('particulars').value;
    let firm = document.getElementById('firm').value;
    let revCA = document.getElementById('revCA').value;
    let revDCDA = document.getElementById('revDCDA').value;
    let cap = document.getElementById('cap').value;
    let importedFE = document.getElementById('importedFE').value;
    let importedRE = document.getElementById('importedRE').value;
    let projectcars = document.getElementById('projectcars').value;
    let capimportedFE = document.getElementById('capimportedFE').value;
    let capimportedRE = document.getElementById('capimportedRE').value;
    let TEDate = document.getElementById('TEDate').value;
    let AllocationRevenue = document.getElementById('arevenue').value;
    let Cash = document.getElementById("Cash").value;
    let AllocationCapital = document.getElementById('allocation').value;
    let email = getCookie('email');
    if (!email) return alert("Please refresh as session terminated.")

    let formdata = {
        "SNo": sno,
        "project": project,
        "PO_No_Dt": po,
        "Particulars": particulars,
        "Name_of_Firm": firm,
        "REV_CA": revCA,
        "REV_DCDA": revDCDA,
        "Cap": cap,
        "Rev_Imported_FE": importedFE,
        "Rev_Imported_RE": importedRE,
        "Project_Cars": projectcars,
        "Cap_Imported_FE": capimportedFE,
        "Cap_Imported_RE": capimportedRE,
        "DV_TE_No_Date": TEDate,
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
            location.href = '/form/add/project.html'
        })
        .catch(error => {
            alert("Error submitting form: " + error.message);
            location.href = '/form/add/project.html'
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