let resultado=document.getElementById("resultado")


function luis(){
  let item=document.getElementById("item").value;
  resultado.innerHTML+=`
  
  <div class="peque">
      ${item}
    </div>`
    
}
