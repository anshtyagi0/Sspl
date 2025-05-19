document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelector('.loader').style.display = 'none';
        let a = document.querySelectorAll('.buttons');
        document.querySelector('.lpgeneral').style.display='flex';
        a.forEach(i => {
            i.style.display='flex';
        });
    }, 1500);
    // if (getCookie('user') == ' ' || !getCookie('user')) {
    //     location.href='/'
    // }
})

function validateSubmit() {
    let cb = document.getElementById('cb').value;
    let revCA = document.getElementById('revCA').value;
    let revDCDA = document.getElementById('revDCDA').value;
    let cap = document.getElementById('cap').value;
    let Projtask = document.getElementById('Projtask').value;
    let buildup = document.getElementById('buildup').value;
    let Maint = document.getElementById('Maint').value;
    let tptmainthiring =document.getElementById('tptmainthiring').value;
    let Bookjournal = document.getElementById('Bookjournal').value;
    let intotech = document.getElementById('infotech').value;
    let DGSD = document.getElementById('DGSD').value;
    let others = document.getElementById('others').value;
    let chequeNoDVNo = document.getElementById('chequeNoDVNo').value;
    let remarks = document.getElementById('Remarks').value;
    let AllocationRevenue = document.getElementById('arevenue').value;
    let Cash = document.getElementById("Cash").value;
    let AllocationCapital = document.getElementById('allocation').value;

    
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}