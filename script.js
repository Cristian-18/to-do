const fecha = document.getElementById('fecha');
const lista = document.getElementById('lista');
const input = document.getElementById('input');
const boton = document.getElementById('agregar');

function agregarTarea (tarea){
    let elemento = `<li class="item">
                         <i class="far fa-circle co" data="realizado" id="0"></i>
                         <p class="text">${tarea}</p>
                         <i class="fas fa-trash de" data="eliminado" id="0"></i>
                    </li>`
    
    lista.insertAdjacentHTML("beforeend",elemento);                
}

boton.addEventListener("click", ()=>{
    const tarea = input.value;
    if(tarea){
        agregarTarea(tarea);
    }
    input.value = " "
})


document.addEventListener("keyup",function(Event){
    if(Event.key=="Enter"){
        const tarea = input.value;
        if(tarea){
            agregarTarea(tarea)
        }
        input.value = " ";
    }
})