var base = require("./base");
FriendshipSchema = new base.Schema({
	userId : {type : String},
	friendId : {type : String},
	state : {type : Number, default : 0},
	createTime : {type : Number, default : new Date().getTime()},
	updateTime : {type : Number}
});
var modelName = "freindship",
    collName = "freindship";
base.mongoose.model(modelName,FriendshipSchema,collName);
var Model = base.mongoose.model(modelName,collName);
exports.dao = Model;