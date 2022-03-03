const mode = document.getElementById('mode');
const body = document.body;
const containertodos = document.getElementById("contentodo")
const newdo = document.getElementById('newdo')
const clear = document.getElementById('clear')
const state = document.querySelectorAll('#state')
var todolist = {}
historyTodo = []
var filtertodo


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
//etiquetas
state.forEach(state =>{
    state.addEventListener('click',(e)=>{
        var selectedEl = document.querySelector(".todo-list");
        if(selectedEl){
            selectedEl.classList.remove("todo-list");
        }
        state.classList.add("todo-list");
        if(e.path[0].innerHTML == 'All'){
            filtertodo = historyTodo 
        }
        else if(e.path[0].innerHTML == 'Completed'){
            filtertodo = historyTodo.filter(a => a.state ==true)
        }
        else if(e.path[0].innerHTML == 'Active'){
            filtertodo = historyTodo.filter(a => a.state ==false)
        }
        getTodoList()
    })
})
//limpiar la lista de todos
clear.addEventListener('click',()=>{
    containertodos.innerHTML= ''
    historyTodo = []
    setLocalStorage()
})


//add new todo
function addNewTodo(){
    todolist = {'name':`${newdo.value}`, 'state':false}
    historyTodo.push(todolist)
    todolist = {}
}
//save todos in localstorage
function setLocalStorage(){
    localStorage.setItem('history',JSON.stringify(historyTodo))
    getLocalStorage()
    
}

function getLocalStorage(){
    historyTodo = JSON.parse(localStorage.getItem('history'))
    filtertodo = historyTodo
    getTodoList()
}




//get todos of localstorage and show ToDolist
function getTodoList(){
    containertodos.innerHTML = ''

    if(historyTodo == null){
        historyTodo = []
    }
    else{
        filtertodo.forEach(e=>{
            //var element = historyTodo.map(e=> e.state)
            if(e.state){
                containertodos.innerHTML+= `<div class="todo active" id="todo">
                <span></span>
                <p>${e.name}</p>
                <i class='bx bx-x-circle'></i>
                </div>`
            }else{
                containertodos.innerHTML+= `<div class="todo" id="todo">
                <span></span>
                <p>${e.name}</p>
                <i class='bx bx-x-circle'></i>
                </div>`

            }
        })
    }
    
}   



//insertar un nuevo element
newdo.addEventListener("keypress",(e)=>{
    if(e.key === 'Enter'){
        if(newdo.value != ''){
            addNewTodo()
            setLocalStorage()
        }
        console.log(historyTodo)
        newdo.value= ''
    }
})


//Marcar y eleminar todo
containertodos.addEventListener('click',(e)=>{
    if(e.target.tagName == 'SPAN'){
        var element = historyTodo.map(e=> e.name).indexOf(e.path[1].children[1].innerText)
        historyTodo[element].state = !historyTodo[element].state
        e.path[1].classList.toggle('active')
        setLocalStorage()
        
    }
    else if(e.target.tagName == 'I'){
        var element = historyTodo.map(e=> e.name).indexOf(e.path[1].children[1].innerText)
        historyTodo.splice(element,1)
        setLocalStorage()
    }
    
})



//Drag and drop





//
document.addEventListener('DOMContentLoaded',getLocalStorage())
