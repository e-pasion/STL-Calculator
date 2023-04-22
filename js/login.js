let authHeader;
document.getElementById("rForm").addEventListener('submit',(event)=>{
    event.preventDefault();
    
    const userData = {   
        "email":document.getElementById("emailRegistro").value,
        "nombre":document.getElementById("nameRegistro").value,
        "password":document.getElementById("passwordRegistro").value
        }
        console.log(userData);
          
          fetch('http://localhost:9020/api/registro', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
          })
          .then(response => {
            Swal.fire(
                'Good job!',
                'Te has registrado correctamente',
                'success'
              )
              document.getElementById("rForm").reset();
            console.log('Respuesta del servidor:', response);
          })
          .catch(error => {
            console.error('Error en la solicitud:', error);
          });
        

})  

document.getElementById("lForm").addEventListener('submit',(event)=>{
    event.preventDefault();
    
    const userData = {   
        "email":document.getElementById("email").value,
        "password":document.getElementById("password").value
        }
        console.log(userData);
          
          fetch('http://localhost:9020/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
          })
          .then(response => {
              // Recorrer los headers de la respuesta
  console.log('Headers de la respuesta:');
  for (const pair of response.headers.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
  }
            let token=response.headers.get("Authorization").replace("Bearer ","");
            localStorage.setItem("token",token);
            Swal.fire(
                'Good job!',
                'Haz iniciado sesion correctamente',
                'success'
              )
              document.getElementById("lForm").reset();
              window.top.location.href = "perfil.html";
            console.log('Respuesta del servidor:', response);
          })
          .catch(error => {
            console.error('Error en la solicitud:', error);
          });
        

})  