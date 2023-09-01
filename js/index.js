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
        user: "profe",
        password: "1234"
    }
];
const existeUser = JSON.parse(localStorage.getItem("user"))
const user = document.querySelector("#floatingInput");
const password = document.querySelector("#floatingPassword");
const botonEnviar = document.querySelector("#enviar");
const botonRegistrarse = document.querySelector(".registrarse");

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

localStorage.removeItem("base de datos");
