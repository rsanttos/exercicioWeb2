function ajaxLoadRequest() {
    var taskRequest = new XMLHttpRequest();
    taskRequest.open('GET', 'tarefas.json');
    taskRequest.onload = function () {
        if (taskRequest.status >= 200 && taskRequest.status < 400) {
            var taskListJson = taskRequest.responseText;
            localStorage.setItem('taskList', taskListJson);
        } else {
            console.log("Servidor ativo, mas ocorreu um erro!");
        }
    };
    taskRequest.onerror = function () {
        console.log("Erro de conexão");
    }
    taskRequest.send();
}
var ajaxAddRequest = function () {
    console.log("entrando add...");
    var novaTarefa = document.getElementById("tarefa").value,
        novoResponsavel = document.getElementById("responsavel").value,
        tasks = localStorage.getItem('taskList'),
        taskListObj = JSON.parse(tasks),
        toAdd = { "tarefa": novaTarefa, "responsavel": novoResponsavel };
    taskListObj.push(toAdd);
    //grava nova lista de tarefas com Ajax
    var taskRequest = new XMLHttpRequest();
    taskRequest.open('POST', 'tarefas-json.php');
    taskRequest.onload = function () {
        if (taskRequest.status >= 200 && taskRequest.status < 400) {
            console.log("Sucesso em ajaxAddRequest\n" +
                taskRequest.responseText);
        } else {
            console.log("Servidor ativo, mas ocorreu um erro!");
        }
    };
    taskRequest.onerror = function () {
        console.log("Erro de conexão");
    }
    taskRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var queryString = "tarefas=" + JSON.stringify(taskListObj);
    taskRequest.send(queryString);
    loadRender();
}
var ajaxDelRequest = function () {
    console.log("entrando delete...");
    var tarefa = document.getElementById("tarefa").value,
        novoResponsavel = document.getElementById("responsavel").value,
        tasks = localStorage.getItem('taskList'),
        taskListObj = JSON.parse(tasks),
        toAdd = { "tarefa": novaTarefa, "responsavel": novoResponsavel };
    taskListObj.push(toAdd);
    //grava nova lista de tarefas com Ajax
    var taskRequest = new XMLHttpRequest();
    taskRequest.open('POST', 'tarefas-json.php');
    taskRequest.onload = function () {
        if (taskRequest.status >= 200 && taskRequest.status < 400) {
            console.log("Sucesso em ajaxAddRequest\n" +
                taskRequest.responseText);
        } else {
            console.log("Servidor ativo, mas ocorreu um erro!");
        }
    };
    taskRequest.onerror = function () {
        console.log("Erro de conexão");
    }
    taskRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var queryString = "tarefas=" + JSON.stringify(taskListObj);
    taskRequest.send(queryString);
    loadRender();
}

function renderHTML(data) {
    var taskContainer = document.getElementById("lista"),
        htmlString = "";
    for (i = 0; i < data.length; i++) {
        htmlString += "<li>" + data[i].tarefa + ", " + data[i].responsavel +
            "</li><button onclick='deleteTarefa();'>Deletar</button>";
    }
    taskContainer.innerHTML = htmlString;
}
function loadRender() {
    ajaxLoadRequest();
    var tasks = localStorage.getItem('taskList');
    var taskListObj = JSON.parse(tasks);
    renderHTML(taskListObj);
}
// PRINCIPAL
var addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click", ajaxAddRequest);
loadRender();