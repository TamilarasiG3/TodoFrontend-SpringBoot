const SERVER_URL = "https://todo-prnm.onrender.com";




function getToken(){

return localStorage.getItem("token");

}



// REGISTER

function register(){


let email =
document.getElementById("email").value;


let password =
document.getElementById("password").value;



fetch(`${SERVER_URL}/auth/register`,{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

email,

password

})

})

.then(res=>{


if(!res.ok)

throw Error("Registration failed");


return res.json();


})


.then(()=>{


alert("Account created 🎉");

location.href="index.html";


})

.catch(e=>alert(e.message));


}




// LOGIN


function login(){


let email =
document.getElementById("email").value;


let password =
document.getElementById("password").value;



fetch(`${SERVER_URL}/auth/login`,{


method:"POST",

headers:{


"Content-Type":"application/json"


},


body:JSON.stringify({

email,

password

})


})


.then(res=>{


if(!res.ok)

throw Error("Invalid login");


return res.json();


})


.then(data=>{


localStorage.setItem(
"token",
data.token
);


location.href="todos.html";


})


.catch(e=>alert(e.message));


}





// LOGOUT


function logout(){


localStorage.removeItem("token");

location.href="index.html";


}




// LOAD TODOS


function loadTodos(){


fetch(`${SERVER_URL}/todos`,{


headers:{


Authorization:
"Bearer "+getToken()


}


})


.then(res=>res.json())


.then(data=>{


let list =
document.getElementById("todoList");


list.innerHTML="";



data.forEach(todo=>{


let li=document.createElement("li");


li.innerHTML=`

<span>${todo.title}</span>

<button class="delete"
onclick="deleteTodo(${todo.id})">
Delete
</button>

`;


list.appendChild(li);


});


});


}





// ADD TODO


function addTodo(){


let title =
document.getElementById("todoTitle").value;



fetch(`${SERVER_URL}/todos`,{


method:"POST",

headers:{


"Content-Type":"application/json",

Authorization:
"Bearer "+getToken()


},


body:JSON.stringify({

title

})


})

.then(()=>loadTodos());


}




// DELETE


function deleteTodo(id){


fetch(`${SERVER_URL}/todos/${id}`,{


method:"DELETE",

headers:{


Authorization:
"Bearer "+getToken()

}


})

.then(()=>loadTodos());


}";


// REGISTER

function register(){

    let email =
    document.getElementById("email").value;

    let password =
    document.getElementById("password").value;


    fetch(`${SERVER_URL}/auth/register`,
    {

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            email,
            password
        })

    })

    .then(response=>{

        if(response.ok){

            alert("Registration Successful");

            window.location.href="index.html";

        }
        else{

            alert("Email already exists");

        }

    });

}





// LOGIN


function login(){

    let email =
    document.getElementById("email").value;


    let password =
    document.getElementById("password").value;



    fetch(`${SERVER_URL}/auth/login`,
    {

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },


        body:JSON.stringify({
            email,
            password
        })


    })


    .then(response=>{


        if(!response.ok){

            throw new Error("Login failed");

        }


        return response.json();


    })


    .then(data=>{


        localStorage.setItem(
            "token",
            data.token
        );


        window.location.href="todos.html";


    })


    .catch(()=>{

        alert("Invalid Login");

    });


}






// LOAD TODOS


function loadTodos(){


let token =
localStorage.getItem("token");



fetch(`${SERVER_URL}/todo/all`,
{

headers:{

"Authorization":
`Bearer ${token}`

}


})

.then(response=>response.json())


.then(todos=>{


let list =
document.getElementById("todo-list");


list.innerHTML="";



todos.forEach(todo=>{


let card =
document.createElement("div");


card.className="todo-card";



card.innerHTML=`

<input type="checkbox"
${todo.isCompleted ? "checked":""}
onchange="updateTodo(${todo.id},this.checked)">



<span>
${todo.title}
</span>


<button onclick="deleteTodo(${todo.id})">
Delete
</button>


`;



list.appendChild(card);



});


});


}






// ADD TODO


function addTodo(){


let title =
document.getElementById("new-todo").value;



let token =
localStorage.getItem("token");



fetch(`${SERVER_URL}/todo/create`,
{


method:"POST",


headers:{


"Content-Type":
"application/json",


"Authorization":
`Bearer ${token}`


},


body:JSON.stringify({

title:title,

description:title,

isCompleted:false

})


})

.then(()=>{


document.getElementById(
"new-todo"
).value="";


loadTodos();


});


}







// UPDATE TODO


function updateTodo(id,status){


let token =
localStorage.getItem("token");



fetch(`${SERVER_URL}/todo/${id}`,
{


method:"PUT",


headers:{


"Content-Type":
"application/json",


"Authorization":
`Bearer ${token}`


},


body:JSON.stringify({

isCompleted:status

})


});


}








// DELETE TODO


function deleteTodo(id){


let token =
localStorage.getItem("token");



fetch(`${SERVER_URL}/todo/${id}`,
{


method:"DELETE",


headers:{


"Authorization":
`Bearer ${token}`


}


})


.then(()=>loadTodos());


}






function logout(){

localStorage.removeItem("token");

window.location.href="index.html";

}





document.addEventListener(
"DOMContentLoaded",
()=>{


if(document.getElementById("todo-list")){

loadTodos();

}


});