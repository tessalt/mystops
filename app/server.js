var express = require("express");
var app = express();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.use(express.bodyParser());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.get('/select', function(req, res){
  res.sendfile('select.html');
});

app.get('/', function(req, res){
  res.sendfile('index.html');
});

var port = process.env.PORT || 9000;
app.listen(port, function() {
  console.log("Listening on " + port);
});