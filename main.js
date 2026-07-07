const SERVER_URL = "https://todo-prnm.onrender.com";

function getToken() {
    return localStorage.getItem("token");
}

// ================= LOGIN =================

function login() {

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    if (!email || !password) {
        alert("Please fill all fields");
        return;
    }

    fetch(`${SERVER_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    .then(response => {

        if (!response.ok) {
            throw new Error("Invalid email or password");
        }

        return response.json();
    })
    .then(data => {

        if (!data.token) {
            throw new Error("Token not received");
        }

        localStorage.setItem("token", data.token);

        alert("Login Successful");

        window.location.href = "todos.html";
    })
    .catch(error => {
        alert(error.message);
    });
}

// ================= REGISTER =================

function register() {

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    if (!email || !password) {
        alert("Please fill all fields");
        return;
    }

    fetch(`${SERVER_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    .then(response => {

        if (!response.ok) {
            throw new Error("Registration failed");
        }

        alert("Registration successful");

        window.location.href = "index.html";
    })
    .catch(error => {
        alert(error.message);
    });
}
