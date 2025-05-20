document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelector('.loader').style.display = 'none';
        let a = document.querySelectorAll('.buttons');
        document.querySelector('.project').style.display = 'flex';
        a.forEach(i => {
            i.style.display = 'flex';
        });
    }, 1500);
    if (getCookie("email") == ' ' || !getCookie("email")) {
        location.href = '/'
    }
    let url = 'http://ssplbackend.anshtyagi.com/api/projects'
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
            alert('Error while fetching projects: ' + error)
        });
})

function validateSubmit() {
    let formname = 'project';
    let po = document.getElementById('po').value;
    if (!po || po.trim() === '') {
        return alert("Please fill data.")
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
     fetch("http://ssplbackend.anshtyagi.com/api/add/form", {
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
        location.href='/form/add/project.html'
    })
    .catch(error => {
        alert("Error submitting form: " + error.message);
        location.href='/form/add/project.html'
    });

}
function getCookie(c_name) {
    const nameEQ = c_name + "=";
    const ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length));
    }
    return null;
}