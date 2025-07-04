document.addEventListener('DOMContentLoaded', async () => {

    document.querySelector('.nav').style.display = 'flex'
    let a = document.querySelectorAll('.buttons');
    document.querySelector('.project').style.display = 'flex';
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
    let url = 'https://ssplbackend.anshtyagi.com/api/projectlist'
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
    try {
        const response = await fetch(`https://ssplbackend.anshtyagi.com/api/formfetch?sno=${sno}&table=project`);
        if (!response.ok) throw new Error('Failed to fetch data');

        const data = await response.json();
        document.getElementById('sno').value = data.SNo || '';
        document.getElementById('po').value = data.PO_No_Dt || '';
        document.getElementById('project').value = data.project || '';
        document.getElementById('particulars').value = data.Particulars || '';
        document.getElementById('firm').value = data.Name_of_Firm || '';
        document.getElementById('revCA').value = data.REV_CA || '';
        document.getElementById('revDCDA').value = data.REV_DCDA || '';
        document.getElementById('cap').value = data.Cap || '';
        document.getElementById('importedFE').value = data.Rev_Imported_FE || '';
        document.getElementById('importedRE').value = data.Rev_Imported_RE || '';
        document.getElementById('projectcars').value = data.Project_Cars || '';
        document.getElementById('capimportedFE').value = data.Cap_Imported_FE || '';
        document.getElementById('capimportedRE').value = data.Cap_Imported_RE || '';
        document.getElementById('TEDate').value = data.DV_TE_No_Date || '';
        document.getElementById('arevenue').value = data.Allocation_Revenue || '';
        document.getElementById('Cash').value = data.Cash_Assignment || '';
        document.getElementById('allocation').value = data.Allocation_Capital || '';

    } catch (error) {
        console.error('Error fetching project data:', error);
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
    let formname = 'project';
    let po = document.getElementById('po').value;
    if (!po || po.trim() === '') {
        return alert("Please fill data.");
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
    if (!email) return alert("Please refresh as session terminated.");

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
            location.href = `/form/update/project.html?sno=${sno}`;
        })
        .catch(error => {
            alert("Error updating form: " + error.message);
            location.href = `/form/update/project.html?sno=${sno}`;
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
