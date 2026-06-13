let resultado=document.getElementById("resultado");


async function mitra() {
  let datos = await fetch("Data.json");
  let fort = await datos.json();
  console.log(fort[2]);
  resultado.innerHTML+=`
  
  <div class="peque">
      ${fort[2].icon}
    </div>`
};
mitra();

function luis(){
  let item=document.getElementById("item").value;
  resultado.innerHTML+=`
  
  <div class="peque">
      ${item}
    </div>`
    
};

