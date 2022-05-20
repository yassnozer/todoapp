var add_bottom=document.getElementById("add_bottom")
var setTask=document.getElementById("setTask")
var myTasks=document.getElementById("myTasks")
var formGroupExampleInput=document.getElementById("formGroupExampleInput")

var checkBox=document.getElementById("checkBox")
var add_btm=document.getElementById("add_btm")
var i=0


function addtask(){
    if(add_bottom.innerText=="+"){
        formGroupExampleInput.value=""
    setTask.style.display="block"
    myTasks.style.display="none"
    add_bottom.innerText="x"
    add_bottom.style.background="#dc3545"}
    else{
        myTasks.style.display="flex"
        setTask.style.display="none"
        add_bottom.innerText="+"
        add_bottom.style.background="#157347"
    }
    
}


function addThisTask(){
    add_btm.style.display="block"

   state.push("undone")
tasks.push(formGroupExampleInput.value)

myTasks.innerHTML+=`
<div id="singletask${i}">
<div class="alert alert-warning" role="alert">
        <div class="form-check">
            <label class="form-check-label" for="defaultCheck1" id="tasktitle${i}">
              ${tasks[i]}
            </label>
            <div id="button_done${i}" class="button_done">
        <button type="button" class="btn btn-outline-warning" id="checkBox${i}" 
        onclick="taskisdone(${i})">In progress</button>
        </div>
          </div>
      </div>
      </div>
`

myTasks.style.display="flex"
    setTask.style.display="none"
    add_bottom.innerText="+"
    add_bottom.style.background="#157347"
    formGroupExampleInput.value=""
    // tasks.push(tasks[i])
    // state.push(state[i])
    save()
    i++
}

function taskisdone(j){
    
var singletask=document.getElementById(`singletask${j}`)
    document.getElementById(`tasktitle${j}`).style.textDecoration="line-through"
singletask.innerHTML=`
<div class="alert alert-success" role="alert">
        <div class="form-check">

            <label class="form-check-label" for="defaultCheck1" id="tasktitle${j}">
              ${tasks[j]}
            </label>
            <div id="button_done${j}" class="button_done">
        <button type="button" class="btn btn-success" id="checkBox${j}" 
         autocomplete="off">Done</button>
        <button type="button" class="btn btn-danger" onclick="del(${j})"><i class="bi bi-x-circle-fill"></i></button>
        </div>
          </div>
      </div>`
state[j]="done"
save()
}



function del(n){
    tasks.splice(n,1)
    state.splice(n,1)
    document.getElementById(`singletask${n}`).outerHTML=""
    
if(tasks.length==0){
displayertrash()
}
save()

}

function deleteall(){
    tasks=[]
    state=[]  
    myTasks.innerHTML=""
    add_btm.style.display="none"
    save()
}
onload=lastData()

function lastData(){
    if(localStorage.getItem("lastTasks") != null){
    tasks = JSON.parse(localStorage.getItem("lastTasks"));
    state= JSON.parse(localStorage.getItem("laststate"));
    
for(var l=0;l<tasks.length;l++){
myTasks.innerHTML+=`
<div id="singletask${l}">
<div class="alert alert-warning" role="alert">
        <div class="form-check">

            <label class="form-check-label" for="defaultCheck1" id="tasktitle${l}">
              ${tasks[l]}
            </label>
            <div id="button_done${l}" class="button_done">
        <button type="button" class="btn btn-outline-warning" id="checkBox${l}" 
        onclick="taskisdone(${l})">In progress</button>
        </div>
          </div>
      </div>
      </div>
`
if(state[l]=="done"){
    taskisdone(l)
}
displayertrash()
}
}
else{
    
    tasks = []
    state= []
    displayertrash()
}
}
function displayertrash(){
    if(myTasks.innerHTML=="" || tasks.length==0){
        add_btm.style.display="none"
    }else{
        add_btm.style.display="block"
    }
}

function save(){
    localStorage.setItem("lastTasks",JSON.stringify(tasks))
localStorage.setItem("laststate",JSON.stringify(state))
}