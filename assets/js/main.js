document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelector('.loader').style.display = 'none';
        let a = document.querySelectorAll('.buttons');
        document.querySelector('.heading').style.display='flex';
        a.forEach(i => {
            i.style.display='flex';
        });
    }, 1500);
    if (getCookie('user') == ' ' || !getCookie('user')) {
        location.href='/'
    }
})

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