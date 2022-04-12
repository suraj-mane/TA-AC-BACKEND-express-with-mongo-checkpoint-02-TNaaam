var express = require('express');
var router = express.Router();
var event = require('../models/event');
var remark = require('../models/remark');

/* GET home page. */
router.get('/', function(req, res, next) {
  event.find({}, (err,main) => {
    if(err) return next(err);
    event.find().distinct('categories',(err,category) => {
      if(err) return next(err);
        res.render('events', {main,category});
     })
  })
});

router.post('/', (req,res,next) => {
  var text = req.body.text;
  event.find({'categories':{$in:[text]}},(err,sdata) => {
    if(err) return next(err);
     res.render('events', {sdata:sdata});
  })
})

/* GET Event create form */
router.get('/new', function(req,res,next) {
  res.render('createEvent');
})

/* POST add event */
router.post('/new', function(req,res,next) {
  req.body.categories = req.body.categories.split(" ");
  event.create(req.body, (err,data) => {
    if(err) return next(err); 
    res.redirect("/event");         
  });          
});

/* GET event by Id */
router.get('/:id', (req,res,next) => {
  var id = req.params.id;
  event.findById(id).populate("remark").exec((err,data) => {
    if(err) return next(err);
    res.render('singlevent', {data: data});
  })
})

/* GET event and Edit*/
router.get('/:id/edit', (req,res,next) => {
  var id = req.params.id;
  event.findById(id, (err,data) => {
    if(err) return next(err);
    res.render('editEvent', {data:data});
  })
})

/** Add Likes */
router.get('/:id/like', (req,res,next) => {
  var id = req.params.id;
  event.findByIdAndUpdate(id, {$inc:{likes:1}}, (err,data) => {
    if(err) return next(err);
    res.redirect('/event/'+ id);
  })
})

/* POST Edit event and add */
router.post('/:id/edit', (req,res,next) => {
  var id = req.params.id;
  event.findByIdAndUpdate(id, req.body, (err,data) => {
    if(err) return next(err);
    res.redirect('/event/' + id);
  })
})

/* POST create remark */
router.post('/:id/remark', (req,res,next) => {
  var id = req.params.id;
  req.body.eventId = id;
  remark.create(req.body, (err,data) => {
    if(err) return next(err);
    event.findByIdAndUpdate(id,{$push:{remark:data._id}}, (err,data) => {
      if(err) return next(err);
      res.redirect('/event/' + id);
    })
  })
})

/** Delete event and remark */
router.get('/:id/delete', (req,res,next) => {
  var id = req.params.id;
  event.findByIdAndDelete(id, (err,data) => {
    if(err) return next(err);
    remark.deleteMany({eventId: data.id}, (err,data) => {
      if(err) return next(err);
      res.redirect('/event');
    })
  })
})

module.exports = router;