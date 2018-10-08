function ajaxRequest() {
    var taskRequest = new XMLHttpRequest();
    taskRequest.open('GET', 'tarefas.json')
    taskRequest.onload = function () {
        if (taskRequest.status >= 200 && taskRequest.status < 400) {
            var taskList = JSON.parse(taskRequest.responseText);
            renderHTML(taskList);
        } else {
            console.log("Servidor ativo, mas ocorreu um erro!");
        }
    };
    taskRequest.onerror = function () {
        console.log("Erro de conexão");
    }
    taskRequest.send();
}
function renderHTML(data) {
    var taskContainer = document.getElementById("lista"),
        htmlString = "<ul>";
    for (i = 0; i < data.length; i++) {
        htmlString += "<li>" + data[i].tarefa + ", " + data[i].responsavel +
            "</li>";
    }
    htmlString += "</ul>";
    taskContainer.insertAdjacentHTML('beforeend', htmlString);
}