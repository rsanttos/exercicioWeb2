var http = require('http').createServer(servidor);
var fs = require('fs');

const URL_LOGIN = '/';
const URL_TODO_LIST = '/todolist';

const PAGE_LOGIN = '../login.html';
const PAGE_TODO_LIST = '../todo_listv2.html';

function servidor(requisicao, resposta) {
  var url = requisicao.url;
  if (url == URL_LOGIN) {
    console.log('tentou login');
    resposta.writeHead(200, {'Content-Type': 'text/html'});
    resposta.end(fs.readFileSync(PAGE_LOGIN));
  } else if (url == URL_TODO_LIST) {
    console.log('tentou todolist');
    resposta.writeHead(200);
    resposta.end(fs.readFileSync(PAGE_TODO_LIST));
  } else {
    resposta.writeHead(200);
    resposta.end("<h1>Error: 404, nada encontrado</h1>");
  }
};

http.listen(4000, function () {
  console.log("Servidor On-line");
});