var userDao = require("../models/user").dao;
var friendshipDao = require("../models/friendship").dao;
/**
* GET 获取用户的列表
*/
exports.viewUserList = function(req,res){
		var id = req.params.id;
		var pass = req.params.pass;
		var searchObj = null;
		if(id){
			searchObj = {id:id};
		}
		if(pass){
			searchObj = {passport:pass};
		}
		if(searchObj ){
			userDao.find(searchObj,null,function(err,data){
				renderUserList(req,res,err,data);
			});
			return;
		}
		renderUserList(req,res);
}
function renderUserList(req,res,err,data){
	var id = req.params.id;
	var pass = req.params.pass;
	if(data){		
		if(!err && err != null){
			res.end("抱歉，该用户不存在");
			return;
		}
		data = data[0];
		id = data._id;
		pass = data.passport;
		req.session.nickName = data.nickName;
	}
	req.session.userId = id;
	req.session.pass = pass;
	console.log("------>>>"+req.session.userId + ": "+ req.session.pass);
	var from = {id:req.session.userId,pass:req.session.pass,nickName:req.session.nickName};
	friendshipDao.find({userId:id + "",state:1},null,function(err,data){
		if(err){
			data = [];
		}
		var friendIdArr = [];
		if(data.length > 0){
			for(var i=0;i<data.length;i++){
				friendIdArr.push(data[i].friendId);
			}
			var friendIdGroup = friendIdArr.join(",");
			userDao.find({_id : {$in : friendIdArr}},null,function(err,data2){
				//console.log(">>>"+JSON.stringify(data2));
				res.render("userList",{title:"用户列表",userList:data2 , from:from});
			});
		}else{
			res.render("userList",{title:"用户列表",userList:data , from:from});	
		}
	});
}
/**
* GET 进入聊天页面
*/
exports.viewUserTalk = function(req,res){
	var id = req.params.id;
	var fromId = req.params.fromId;
	var nickName = req.params.nickName;
	if(!nickName){
		res.end("");
		return;
	}
	console.log(">>>>>> %s  -  %s",id,req.session.userId);
	userDao.find({_id : id},null,function(err,data){
		var from = {id:fromId,nickName:nickName};
		if(data && data.length > 0){
			data = data[0]
		}
		res.render("userTalk",{title:"用户信息",user:data,from:from});
	});
}