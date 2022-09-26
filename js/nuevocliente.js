(function () {

  const formulario = document.querySelector("#formulario");

  document.addEventListener("DOMContentLoaded", () => {
    conectarDB();
    formulario.addEventListener("submit", validarCliente);
  });



  function validarCliente(e) {
    e.preventDefault();
    console.log("exito al validar");

    //Leer los inputs

    const nombre = document.querySelector("#nombre").value;
    const email = document.querySelector("#email").value;
    const telefono = document.querySelector("#telefono").value;
    const empresa = document.querySelector("#empresa").value;

    if (nombre === "" || email === "" || telefono === "" || empresa === "") {
      console.error("error");
      imprimirAlerta("Todos los campos son obligatorios", "error");
      return;
    }

    //Crear un objeto con la información
    const cliente = {
        nombre: nombre,
        email: email,
        telefono: telefono,
        empresa: empresa,
        id:Date.now()
    }

    crearNuevoCliente(cliente);

  }


  function crearNuevoCliente(cliente){
    const transaction = DB.transaction(['crm'], 'readwrite');
    const objectStore = transaction.objectStore('crm');
    objectStore.add(cliente);

    transaction.onerror = function(){
        imprimirAlerta('Hubo un error al agregar el cliente a la bbdd', 'error');
    }

    transaction.oncomplete = function(){
        imprimirAlerta('Cliente agregado con exito');
        setTimeout(() => {
           window.location.href = 'index.html';
          }, 3000);
    }
  }


})();
