async function cargarArchivoJSON() {
  let respuesta = await fetch("personajes.json");

  let datos = await respuesta.json();

  console.log(datos);
} 