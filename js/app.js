const mode = document.getElementById('mode');
const body = document.body;
const containertodos = document.getElementById("contentodo")
const newdo = document.getElementById('newdo')
const clear = document.getElementById('clear')
const state = document.querySelectorAll('#state')
var timeleft = document.getElementById('timeleft')
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
//save todos to localstorage
function setLocalStorage(){
    localStorage.setItem('history',JSON.stringify(historyTodo))
    getLocalStorage()
    
}


//get todos of localstorage
function getLocalStorage(){
    historyTodo = JSON.parse(localStorage.getItem('history'))
    filtertodo = historyTodo
    getTodoList()
}


// show ToDolist
function getTodoList(){
    containertodos.innerHTML = ''

    if(historyTodo == null){
        historyTodo = []
    }
    else{
        filtertodo.forEach(e=>{
            //var element = historyTodo.map(e=> e.state)
            if(e.state){
                containertodos.innerHTML+= `<div class="todo active" id="todo" draggable="true">
                <span></span>
                <p>${e.name}</p>
                <i class='bx bx-x-circle'></i>
                </div>`
            }else{
                containertodos.innerHTML+= `<div class="todo" id="todo" draggable="true">
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
            const time1 = new Date()
            minute1 =Math.floor(time1 / (1000 * 60)) % 60 
            
            setLocalStorage()
        }
        newdo.value= ''
    }
})  
 var h=0
 setInterval(()=>{timeleft.innerHTML = `${h++} Mins Left`},60000)
    


//Marcar y eleminar todo
containertodos.addEventListener('click',(e)=>{
    if(e.target.tagName == 'SPAN'){
        var element = historyTodo.map(e=> e.name.toLowerCase()).indexOf(e.path[1].children[1].innerText.toLowerCase())
        historyTodo[element].state = !historyTodo[element].state
        e.path[1].classList.toggle('active')
        setLocalStorage()
        
    }
    else if(e.target.tagName == 'I'){
        var element = historyTodo.map(e=> e.name.toLowerCase()).indexOf(e.path[1].children[1].innerText.toLowerCase())
        historyTodo.splice(element,1)
        setLocalStorage()
    }
    
})



//Drag and drop
var index1
containertodos.addEventListener('dragstart',(e)=>{
     index1= historyTodo.map(e=> e.name.toLowerCase()).indexOf(e.path[0].innerText.toLowerCase())
})

containertodos.addEventListener('dragover',(e)=>{
    e.preventDefault()
})
containertodos.addEventListener('drop',(e)=>{
    var index2= historyTodo.map(e=> e.name.toLowerCase()).indexOf(e.path[0].innerText.toLowerCase())
    var todoOne = historyTodo[index1]
    var todoTwo = historyTodo[index2] 

    historyTodo[index1] = todoTwo 
    historyTodo[index2] = todoOne
    getTodoList()    
})
/*

*/



document.addEventListener('DOMContentLoaded',getLocalStorage())
