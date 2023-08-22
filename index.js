const  base_de_datos = [
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
    
]

const existeUser = JSON.parse(localStorage.getItem("user"))
const user = document.querySelector("#floatingInput");
const password = document.querySelector("#floatingPassword");
const botonEnviar = document.querySelector("#enviar");

if (existeUser !== undefined){
    // logeo.innerHTML= '<h2 class="msjLogeo"> Welcome </h2> <a href="/index.html" class="btn btn-propio">INICIO</a>'
}

const validacion = {
    user: '',
    password: ''
}

user.addEventListener("input",(event)=>{
    validacion.user = event.target.value

})
password.addEventListener("input",(event)=>{
    validacion.password = event.target.value

})
botonEnviar.addEventListener("click",()=>{
    const validacionExitosa = base_de_datos.find(user=> user.user == validacion.user && user.password == validacion.password)
    if (validacionExitosa === undefined){
        logeo.innerHTML= '<h2 class="msjLogeo"> user not found </h2> <a href="/pages/Login.html" class="btn btn-primary">retry</a>'
    }else{
        const logeo = document.querySelector("#logeo");
        logeo.innerHTML= '<h2 id="ingresa"> Welcome </h2> <a href="/index.html" class="btn btn-primary">Start</a>'
        localStorage.setItem("user",JSON.stringify(validacionExitosa))
    }
})

localStorage.removeItem("base de datos")
