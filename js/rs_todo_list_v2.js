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

var TASK_LIST_LOCAL = "taskList"; 

var allTasks = new Array();

function addTask() {
    var taskTitle = inputTaskTitle.value;
    var taskResponsible = inputTaskResponsible.value;

    if (taskTitle != "") {
        var taskObj = new Task(taskTitle, taskResponsible);
        saveTask(taskObj);
    }
}

function saveTask(task) {
    sendTaskToAdd(task);
}

function deleteTask(task) {
    var jsonTask = JSON.stringify(task);
    console.log(jsonTask);
}

function sendTaskToAdd(task) {
    var jsonTask = JSON.stringify(task);
    var taskRequest = new XMLHttpRequest();
    sendTasksToPersist(jsonTask);
}

function sendTaskToDelete(task) {

}

function loadTasks() {
    var tasks = readAllTasks();
    return tasks;
}

function sendTasksToPersist(tasksJson) {
    var taskRequest = new XMLHttpRequest();
    taskRequest.open('POST', 'php/add_task.php');
    taskRequest.onload = function () {
        if (taskRequest.status >= 200 && taskRequest.status < 400) {
            var persistedJsonTasks = taskRequest.responseText;
            localStorage.setItem(TASK_LIST_LOCAL, persistedJsonTasks);
        } else {
            console.log("Servidor ativo, mas ocorreu um erro!" + taskRequest.status);
        }
    };
    taskRequest.onerror = function () {
        console.log("Erro de conexão");
    }
    taskRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var contentRequest = "tarefas=" + tasksJson;
    taskRequest.send(contentRequest);
}

function readAllTasks(){
    var allTasks = localStorage.getItem(TASK_LIST_LOCAL);
    return allTasks;
}

class Task {
    constructor(title, responsible) {
        this.title = title;
        this.responsible = responsible;
        this.status = "TO_DO";
    }
}

loadTasks();