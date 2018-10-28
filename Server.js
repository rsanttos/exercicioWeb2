var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.json()); // support json encoded bodies

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(__dirname + '/'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/js'));
//Store all JS and CSS in Scripts folder.
app.use(express.static(__dirname + '/css'));
//Store all JS and CSS in Scripts folder.
app.use(express.static(__dirname + '/fonts'));
//Store all JS and CSS in Scripts folder.
app.use(express.static(__dirname + '/data'));
//Store all JS and CSS in Scripts folder.
app.use(express.static(__dirname + '/img'));
//Store all JS and CSS in Scripts folder.
app.use(express.static(__dirname + '/icons-reference'));
//Store all JS and CSS in Scripts folder.

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/login.html'));
    //__dirname : It will resolve to your project folder.
});

app.get('/todo_list.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/todo_listv3.html'));
});

app.post('/writetasks', function (req, res) {
    console.log('Escrevendo no arquivo json');
    var content = req.body.tarefas;
    writeJsonFile(content);
    res.status(200);
});

app.get('/readtasks', function (req, res) {
    console.log('Lendo arquivo json');
    fs.readFile('database/tasks.json', function (err, dados) {
        if (err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(JSON.parse(dados));
    });
});

app.post('/dologin', function (req, res) {
    var login = req.body.login;
    var password = req.body.senha;
    if (login == 'admin' && password == 'admin') {
        res.status(200);
        res.sendFile(path.join(__dirname + '/todo_listv3.html'));
    } else {
        res.status(401);
        res.sendFile(path.join(__dirname + '/login.html'));
    }
});


app.listen(3000);

console.log("Servidor executando na porta 3000");

function writeJsonFile(content) {
    fs.writeFile('database/tasks.json', content, function (err) {
        if (err) throw err;
        console.log('Arquivo json atualizado');
    });
}