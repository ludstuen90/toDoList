var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedparser = bodyParser.urlencoded({extended: false});
var pg = require('pg');
var path = require('path');
var connectionString = 'postgres://localhost:5432/toDo';
var http = require('http');
app.use(express.static('public'));
http.globalAgent.maxSockets = 100;

app.listen(3000, 'localhost', function(req, res){
  console.log('the server is listening on port 3000');
});

app.get('/', function(req, res){
  console.log('at base URL');
  res.sendFile(path.resolve('views/index.html'));
});

app.post('/sendItem', urlencodedparser, function(req, res){
  var itemIn = req.body.todo;
  pg.connect(connectionString, function(err, client, done){
    client.query("INSERT INTO list (toDo, completed) VALUES ('"+ itemIn + "', false);");
    done();
  });
  console.log("in sendItem, and we have received: " + itemIn);
  res.end();
});

app.post('/deleteItem', urlencodedparser, function(req, res){
  var deleteThis = req.body.id;
  console.log("From the delete request, we have received: " + deleteThis);

  pg.connect(connectionString, function(err, client, done){
    client.query("DELETE FROM list WHERE id=" + deleteThis);
    done();
  });
res.end();
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

  app.get('/getCompleted', function(req, res){
    var results = [];
    pg.connect(connectionString, function(err, client, done){
    var query=  client.query("SELECT * FROM list  WHERE completed=true ORDER BY id DESC;");
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


  app.post('/completeItem', urlencodedparser, function(req, res){
    var completeThis = req.body.id;
    console.log("From the complete request, we have received: " + completeThis);

    pg.connect(connectionString, function(err, client, done){
      client.query("UPDATE list set completed=true WHERE id=" + completeThis);
      done();
    });
  res.end();
  });
});
