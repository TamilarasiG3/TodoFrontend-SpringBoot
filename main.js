const SERVER_URL = "http://localhost:8080";

// REGISTER

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

        alert("Registration Successful");

        window.location.href = "index.html";
    })
    .catch(error => {
        alert(error.message);
    });
}


// LOGIN

function login() {

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

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
            throw new Error("Invalid Login");
        }

        return response.json();
    })
    .then(data => {

        localStorage.setItem(
            "token",
            data.token
        );

        window.location.href =
            "todos.html";
    })
    .catch(error => {
        alert(error.message);
    });
}


// LOAD TODOS

function loadTodos() {

    const token =
        localStorage.getItem("token");

    if (!token) {
        window.location.href =
            "index.html";
        return;
    }

    fetch(`${SERVER_URL}/todo/all`, {
        headers: {
            "Authorization":
            `Bearer ${token}`
        }
    })
    .then(response => {

        if (!response.ok) {
            throw new Error(
                "Failed to load todos"
            );
        }

        return response.json();
    })
    .then(todos => {

        const list =
            document.getElementById("todo-list");

        list.innerHTML = "";

        todos.forEach(todo => {

            const card =
                document.createElement("div");

            card.className =
                "todo-card";

            card.innerHTML = `
                <div class="todo-left">
                    <input
                        type="checkbox"
                        ${todo.isCompleted ? "checked" : ""}
                        onchange="updateTodo(${todo.id}, this.checked)">
                    
                    <span class="${todo.isCompleted ? "completed" : ""}">
                        ${todo.title}
                    </span>
                </div>

                <button class="delete-btn"
                    onclick="deleteTodo(${todo.id})">
                    Delete
                </button>
            `;

            list.appendChild(card);

        });

    })
    .catch(error => {
        console.error(error);
    });
}


// ADD TODO

function addTodo() {

    const title =
        document.getElementById("new-todo").value;

    console.log("Adding:", title);

    const token =
        localStorage.getItem("token");

    fetch(`${SERVER_URL}/todo/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            title: title,
            description: title,
            isCompleted: false
        })
    })
    .then(response => {
        console.log("Status:", response.status);
        return response.json();
    })
    .then(data => {
        console.log("Created:", data);
        loadTodos();
    })
    .catch(error => {
        console.error(error);
    });
}


// UPDATE

function updateTodo(id, status) {

    const token =
        localStorage.getItem("token");

    fetch(`${SERVER_URL}/todo/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type":
            "application/json",
            "Authorization":
            `Bearer ${token}`
        },
        body: JSON.stringify({
            isCompleted: status
        })
    });
}


// DELETE

function deleteTodo(id) {

    const token =
        localStorage.getItem("token");

    fetch(`${SERVER_URL}/todo/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization":
            `Bearer ${token}`
        }
    })
    .then(() => loadTodos());
}


// LOGOUT

function logout() {

    localStorage.removeItem("token");

    window.location.href =
        "index.html";
}


document.addEventListener(
    "DOMContentLoaded",
    () => {

        if (
            document.getElementById(
                "todo-list"
            )
        ) {
            loadTodos();
        }

    }
);