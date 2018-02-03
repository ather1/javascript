var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://Atherm:h3110@ds223578.mlab.com:23578/tims',['tenants']);

//Get All Tasks
router.get('/tenants',function(req,res,next){
    db.tenants.find(function(err,tenants){
        if(err){
            res.send(err);

        }
        res.json(tenants);
    });
});


//Get Single tasks
// router.get('/tenants/:id',function(req,res,next){
//     db.tenants.findOne(_id: mongojs.Ofunction(err,tenants){
//         if(err){
//             res.send(err);

//         }
//         res.json(tenants);
//     });
// });

module.exports = router;

