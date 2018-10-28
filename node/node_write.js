function writeNode() {
  var fs = require('fs');
  fs.writeFile('testenode.txt', 'nome1:ramon\n', function (err) {
    if (err) throw err;
    console.log('Arquivo substituido');
  });
}