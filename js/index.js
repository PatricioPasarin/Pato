let registro_user = document.querySelector("#floatingInput");
registro_user.addEventListener("input", (event) => {
    const nuevoUsuario = event.target.value;
    localStorage.setItem("miUser", nuevoUsuario);
});

let registro_contra = document.querySelector("#floatingPassword");
registro_contra.addEventListener("input", (event) => {
    const nuevaClave = event.target.value;
    localStorage.setItem("miClave", nuevaClave);
});

const botonRegister = document.querySelector("#enviar");
botonRegister.addEventListener("click", (event) => {
    
    const new_user = registro_user.value;
    const new_password = registro_contra.value;
    
    
    const nuevoUsuario = {
        user: new_user,
        password: new_password
    };

    
    base_de_datos.push(nuevoUsuario);

    
    localStorage.setItem("base_de_datos", JSON.stringify(base_de_datos));
});

const base_de_datos = [
    {
        user: "patricio",
        password: "1234"
    },
    {
        user: "ana",
        password: "1234"
    },
    {
        user: registro_user,
        password: registro_contra
    }
];
const existeUser = JSON.parse(localStorage.getItem("user"))
const user = document.querySelector("#floatingInput");
const password = document.querySelector("#floatingPassword");
const botonEnviar = document.querySelector("#enviar");
const botonRegistrarse = document.querySelector(".registrarse");
const irRegistro = document.querySelector("#register");



const validacion = {
    user: '',
    password: ''
}

user.addEventListener("input",(event)=>{
    validacion.user = event.target.value;
})

password.addEventListener("input",(event)=>{
    validacion.password = event.target.value;
})

botonEnviar.addEventListener("click", async () => {
    try {
        const validacionExitosa = base_de_datos.find(user => user.user == validacion.user && user.password == validacion.password);

        if (validacionExitosa === undefined){
            const logeo = document.querySelector("#logeo");
            logeo.innerHTML= '<h2 class="msjLogeo"> user not found </h2> <a href="/pages/Login.html" class="btn btn-primary">retry</a>';
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'User not found!',
                footer: '<a href="">Create new user</a>'
            })
        } else {
            const logeo = document.querySelector("#logeo");
            logeo.innerHTML= '<h2 id="ingresa"> Welcome </h2> <a href="/index.html" class="btn btn-primary">Start</a>';
            botonInicio.innerHTML= '<a href="./pages/Login.html" class="btn btn-propio">Bienvenido</a>'
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Successful login',
                footer: '<a href="../index.html">Start</a>',
                showConfirmButton: false,
                timer: 2500
            })

            try {
                const response = await fetch("https://ejemplo.com/loginsuccess", {
                    method: "POST",
                    body: JSON.stringify(validacionExitosa),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const responseData = await response.json();
                } else {
                    console.error("Login failed.");
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }

            localStorage.setItem("user",JSON.stringify(validacionExitosa));
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
});

setTimeout(() => {
    Swal.fire({
        title: 'Login time expired',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
    hideClass: {
popup: 'animate__animated animate__fadeOutUp'
}
}).then((result) => {
if (result.isConfirmed) {
window.location.href = '../index.html';
}
});
}, 30000);
window.addEventListener("load", () => {
    if (existeUser) {

        logeo.innerHTML = '<h2 id="ingresa">Welcome</h2> <a href="../index.html" class="btn btn-primary">Start</a>';
        document.querySelector("#formulario-login").style.display = "none";
    }
});

// if (existeUser) {
//     userForm.style.display = "none";
//     loginForm.style.display = "block";
// } else {
//     userForm.style.display = "block";
//     loginForm.style.display = "none";}
//     logoutButton.addEventListener("click", () => {
//         localStorage.removeItem("user");
//         userForm.style.display = "block";
//         loginForm.style.display = "none";
//     });

    irRegistro.addEventListener("click", () => {
    

        logeo.innerHTML = '<div  id="logeo"> <h1 id="ingresa">Sign Up</h1> <form> <div class="form-floating mb-3"> <input type="email" class="form-control" id="floatingInput" placeholder="Usuario"> <label for="floatingInput" class="emailAddress">Username</label> </div> <div class="form-floating"> <input type="password" class="form-control" id="floatingPassword" placeholder="Password"> <label for="floatingPassword" class="password">Password</label> </div> <button class="btn btn-primary" id="enviar" type="submit">Sign Up</button>'
        console.log("Botón Register clickeado");

    })
    
    