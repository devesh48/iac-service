const express = require('express');
const router = express.Router();
const serviceDs = require('../lib/serviceDS');
var logger = require('morgan');
const serviceDataProcessing = require('../lib/serviceDataProcessing');


router.get('/healthcheck', function (req,res){
    try{
        console.log("message success. service up and running");
        res.send({"status" : "success"});
    }catch(e){
        throw e
    }
})

router.get('/', function (req,res){
    try{
        console.log("message success. service up and running");
        res.send({"status" : "success, Hello there!!"});
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

router.get('/defaultConfig', async (req,res) => {
    try{
       var data = req.params
        var result = await serviceDs.readData(data);
        res.send(result);
    }catch(e){
        console.log(e);
        throw e
    }
})

router.get('/loadAllConfig', async (req,res) => {
    try{
       var data = req.params
        var result = await serviceDs.readDefaultData(data);
        res.send(result);
    }catch(e){
        console.log(e);
        throw e
    }
})

router.get('/revertConfig', async (req,res) => {
    try{
       var data = req.params
        var result = await serviceDs.readData(data);
        res.send(result);
    }catch(e){
        console.log(e);
        throw e
    }
})

router.post('/updateConfig', async (req,res) => {
    try{
        //update the existing default congif
       var data = req.body
        var result = await serviceDs.readData(data);
        res.send(result);
    }catch(e){
        console.log(e);
        throw e
    }
})

router.post('/triggerDeployment', async (req,res) => {
    try{
        //trigger the deplyment with final object
       var data = req.data
        var result = await serviceDataProcessing.processTriggerData(data);
        res.send(result);
    }catch(e){
        console.log(e);
        throw e
    }
})

module.exports = router;
