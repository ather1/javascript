var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://Ather Mohammed:h3110@ds223578.mlab.com:23578/tims',['Tenants']);
//var db = mongojs('mongodb://Ather Mohammed:h3110@ds047666.mlab.com:47666/mytenantlist_brad', ['Tenants']);

// Get All tenants
router.get('/tenants', function(req, res, next){
    db.Tenants.find(function(err, tenants){
        if(err){
            res.send(err);
        }
        res.json(tenants);
    });
});

// Get Single tenant
router.get('/tenant/:id', function(req, res, next){
    db.Tenants.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, tenant){
        if(err){
            res.send(err);
        }
        res.json(tenant);
    });
});

//Save tenant
router.post('/tenant', function(req, res, next){
    var tenant = req.body;
    if(!tenant.title || !(tenant.isDone + '')){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.Tenants.save(tenant, function(err, tenant){
            if(err){
                res.send(err);
            }
            res.json(tenant);
        });
    }
});

// Delete tenant
router.delete('/tenant/:id', function(req, res, next){
    db.Tenants.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, tenant){
        if(err){
            res.send(err);
        }
        res.json(tenant);
    });
});

// Update tenant
router.put('/tenant/:id', function(req, res, next){
    var tenant = req.body;
    var updtenant = {};
    
    if(tenant.isDone){
        updtenant.isDone = tenant.isDone;
    }
    
    if(tenant.title){
        updtenant.title = tenant.title;
    }
    
    if(!updtenant){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.Tenants.update({_id: mongojs.ObjectId(req.params.id)},updtenant, {}, function(err, tenant){
        if(err){
            res.send(err);
        }
        res.json(tenant);
    });
    }
});

module.exports = router;