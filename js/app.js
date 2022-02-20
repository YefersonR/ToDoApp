const mode = document.getElementById('mode');
const body = document.body;
const todos = document.querySelectorAll('#todo')
const containertodos = document.getElementById("contentodo")
const newdo = document.getElementById('newdo')
const clear = document.getElementById('clear')
const state = document.querySelectorAll('#state')

const todolist = {}

//cambiar de modo (oscuro, claro)
mode.addEventListener('click',()=>{
    body.classList.toggle('light')
    if(mode.getAttribute('name')=== 'sun'){
        mode.setAttribute("name",'moon')

    }
    else if(mode.getAttribute('name')=== 'moon'){
        mode.setAttribute("name",'sun')

    }
})

//Marcar y desmarcar todo
todos.forEach(todo=>{
    todo.addEventListener('click',()=>{
        todo.classList.toggle('active')
    })
})
//insertar un nuevo element
newdo.addEventListener("keypress",(e)=>{
    if(e.key === 'Enter'){
        if(newdo.value != ''){
            containertodos.innerHTML+= `<div class="todo" id="todo">
            <span></span>
            <p>${newdo.value}</p>
            </div>
            `
        }
        newdo.value= ''
    }
})
//limpiar la lista de todos
clear.addEventListener('click',()=>{
    containertodos.innerHTML= ''
})
//etiquetas
state.forEach(state =>{
    state.addEventListener('click',()=>{
        var selectedEl = document.querySelector(".todo-list");
        if(selectedEl){
            selectedEl.classList.remove("todo-list");
        }
        state.classList.add("todo-list");
    })
})