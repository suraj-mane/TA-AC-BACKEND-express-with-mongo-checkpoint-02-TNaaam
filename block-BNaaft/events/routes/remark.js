var express = require('express');
var router = express.Router();
var event = require('../models/event');
var remark = require('../models/remark');


/* GET Likes*/
router.get('/:id/likes', (req,res,next) => {
  var id = req.params.id;
  remark.findByIdAndUpdate(id, {$inc:{likes:1}}, (err,data) =>{
    if(err) return next(err);
    res.redirect('/event/' + data.eventId);
  })
})

/* GET remark Edit */
router.get('/:id/edit', (req,res,next) => {
  var id = req.params.id;
  remark.findById(id, req.body, (err, data) => {
    if(err) return next(err);
    res.render('editRemark', {data:data});
  })
})

/* POST Edit the Remark*/
router.post('/:id/edit', (req,res,next) => {
  var id = req.params.id;
  remark.findByIdAndUpdate(id, req.body, (err,data) => {
    if(err) return next(err);
    res.redirect('/event/' + data.eventId);
  })
})

/* delete Remark */
router.get('/:id/delete', (req,res,next) => {
  var id = req.params.id;
  remark.findByIdAndDelete(id, (err,data) => {
    if(err) return next(err);
    event.findByIdAndUpdate(data.remark, {$pull: {remark: data._id}}, (err,d) => {
      if(err) return next(err);
      res.redirect('/event/' + data.eventId);
    })
  })
})

module.exports = router;