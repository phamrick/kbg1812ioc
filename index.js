var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.use(express.static('images'))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.htm');
});

app.get('/load_images_at_start', function(req, res){
  res.sendFile(__dirname + '/load_images_at_start.json');
});

io.on('connection', function(socket){
  //socket.on('instantiateCard', function(data){
  //  
  //  socket.broadcast.emit('instantiateCard',  { nodeID: data.nodeID, 
  //	                              cardKey: data.cardKey  });
  //});
 
 socket.on('dragKnode', function(data){
	
   socket.broadcast.emit('dragKnode',  { nodeID: data.nodeID,
								x: data.x,
								y: data.y});
 });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
