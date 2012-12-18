var MONGO_URL = require('../config/config').mongoUrl;
var mongoose = require('mongoose'),  
    Schema = mongoose.Schema,  
    ObjectId = Schema.ObjectId;  
mongoose.connect(MONGO_URL);  
// 将参数继续暴露给后续的进行引用，减少require代码
exports.mongoose = mongoose;
exports.Schema = Schema;
exports.ObjectId = ObjectId;
	   /** var userId = req.session.userId;
	    var sexType = req.param("sexType");
	    var types = req.param("types");
	    hallDao.findFromCacheOrDB({},null,function(err,data){
		var hallTypes = {0:"我关注所有的话题",1:"我只关注男士的话题",2:"我只关注女士的话题"};
		res.render("setHall",{title:"大厅关注设置",halls:data,sexType:sexType,types:types,hallTypes:hallTypes});
	    });*/
		/**var user = new userDao();
		user.passport = "samoin2";
		user.password = "123456";
		user.nickName = "拒绝2（巨色）";
		user.save(function(err){
		console.log("------ %s" , err)
		});
		var user = new friendshipDao();
		user.userId = "4ff6822bfdd250400b000001";
		user.friendId = "4ff6822bfdd250400b000001";
		user.state = 1;
		user.save(function(err){
		console.log("------ %s" , err)
		});
		user = new friendshipDao();
		user.userId = "4ff6822bfdd250400b000001";
		user.friendId = "4ff6823c765fbe800b000001";
		user.state = 1;
		user.save(function(err){
		console.log("------ %s" , err)
		});*/