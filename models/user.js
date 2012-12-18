var base = require("./base");
UserSchema = new base.Schema({
	passport : {type : String},
	password : {type : String},
	state : {type : Number, default : 0},
	logo : {type : String},
	sex : {type : Number},
	age : {type : Number},
	nickName : {type : String},
	desc : {type : String},
	email : {type : String},
	createTime : {type : Number, default : new Date().getTime()},
	updateTime : {type : Number}
});
var modelName = "user",
    collName = "user";
base.mongoose.model(modelName,UserSchema,collName);
var Model = base.mongoose.model(modelName,collName);
exports.dao = Model;