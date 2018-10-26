var http = require('http').createServer(servidor);
var fs = require('fs');

function servidor(requisicao, resposta){
    resposta.writeHead(200);
    resposta.end(fs.readFileSync('../login.html'));
};

http.listen(4000, function(){
  console.log("Servidor On-line");
});