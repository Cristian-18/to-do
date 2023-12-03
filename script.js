const fecha = document.getElementById('fecha');
const lista = document.getElementById('lista');
const input = document.getElementById('input');
const boton = document.getElementById('agregar');

const check = 'fa-check-circle';
const uncheck= 'fa-circle'
let id 
const line ='line-through';

 let listArray


 /* LA FUNCION DE LA FECHA  */

 let date = new Date();
 fecha.innerHTML = date.toLocaleDateString('es-PE',{weekday:'long',month:'short',day:"numeric"})


function agregarTarea (tarea,id,realizado,eliminado){
    if(eliminado){
        return;
    }

    const REALIZADO = realizado ? check:uncheck;
    const LINE = realizado ? line:"";
    let elemento = `<li class="item" id="elemento">
                         <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                         <p class="text ${LINE}">${tarea}</p>
                         <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
                    </li>`
    
    lista.insertAdjacentHTML("beforeend",elemento);                
}
/* 
------------------------------------------------------------------- */

boton.addEventListener("click", ()=>{
    const tarea = input.value;
    if(tarea){
        agregarTarea(tarea,id,false,false);
        listArray.push({
            nombre:tarea,
            id:id,
            realizado:false,
            eliminado:false
        })
    }
    localStorage.setItem('TO-DO',JSON.stringify(listArray));
    input.value = " ";
    id++
    
})

document.addEventListener("keyup",function(Event){
    if(Event.key=="Enter"){
        const tarea = input.value;
        if(tarea){
            agregarTarea(tarea)
            listArray.push({
                nombre:tarea,
                id:id,
                realizado:false,
                eliminado:false
            })
        }
        localStorage.setItem('TO-DO',JSON.stringify(listArray));
        input.value = " ";
        id++;
       
    }
})

/* FUNCION PARA MARCAR LA TAREA HECHA Y BORRAR TAREA  */

function tareaRealizada (elemento){
    elemento.classList.toggle(check);
    elemento.classList.toggle(uncheck);
    elemento.parentNode.querySelector('.text').classList.toggle(line)
    listArray[elemento.id].realizado = listArray[elemento.id].realizado ?false:true;
}

function tareaEliminada (elemento){
    elemento.parentNode.parentNode.removeChild(elemento.parentNode);
    listArray[elemento.id].eliminado = true;
}

lista.addEventListener('click',function(event){
    const elemento = event.target;
    const elementoData = elemento.attributes.data.value;
    if(elementoData==='realizado'){
        tareaRealizada(elemento)
    }else if(elementoData==='eliminado'){
        tareaEliminada(elemento)
    }
    localStorage.setItem('TO-DO',JSON.stringify(listArray));
})

/* LOCAL ITEM GETSTORAGE */

let baseDatos = localStorage.getItem('TO-DO');
if(baseDatos){
    listArray = JSON.parse(baseDatos);
    id = listArray.length;
    cargarLista(listArray);
}else{
    listArray = [];
    id = 0;
}


function cargarLista (informacion){
    informacion.forEach(valor => {
        agregarTarea(valor.nombre,valor.id,valor.realizado,valor.eliminado)
    });
}
