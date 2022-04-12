var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
  title:{type:String},
  summary:{type:String},
  host:{type:String},
  start:{type:Date},
  end:{type:Date},
  location:{type:String},
  categories:[{type:String}],
  likes:{type:Number, default:0},
  remark:[{type:Schema.Types.ObjectId, ref:"remark"}]
}, {timestamps:true});

var event = mongoose.model('event', eventSchema);
module.exports = event;