var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var remarkSchema = new Schema({
  title:{type:String},
  author:{type:String},
  likes:{type:Number, default:0},
  eventId:[{type:Schema.Types.ObjectId, ref:"event"}]
}, {timestamps:true});

var remark = mongoose.model('remark', remarkSchema);
module.exports = remark;