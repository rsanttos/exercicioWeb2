var divTasksToDo = document.getElementById("tasks_to_do");
var divTasksDoing = document.getElementById("tasks_doing");
var divTasksDone = document.getElementById("tasks_done");

var inputTaskTitle = document.getElementById("task_title");
var inputTaskResponsible = document.getElementById("task_responsable");

var classSubCard = "row card-body";
var classStartTask = "btn btn-sm btn-primary";
var classFinishTask = "btn btn-sm btn-danger";
var classEditTask = "btn btn-sm btn-warning";
var classTask = "btn btn-sm";

function loadTasksInView(tasks){
    var aux = tasks;
    var i;
    divTasksToDo.innerHTML = "";
    divTasksDoing.innerHTML = "";
    divTasksDone.innerHTML = "";
    for(i = 0 ; i < aux.length ; i++){
        addTaskInView(aux[i]);
    }
}

function addTaskInView(taskObj){
    var taskTitle = taskObj.title;
    var taskResponsible = taskObj.responsible;
    if(taskObj.title != ""){
        var divTask = createDivTask(taskObj);  
        addTaskInYourStatus(divTask, taskObj);
        taskTitle = "";
        taskResponsible = "";
        inputTaskTitle.value = taskTitle;
        inputTaskResponsible.value = taskResponsible;
    }
}

function addTaskInYourStatus(divTask, task){
    if(task.status == 'TO_DO'){
        addTaskInToDo(task, divTask)
    } else if (task.status == 'DOING'){
        addTaskInDoing(task, divTask);
    } else if (task.status == 'DONE'){
        addTaskInDone(divTask);
    }
}

function addBtnDelete(tarefa, newSubDiv2){
    var btnDelete = document.createElement("button");
    btnDelete.innerHTML = "Deletar";
    btnDelete.className = classTask;
    btnDelete.addEventListener ("click", function() {
        deleteTask(tarefa);
    });
    newSubDiv2.appendChild(btnDelete);
}

function addBtnEdit(newSubDiv1, newSubDiv2, inputEditTask){        
    var btnEdit = document.createElement("button");
    btnEdit.className = classEditTask;
    btnEdit.innerHTML = "Editar";
    btnEdit.setAttribute("data-toggle", "modal");
    btnEdit.setAttribute("data-target", "#myModal");
    btnEdit.setAttribute("onclick", updateTask(newSubDiv1, inputEditTask));
    newSubDiv2.appendChild(btnEdit);
}

function updateTask(divTask, inputTitleUpdate){
    divTask.innerHTML = inputTaskTitle.value;
}

function createDivTask(taskObj){
    var newDiv = document.createElement("div"); 
    newDiv.className = classSubCard;
    
    var newSubDiv1 = document.createElement("div"); 
    newSubDiv1.className = "col-lg-6";
    newSubDiv1.innerHTML += taskObj.title + " | " + taskObj.responsible;

    var newSubDiv2 = document.createElement("div"); 
    newSubDiv2.className = "col-lg-3";

    var inputEditTask = document.getElementById("editTitle");
    //addBtnEdit(newSubDiv1, newSubDiv2, inputEditTask);
    addBtnDelete(taskObj, newSubDiv2);

    newDiv.append(newSubDiv1);
    newDiv.append(newSubDiv2);

    return newDiv;
}

function addTaskInToDo(task, divTask){
    var btn = document.createElement("button");
    btn.innerHTML = "Iniciar";
    btn.className = classStartTask;

    var divBtn = document.createElement("div");
    divBtn.className = "col-lg-3";
    divBtn.append(btn);
    
    btn.addEventListener ("click", function() {
      moveTaskToDoing(task, divTask, btn);
    });

    divTask.append(divBtn);
    divTasksToDo.append(divTask);
}

function addTaskInDoing(task, divTask){
    var btnDiv = document.createElement("button");
    btnDiv.innerHTML = "Finalizar";
    btnDiv.className = classFinishTask;
    divTask.append(btnDiv);

    btnDiv.addEventListener ("click", function() {
      moveTaskToDone(task, divTask, btnDiv);
    });
    
    divTasksDoing.append(divTask);
}

function addTaskInDone(divTask){
    divTasksDone.append(divTask);
}

function moveTaskToDoing(task, divTask, btnIniciar){
    divTask.removeChild(btnIniciar.parentNode);
    divTasksToDo.removeChild(divTask);
    
    var btnDiv = document.createElement("button");
    btnDiv.innerHTML = "Finalizar";
    btnDiv.className = classFinishTask;
    divTask.append(btnDiv);

    btnDiv.addEventListener ("click", function() {
      moveTaskToDone(divTask, btnDiv);
    });
    
    divTasksDoing.append(divTask);

    task.status = "DOING";
    updateTask(task);
}

function moveTaskToDone(task, divTask, btnFinalizar){
    divTask.removeChild(btnFinalizar);
    divTasksDoing.removeChild(divTask);
    divTasksDone.append(divTask);
    task.status = "DONE";
    updateTask(task);
}