var express = require('./');
//由于测试服的环境限制，端口输出控制，去掉ws的方法先  
var app = express.createServer()
, io = require('socket.io').listen(app, {transports:['websocket', 'flashsocket','xhr-polling']})
, routesUser = require('./routes/user')
, routesIndex = require('./routes/index');
var parseCookie = require('connect').utils.parseCookie,
	MemoryStore = require('connect/lib/middleware/session/memory');
app.use(express.logger('dev'));
var port = require("./config/config").httpPort;
//建立一个memory store的实例
var storeMemory = new MemoryStore({
	reapInterval: 1000 * 60 * 10
});
// Configuration
app.configure(function(){
  app.use(express.bodyParser());//解析post
  app.use(express.cookieParser());//解析cookie
  //设置session
  app.use(express.session({
          secret: 'samoin',
          store:storeMemory
  }));

  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(express.static(__dirname + '/config'));
});
app.listen(port);
//增加对所有链接的过滤
app.all("/*",function(req,res,next){
    next();
});
/**
* 默认欢迎页

app.get('/', function(req, res){
  console.log(req.protocol);
  res.send('hello , welcome to IMJrj , thanks node.js!<br/>金融界');
});*/
app.get("/index",routesIndex.index);
/**
* im的用户相关的路由

app.get('/user/id/:id', routesUser.viewUserList);//:id([0-9]+),可以通过正则来进行限定参数的格式
app.get('/user/pass/:pass', routesUser.viewUserList);
app.get('/user/talk/id/:id,:fromId,:nickName', routesUser.viewUserTalk);
console.log("server started , listening port %s" , port);
*/

var userIdSocketObj = {};
var userIdInfoObj = {};
var isMuiltySign = false;
//socket.io
io.sockets.on('connection', function (socket) {
  /**
  // 初始化信息 
  socket.on('init', function (data) {
    //console.log(">>recieved init info : " + data);
	var userId = data.id;
	var passport = data.passport;
	var nickName = data.nickName;
	if(!userIdSocketObj[userId]){
	  var userIdSocketObjArr = [];
	  userIdSocketObjArr.push(socket);
	  userIdSocketObj[userId] = userIdSocketObjArr;
	  userIdInfoObj[userId] = data;
	  socket.emit("loginInfo",{state : 0 , msg : "登录成功"});
	}else{
	  var userIdSocketObjArr = userIdSocketObj[userId];
	  for(var i=0;i<userIdSocketObjArr.length;i++){
		var curSocket = userIdSocketObjArr[i];
		if(!curSocket){
          delete(userIdSocketObjArr[i]);
		}
		if(curSocket){
		  var data = isMuiltySign ? {state : 1 , msg : "您在其它地方登录了，本系统支持多点登录"} : {state : -1 , msg : "您在其它地方登录了，本系统不支持多点登录"};
		  curSocket.emit("loginInfo",data);
		}
	  }
	  userIdSocketObjArr.push(socket);
	  userIdSocketObj[userId] = userIdSocketObjArr;
      userIdInfoObj[userId] = data;
      socket.emit("loginInfo",{state : 0 , msg : "登录成功"});
	}
	console.log("passport[%s] logined , inited info ... ",passport);
  });
  // 处理消息
  socket.on('message', function (data) {
	var toId = data.toId;
	var fromId = data.fromId;
	var msg = data.msg;
	var fromName = data.fromName;
	var toName = data.toName;
	//console.log(">>>>>>> recived msg : %s %s %s",fromId,toId,msg);
	sendMsgToUser(toId,msg,1,fromId,toId,fromName,toName);
	sendMsgToUser(fromId,msg,1,fromId,toId,fromName,toName);
  });

  socket.on('disconnect', function () {
	  console.log(">>>>>>> leave.... ");
    //io.sockets.emit('user disconnected');
  });
  // 发送消息到客户端
  function sendMsgToUser(userId,msg,state,fromId,toId,fromName,toName){
	//console.log(">>>>>>> .... %s " , userId);
    var userIdSocketObjArr = userIdSocketObj[userId];
    if(!userIdSocketObjArr || !userIdSocketObjArr.length){
      return;
    }
	for(var i=0;i<userIdSocketObjArr.length;i++){
		var curSocket = userIdSocketObjArr[i];
		if(!curSocket){
          delete(userIdSocketObjArr[i]);
		}
	    if(curSocket){
	      curSocket.emit("message",{state : state , msg : msg , fromId : fromId , toId : toId , fromName : fromName , toName : toName});
	    }
	}
  }*/
  socket.on('disconnect', function () {
	  console.error(">>>>>>> leave.... ");
    //io.sockets.emit('user disconnected');
  });
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  
  setInterval(function(){
  	socket.broadcast.emit('system msg',{msg : 'loop this every'});
  },10000);
});

