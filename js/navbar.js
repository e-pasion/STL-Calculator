document.getElementById("userLink").addEventListener("click",(event)=>{
    event.preventDefault();

    if(localStorage.getItem("token")===null){
        window.top.location.href = "login.html"; // Redireccionar la página a otra URL
    }else{
        window.top.location.href = "perfil.html"; // Redireccionar la página a otra URL
    }

})