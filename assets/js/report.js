document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.heading').style.display = 'flex';
    document.querySelector('.nav').style.display = 'flex';
    const tableWrapper = document.getElementById("tableWrapper");
    tableWrapper.scrollLeft = 0;
    if (getCookie("email") == ' ' || !getCookie("email")) {
        location.href = '/'
    }
})
const headersMap = {
    lpgeneral: {
        SNo: "S No",
        CB_No_Particulars: "CB No Particulars",
        REV_CA: "Rev CA",
        REV_DCDA: "Rev DCDA",
        Cap: "Cap",
        Proj_Task: "Proj Task",
        Build_up: "Build UP",
        Maint: "Maint",
        Tpt_Maint_Hiring_FOL: "Tpt Maint Hiring FOL",
        Books_journal: "Books Journal",
        Info_tech: "Info Tech",
        DGSD: "DGSD",
        Others: "others",
        Cheque_No_DV_No: "Cheque No DV No",
        Remarks: "Remarks",
        Allocation_Revenue: "Allocation Revenue",
        Cash_Assignment: "Cash Assignment",
        Allocation_Capital: "Allocation Capital"
    },
    training: {
        SNo: "S No",
        CB_No_Particulars: "CB No Particulars",
        REV_CA: "Rev CA",
        REV_DCDA: "Rev DCDA",
        CEP: "CEP",
        Reg_Fee_Sem_Symp_Conl_Course: "Reg Fee Sem/Symp/Conl/Course",
        Course_Fee: "Course Fee",
        Higher_Edu_RT: "Higher Edu RT",
        Higher_Edu_Dir_Power: "Higher Edu Dir Power",
        Higher_Edu_PhD: "Higher Edu PhD",
        Course_by_Lab: "Course by Lab(non CEP)",
        Others: "others",
        Cheque_No_DV_No: "Cheque No DV No",
        Remarks: "Remarks",
        Allocation_Revenue: "Allocation"
    },
    miscellaneous: {
        SNo: "S No",
        CB_No_Particulars: "CB No Particulars",
        REV_CA: "Rev CA",
        REV_DCDA: "Rev DCDA",
        Other_Activity: "Other Activity",
        Security_Cont: "Security Cont",
        Hygiene_Maint_Cont: "Hygiene Maint Cont",
        Environ_Control: "Environ Control",
        Tel_R: "Tel(R)",
        Rajbhasha: "Rajbhasha",
        Office_Entt: "Office Entt",
        Stationary_Postage: "Stationary postage",
        Office_Appliance: "Office Appliance",
        Labour_Welfare: "Labour Welfare",
        Memb_Fee_Society: "Memb Fee Society",
        Apprentice_Fee: "Apprentice Fee",
        RAC_CEPTAM_Interview: "RAC CEPTAM Interview",
        Honararium: "Honararium",
        TA_Non_DRDO_Pers: "TA Non DRDO Pers",
        Printing_Binding: "Printing Binding",
        Other_Misc: "Other Misc",
        Cheque_No_DV_No: "Cheque No DV NO",
        Remarks: "Remarks",
        Allocation_Revenue: "Allocation",
        Cash_Assignment: "Cash Assignment"
    },
    fellowship: {
        SNo: "S No",
        CB_No_Particulars: "CB No Particulars",
        REV_CA: "CA",
        REV_DCDA: "DCDA",
        Cheque_No_DV_No: "DV No Cheque No",
        Remarks: "Remarks",
        Allocation_Revenue: "Allocation"
    },
    import: {
        SNo: "S No",
        PO_No_And_Date: "PO No And Dt",
        Particulars: "Particulars",
        Supply_Agency: "Supply Agency",
        REV_Imported_FE: "Rev Imported FE",
        REV_Imported_RE: "Rev Imported RE",
        CAP_Imported_FE: "Cap Imported FE",
        CAP_Imported_RE: "Cap Imported RE",
        REV_DCDA: "Rev DCDA",
        CAP_DCDA: "Cap DCDA",
        DV_TE_No: "DV_TE No",
        Remarks: "Remarks"
    },
    project: {
        SNo: "S No",
        project: "Project",
        PO_No_Dt: "PO No Dt",
        Particulars: "Particulars",
        Name_of_Firm: "Name of Firm",
        REV_CA: "Rev CA",
        REV_DCDA: "Rev DCDA",
        Cap: "Cap",
        Rev_Imported_FE: "Rev Imported FE",
        Rev_Imported_RE: "Rev Imported RE",
        Project_Cars: "Project Cars",
        Cap_Imported_FE: "Cap Imported FE",
        Cap_Imported_RE: "Cap Imported RE",
        DV_TE_No_Date: "DV/TE No Date",
        Allocation_Revenue: "Allocation Revenue",
        Cash_Assignment: "Cash Assignment",
        Allocation_Capital: "Allocation Capital"
    },
};

const tableSelect = document.getElementById('tableSelect');
const projectContainer = document.getElementById('projectSelectContainer');
const projectSelect = document.getElementById('projectName');

tableSelect.addEventListener('change', function () {
    if (this.value === 'project') {
        projectContainer.style.display = 'block';
        loadProjects(); // Fetch and populate project options
    } else {
        projectContainer.style.display = 'none';
        projectSelect.innerHTML = '<option value="">-- Select a Project --</option>'; // Reset
    }
});

function loadProjects() {
    fetch('http://localhost:8080/api/projectlist')
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        })
        .then(data => {
            projectSelect.innerHTML = '<option value="">-- Select a Project --</option>'; // Reset
            data.forEach(project => {
                const option = document.createElement("option");
                option.value = project.name;
                option.textContent = project.name; // or project.title, etc.
                projectSelect.appendChild(option);
            });
        })
        .catch(error => {
            alert('Error while fetching projectlist: ' + error);
        });
}

let fetchedData = [];

async function fetchTableData() {
    const table = document.getElementById("tableSelect").value;
    if (!table) return alert("Please select a table.");

    const payload = new URLSearchParams({ table });

    if (table === "project") {
        const project = document.getElementById("projectName").value;
        if (!project) return alert("Please select a project.");
        payload.append("project", project);
    }

    try {
        const response = await fetch("http://localhost:8080/api/formfetchall", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: payload
        });

        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        fetchedData = data;
        renderTable(table, data);
    } catch (err) {
        alert("Error: " + err.message);
    }
}

function renderTable(table, data) {
    const headers = headersMap[table];
    if (!headers) return alert("Header map not found for this table");

    const container = document.getElementById("myTable");
    container.innerHTML = "";

    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const headerRow = document.createElement("tr");
    for (const key in headers) {
        const th = document.createElement("th");
        th.textContent = headers[key];
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);

    data.forEach((row) => {
        const tr = document.createElement("tr");
        for (const key in headers) {
            const td = document.createElement("td");
            td.textContent = row[key] || "";
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    });

    container.appendChild(thead);
    container.appendChild(tbody);
}

function downloadExcel() {
    const table = document.getElementById("tableSelect").value;
    if (!fetchedData.length) return alert("No data to download.");

    const headers = headersMap[table];
    const exportData = fetchedData.map((row) => {
        const obj = {};
        for (const key in headers) {
            obj[headers[key]] = row[key] || "";
        }
        return obj;
    });

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${table}_report.xlsx`);
}
async function downloadPDF() {
    const table = document.getElementById("tableSelect").value;
    if (!fetchedData.length) return alert("No data to download.");
    const headers = headersMap[table];
    if (!headers) return alert("No headers found for selected table.");

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const tableData = fetchedData.map((row) => {
        return Object.keys(headers).map((key) => row[key] || "");
    });

    const tableHead = [Object.values(headers)];

    doc.text(`${table.toUpperCase()} Report`, 14, 15);
    doc.autoTable({
        head: tableHead,
        body: tableData,
        startY: 20,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [221, 221, 221] }
    });

    doc.save(`${table}_report.pdf`);
}

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

function getCookie(c_name) {
    const nameEQ = c_name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length));
    }
    return null;
}