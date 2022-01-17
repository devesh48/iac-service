const express = require('express');
const router = express.Router();
const serviceDs = require('../lib/serviceDS');
var logger = require('morgan');


router.get('/healthcheck', function (req,res){
    try{
        console.log("message success. service up and running");
        res.send({"status" : "success"});
    }catch(e){
        throw e
    }
})

router.post('/insertConfig', (req,res) => {
    try{
       var data = req.body
        serviceDs.insertData(data);
        console.log("message success. service up and running");
        res.send({message:'Insertion successfull'});
    }catch(e){
        console.log(e);
        throw e
    }
})

router.get('/getConfig', async (req,res) => {
    try{
       var data = req.params
        var result = await serviceDs.readData(data);
        res.send(result);
    }catch(e){
        console.log(e);
        throw e
    }
})

module.exports = router;
