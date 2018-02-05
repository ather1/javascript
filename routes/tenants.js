
var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://Ather Mohammed:h3110@ds223578.mlab.com:23578/tims',['Tenants']);
//var db = mongojs('mongodb://brad:brad@ds047666.mlab.com:47666/mytenantlist_brad', ['tenants']);

// Get All tenants
router.get('/Tenants', function(req, res, next){
    db.Tenants.find(function(err, tenants){
        if(err){
            res.send(err);
        }
        res.json(tenants);
    });
});

// Get Single tenant
router.get('/tenant/:id', function(req, res, next){
    db.tenants.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, tenant){
            if(err){
                console.log(err);
                res.send(err);
            }
            console.log(req.params.id);
            res.json(tenant);
  
});

//Save tenant
router.post('/tenant', function(req, res, next){
    var tenant = req.body;
    if(!tenant.title || !(tenant.isActive + '')){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.tenants.save(tenant, function(err, tenant){
            if(err){
                res.send(err);
            }
            res.json(tenant);
        });
    }
});

// Delete tenant
router.delete('/tenant/:id', function(req, res, next){
    db.tenants.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, tenant){
        if(err){
            res.send(err);
        }
        res.json(tenant);
    });
});

// Update tenant
router.put('/tenant/:id', function(req, res, next){
    var tenant = req.body;
    var updTenant = {};
    
    if(tenant.isActive){
        updTenant.isActive = tenant.isActive;
    }
    
    if(tenant.title){
        updTenant.title = tenant.title;
    }
    
    if(!updTenant){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.tenant.update({_id: mongojs.ObjectId(req.params.id)},updTenant, {}, function(err, tenant){
        if(err){
            res.send(err);
        }
        res.json(tenant);
    });
    }
});

module.exports = router;