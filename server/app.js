var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedparser = bodyParser.urlencoded({extended: false});
var pg = require('pg');
var path = require('path');
var connectionString = 'postgres://localhost:5432/toDo';

app.listen(3000, 'localhost', function(req, res){
  console.log('the server is listening on port 3000');
});

app.use(express.static('public'));

app.get('/', function(req, res){
  console.log('at base URL');
  res.sendFile(path.resolve('views/index.html'));
});

app.post('/sendItem', urlencodedparser, function(req, res){
  var itemIn = req.body.toDo;
  pg.connect(connectionString, function(err, client, done){
    client.query("INSERT INTO list (toDo, completed) VALUES ('"+ itemIn + "', false);");
  });
  console.log("in sendItem, and we have received: " + itemIn);

});


app.get('/getList', function(req, res){
  var results = [];
  pg.connect(connectionString, function(err, client, done){
  var query=  client.query("SELECT * FROM list  WHERE completed=false ORDER BY id DESC;");
    query.on ('row', function(row){
      results.push(row);
    });
    query.on('end', function(){
      done();
      return res.json(results);
    });
    if(err){
      console.log(err);
    } // end error
  }); // end connect
}); //end send results
