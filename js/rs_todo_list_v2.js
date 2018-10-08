var inputTaskTitle = document.getElementById("task_title");
var inputTaskResponsible = document.getElementById("task_responsable");

var TASK_LIST_LOCAL = "taskList";

var allTasks;

function addTask() {
    var taskTitle = inputTaskTitle.value;
    var taskResponsible = inputTaskResponsible.value;

    if (taskTitle != "") {
        var taskObj = new Task(taskTitle, taskResponsible);
        readAllTasks();
        var array = loadArrayTasks();
        array.push(taskObj);
        saveTask(array);
        loadAllTasks();
    }
}

function loadArrayTasks(){
    var array = new Array();
    var i;
    for(i = 0 ; i < allTasks.length ; i++){
        array.push(allTasks[i]);
    }
    return array;
}

function saveTask(task) {
    sendTasksToServer(task);
}

function deleteTask(task) {
    var arrayAux = loadArrayTasks();
    var indexTask = arrayAux.indexOf(task);
    var arrayWithoutTask = arrayAux.splice(indexTask, 1);
    sendTasksToServer(arrayAux);
}

function updateTask(task){
    var arrayAux = loadArrayTasks();
    var indexTask = arrayAux.indexOf(task);
    var arrayWithoutTask = arrayAux.splice(indexTask, 1);
    arrayAux.push(task);
    sendTasksToServer(arrayAux);
}

function sendTasksToServer(tasks) {
    var jsonTask = JSON.stringify(tasks);
    var taskRequest = new XMLHttpRequest();
    sendTasksToPersist(jsonTask);
    readAllTasks();
}

function sendTasksToPersist(tasksJson) {
    var taskRequest = new XMLHttpRequest();
    taskRequest.open('POST', 'php/add_task.php');
    taskRequest.onload = function () {
        if (taskRequest.status >= 200 && taskRequest.status < 400) {
            var persistedJsonTasks = taskRequest.responseText;
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

function readAllTasks() {
    var persistedJsonTasks;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function () {
        if (xmlhttp.status >= 200 && xmlhttp.status < 400) {
            saveLocalTasks(xmlhttp.responseText);
        }
    };
    xmlhttp.open("GET", "php/load_tasks.php", true);
    xmlhttp.send();
}

function saveLocalTasks(localTasks) {
    if(localTasks != "" && localTasks != null){
        allTasks = JSON.parse(localTasks);
    } else {
        allTasks = new Array();
    }
    loadTasksInView(allTasks);
}

class Task {
    constructor(title, responsible) {
        this.title = title;
        this.responsible = responsible;
        this.status = "TO_DO";
    }
}

function loadAllTasks(){
    readAllTasks();
}

loadAllTasks();