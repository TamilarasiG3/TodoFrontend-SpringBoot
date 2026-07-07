const SERVER_URL = "https://todo-prnm.onrender.com";


function getToken(){

    return localStorage.getItem("token");

}


// LOGIN

function login(){

    const email =
    document.getElementById("email").value;


    const password =
    document.getElementById("password").value;


    if(!email || !password){

        alert("Please fill all fields");
        return;

    }


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

        if(!res.ok){

            throw new Error("Invalid credentials");

        }

        return res.json();

    })

    .then(data=>{


        localStorage.setItem(
            "token",
            data.token
        );


        alert("Login Successful");


        window.location.href="todos.html";


    })

    .catch(err=>{

        alert(err.message);

    });


}



// REGISTER

function register(){


    const email =
    document.getElementById("email").value;


    const password =
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

        if(!res.ok){

            throw new Error("Registration failed");

        }

        return res.json();

    })

    .then(data=>{

        alert("Registration successful");

        window.location.href="index.html";

    })

    .catch(err=>{

        alert(err.message);

    });

}
