const SERVER_URL = "https://todo-prnm.onrender.com";


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