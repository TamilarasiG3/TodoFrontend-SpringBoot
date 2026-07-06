const SERVER_URL = "http://localhost:8081";

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

    fetch(`${SERVER_URL}/auth/login`, {                //connection or backend and frontend
        method: "POST",                                  //
        headers: {    
            "Content-Type": "application/json"                         //
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

// ================= TODO CARD =================

function createTodoCard(todo) {

    const card = document.createElement("div");
    card.className = "todo-card";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.isCompleted;

    checkbox.addEventListener("change", function () {

        todo.isCompleted = checkbox.checked;

        updateTodoStatus(todo);
    });

    const title = document.createElement("span");
    title.textContent = todo.title;

    if (todo.isCompleted) {
        title.style.textDecoration = "line-through";
        title.style.color = "gray";
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.onclick = function () {
        deleteTodo(todo.id);
    };

    card.appendChild(checkbox);
    card.appendChild(title);
    card.appendChild(deleteBtn);

    return card;
}

// ================= LOAD TODOS =================

function loadTodos() {

    const token = getToken();

    if (!token) {
        window.location.href = "index.html";
        return;
    }

    fetch(`${SERVER_URL}/todo/all`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {

        if (response.status === 401) {

            localStorage.removeItem("token");

            alert("Session expired");

            window.location.href = "index.html";

            return;
        }

        return response.json();
    })
    .then(todos => {

        if (!todos) return;

        const todoList =
            document.getElementById("todo-list");

        todoList.innerHTML = "";

        if (todos.length === 0) {

            todoList.innerHTML =
                "<p id='empty-message'>No todos found</p>";

            return;
        }

        todos.forEach(todo => {
            todoList.appendChild(
                createTodoCard(todo)
            );
        });

    })
    .catch(error => {
        console.error(error);
    });
}

// ================= ADD TODO =================

function addTodo() {

    const input = document.getElementById("new-todo");

    const todoText = input.value.trim();

    if (todoText === "") {
        alert("Please enter a todo");
        return;
    }

    fetch(`${SERVER_URL}/todo/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify({
            title: todoText,
            description: "",
            isCompleted: false
        })
    })
    .then(response => {

        if (!response.ok) {
            throw new Error("Failed to create todo");
        }

        return response.json();
    })
    .then(() => {

        input.value = "";

        loadTodos();
    })
    .catch(error => {
        alert(error.message);
    });
}

// ================= UPDATE TODO =================

function updateTodoStatus(todo) {

    fetch(`${SERVER_URL}/todo/${todo.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(todo)
    })
    .then(response => {

        if (!response.ok) {
            throw new Error("Failed to update todo");
        }

        return response.json();
    })
    .then(() => {
        loadTodos();
    })
    .catch(error => {
        alert(error.message);
    });
}

// ================= DELETE TODO =================

function deleteTodo(id) {

    fetch(`${SERVER_URL}/todo/${id}`, {     //connection or backend and frontend 
        method: "DELETE",                      //
        headers: {
            "Authorization": `Bearer ${getToken()}`       //
        }
    })
    .then(response => {

        if (!response.ok) {
            throw new Error("Failed to delete todo");
        }

        loadTodos();
    })
    .catch(error => {
        alert(error.message);
    });
}

// ================= LOGOUT =================

function logout() {

    localStorage.removeItem("token");

    window.location.href = "index.html";
}

// ================= PAGE LOAD =================

document.addEventListener("DOMContentLoaded", function () {

    if (document.getElementById("todo-list")) {
        loadTodos();
    }

});