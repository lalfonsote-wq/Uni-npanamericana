// Arreglo donde se guardarán los estudiantes
const estudiantes = [
    
    {calificacion:"78", 
   curso:"diseño", 
   nombre:"luis", 
   edad:"23"
        
    }, 
    
    {calificacion:"67",
   curso:"diseño",
   nombre:"pedro", 
   edad:"21"
        
    },
    {calificacion:"98",
   curso:"diseño",
   nombre:"mariq", 
   edad:"19"
        
    }
];


// Constructor de estudiantes
function Estudiante(nombre, edad, curso, calificacion) {
    this.nombre=nombre;
    this.edad=edad;
    this.curso=curso;
    this.calificacion=calificacion;
    // El estudiante debe completar las propiedades.
}


// Capturar elementos del HTML
const formulario = document.getElementById("formularioEstudiante");
const listaEstudiantes = document.getElementById("listaEstudiantes");
const inputNombre=document.getElementById("nombre")
const inputEdad=document.getElementById("edad")
const inputCurso=document.getElementById("curso")
const inputCalificacion=document.getElementById("calificacion")
let totalEstudiantes=document.getElementById("totalEstudiantes")
let totalAprobados=document.getElementById("totalAprobados") 
let totalReprobados=document.getElementById("totalReprobados")
let promedioGrupo=document.getElementById("promedioGrupo")

// Escuchar el envío del formulario
formulario.addEventListener("submit", function(evento) {

    evento.preventDefault();

    // 1. Obtener los valores de los inputs.
    const nombre=inputNombre.value
    const edad=inputEdad.value
    const curso=inputCurso.value
    const calificacion=inputCalificacion.value

    // 2. Validar los datos con if / else.
    if(nombre==""|| edad=="" || curso=="" || calificacion=="" ){
        alert("debes completar todos los campos")
        return
    }
    // 3. Crear un estudiante usando new.
    const nuevoEstudiante= new Estudiante(nombre, edad, curso, calificacion)
    // 4. Agregarlo al arreglo con push.
    estudiantes.push(nuevoEstudiante)
    console.log(estudiantes)
    actualizarResumen()
    // 5. Mostrar nuevamente todos los estudiantes.
mostrarEstudiantes()
});


// Mostrar estudiantes usando un ciclo for
function mostrarEstudiantes() {

    // Limpiar el contenedor.
    listaEstudiantes.innerHTML=""
    // Recorrer el arreglo con for.
    for(i=0;i<estudiantes.length; i++){
        const estudiante= estudiantes[i]
    }
    
    // Usar if / else para determinar:
    let estadoEstudiante=""
    if(estudiante.calificacion>=70
    ){
      estadoEstudiante="aprobado"  
    }else{
        estadoEstudiante="reprobado"
    }
    // - Aprobado o reprobado.
    // - Excelente, bueno, regular o insuficiente.
    let rendimientoEstudiante=""
    if(rendimientoEstudiante.calificacion<=90){
        rendimientoEstudiante="excelente"
    }
   else if (rendimientoEstudiante.calificacion <=80 ) {
    rendimientoEstudiante = "bueno"
}
 else if(rendimientoEstudiante.calificacion <=70){
     rendimientoEstudiante="regular"
 }else{
     rendimientoEstudiante="insuficiente"
 }
    

}


// Actualizar los números del resumen

function actualizarResumen() {
    let aprobado=0;
    let reprobado=0;
    let sumaCalificaciones=0;
    
totalEstudiantes.innerHTML=estudiantes.length;


for(i=0; i<estudiantes.length;i++){
    let student=estudiantes[i];
    if(student.calificacion>=70){
        aprobado=aprobado+1
    }else{
        reprobado=reprobado+1
    }
}
totalAprobados.innerHTML=aprobado;
totalReprobados.innerHTML=reprobado
    // Calcular:
    // - Total de estudiantes.
    // - Total de aprobados.
    // - Total de reprobados.
    // - Promedio general.

}
