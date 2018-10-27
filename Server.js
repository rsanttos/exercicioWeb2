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
    console.log('chamou');
    res.sendFile(path.join(__dirname + '/todo_listv3.html'));
});

app.get('/writetasks', function (req, res) {
    var content;
    writeJsonFile(content);
});

app.get('/readtasks', function (req, res) {
    var content = readJsonFile();
});

app.post('/dologin', function (req, res) {
    var login = req.body.login;
    var password = req.body.senha;
    if (login == 'admin' && password == 'admin') {
        res.sendFile(path.join(__dirname + '/todo_listv3.html'));
    } else {
        res.send('Credenciais erradas.');
    }
});


app.listen(3000);

console.log("Running at Port 3000");

function writeJsonFile(content) {
    fs.writeFile('database/tasks.json', content, function (err) {
        if (err) throw err;
        console.log('Arquivo substituido');
    });
}

function readJsonFile() {
    fs.readFile('database/tasks.json', 'utf8', function (err, dados) {
        return dados;
    });
}