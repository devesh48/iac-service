const express = require('express');
const router = express.Router();
const serviceDs = require('../lib/iac-tool-ds');


router.get('/healthcheck', function (req, res) {
    try {
        console.log("message success. service up and running");
        res.send({ "status": "success" });
    } catch (e) {
        throw e
    }
})

router.get('/', function (req, res) {
    try {
        console.log("message success. service up and running");
        res.send({ "status": "success, Hello there!!" });
    } catch (e) {
        throw e
    }
})

router.post('/addNewPattern', (req, res) => {
    try {
        var data = req.body
        serviceDs.insertData(data);
        console.log("message success. service up and running");
        res.send({ message: 'Insertion successfull' });
    } catch (e) {
        console.log(e);
        throw e
    }
})

router.get('/getPatternNames', async (req, res) => {
    try {
        var result = await serviceDs.getUniqueNames();
        res.send(result);
    } catch (e) {
        console.log(e);
        throw e
    }
})

router.post('/createNewPipeline', (req, res) => {
    try {
        var data = req.body
        serviceDs.insertNewPipelineData(data);
        console.log("message success. service up and running");
        res.send({ message: 'Insertion successfull' });
    } catch (e) {
        console.log(e);
        throw e
    }
})


router.get('/getAllPipelines', async (req, res) => {
    try {
        var result = await serviceDs.readAllPipelineInfo();
        res.send(result);
    } catch (e) {
        console.log(e);
        throw e
    }
})


module.exports = router;
