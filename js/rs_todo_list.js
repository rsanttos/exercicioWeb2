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

function addTask(){

    var taskTitle = inputTaskTitle.value;
    var taskResponsible = inputTaskResponsible.value;
    var taskObj = new Tarefa(taskTitle, taskTitle);

    if(taskTitle != ""){
        var newDiv = document.createElement("div"); 
        newDiv.className = classSubCard;
        
        var newSubDiv1 = document.createElement("div"); 
        newSubDiv1.className = "col-lg-6";
        newSubDiv1.innerHTML += taskTitle;
        var newSubDiv2 = document.createElement("div"); 
        newSubDiv2.className = "col-lg-6";
        
        var btn = document.createElement("button");
        btn.innerHTML = "Iniciar";
        btn.className = classStartTask;
        newSubDiv2.append(btn);

        var inputEditTask = document.getElementById("editTitle");

        addBtnEdit(newSubDiv1, newSubDiv2, inputEditTask);

        addBtnDelete(taskObj, newSubDiv2);
        
        btn.addEventListener ("click", function() {
          moveTaskToDoing(newDiv, btn);
        });
        
        newDiv.append(newSubDiv1);
        newDiv.append(newSubDiv2);
        
        divTasksToDo.append(newDiv);
        taskTitle = "";
        inputTaskTitle.value = taskTitle;
    }
}

function addBtnDelete(tarefa, newSubDiv2){
    var btnDelete = document.createElement("button");
    btnDelete.innerHTML = "Deletar";
    btnDelete.setAttribute("onclick", deleteTarefa());
    btnDelete.addEventListener ("click", function() {
        deleteTarefa(tarefa);
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

function moveTaskToDoing(divTask, btnIniciar){
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
}

function moveTaskToDone(divTask, btnFinalizar){
    divTask.removeChild(btnFinalizar);
    divTasksDoing.removeChild(divTask);
    divTasksDone.append(divTask);
}

function saveTask(task){
    sendTaskToAdd(task);
}

function deleteTask(task){
    var jsonTask = JSON.stringify(task);
    console.log(jsonTask);
}

function sendTaskToAdd(task){

}

function sendTaskToDelete(task){

}

function loadTasks(){

}

class Task {

    constructor(title, responsible, status) {
      this.title = title;
      this.responsible = responsible;
      this.status = status;
    }

    constructor(title, responsible) {
      this.title = title;
      this.responsible = responsible;
      this.status = "TO_DO";
    }
}