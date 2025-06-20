document.addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:8080/api/check-role", {
        method: "POST",
        headers: {
            "email": getCookie("email")
        }
    }).then((res) => res.json())
        .then((data) => {
            if (data.role != "admin") {
                location.href = '/';
            }
        }).catch((err) => {
            console.error(err);
        })
    document.querySelector('.user').style.display = 'block';
    document.querySelector('.nav').style.display = 'flex';
    if (getCookie("email") == ' ' || !getCookie("email")) {
        location.href = '/'
    }
})
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const icon = document.querySelector('.show-icon');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.innerHTML = '🐵';;
    } else {
        passwordInput.type = 'password';
        icon.innerHTML = '🙈'
    }
}


const action = document.getElementById('action');

action.addEventListener('change', function () {
    if (this.value === 'add') {
        document.getElementById("role-head").style.display = 'block';
        document.getElementById("role").style.display = 'block';
        document.getElementById("email-head").style.display = 'block';
        document.getElementById("email-wrapper").style.display = 'block';
        document.getElementById("pass-head").style.display = 'block';
        document.getElementById("pass-wrapper").style.display = 'block';
    } else if (this.value === 'delete') {
        document.getElementById("email-head").style.display = 'block';
        document.getElementById("email-wrapper").style.display = 'block';
        document.getElementById("role-head").style.display = 'none';
        document.getElementById("role").style.display = 'none';
        document.getElementById("pass-head").style.display = 'none';
        document.getElementById("pass-wrapper").style.display = 'none';
    } else {
        document.getElementById("role-head").style.display = 'none';
        document.getElementById("role").style.display = 'none';
        document.getElementById("email-head").style.display = 'none';
        document.getElementById("email-wrapper").style.display = 'none';
        document.getElementById("pass-head").style.display = 'none';
        document.getElementById("pass-wrapper").style.display = 'none';
    }
});

async function validateSubmit() {
    let res = await fetch("http://localhost:8080/api/check-role", {
        method: "POST",
        headers: {
            "email": getCookie("email")
        }
    })
    const rodata = await res.json();
    if (rodata.role != 'admin') {
        return (location.href = '/');
    }
    let useremail = getCookie("email");
    if (action.value == 'none') return alert("Please select valid action.");
    else if (action.value == 'add') {
        let role = document.getElementById("role")
        if (role.value == 'none') return alert("Please select valid role for user.");
        else if (role.value == 'admin' || role.value == 'primary') {
            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;
            if (email && password) {
                fetch(`http://localhost:8080/api/user-exists?email=${email}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.exists) {
                            return alert("User already exists.");
                        } else {
                            let conf = confirm("Are you sure you want create this user?")
                            if (conf) {
                                fetch("http://localhost:8080/api/create-user", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "usermail": useremail
                                    },
                                    body: JSON.stringify({
                                        "email": email,
                                        "password": password,
                                        "role": role.value
                                    })
                                })
                                    .then(response => response.text())
                                    .then(result => {
                                        alert(result);
                                        location.href = '/form/admin/user.html'
                                    }).catch(error => {
                                        console.error("Error creating user:", error);
                                        alert(`Failed to create user. Error: ${error}`);
                                    });
                            } else {
                                return alert("User creation stopped.")
                            }
                        }
                    })
            } else {
                return alert("Please enter email and password.")
            }
        } else {
            return alert("Please select valid role for user.");
        }
    } else if (action.value == 'delete') {
        let email = document.getElementById('email').value;
        if (email) {
            fetch(`http://localhost:8080/api/user-exists?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    if (!data.exists) {
                        return alert("User does not exist.")
                    } else {
                        let conf = confirm("Are you sure you want delete this user?")
                        if (conf) {
                            fetch("http://localhost:8080/api/delete-user", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "usermail": useremail
                                },
                                body: JSON.stringify({
                                    "email": email
                                })
                            })
                                .then(res => res.text())
                                .then(result => {
                                    alert(result)
                                    location.href = '/form/admin/user.html'
                                })
                                .catch((err) => {
                                    console.log(err)
                                    alert(`Unable to delete user. Error ${err}`)
                                })
                        } else {
                            alert("User deletion stopped.")
                        }
                    }
                })
        } else {
            return alert("Please select valid action.");
        }
    }
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