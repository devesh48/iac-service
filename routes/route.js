const express = require('express');
const router = express.Router();
const service = require('../lib/iac-tool');


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
        service.processAddNewPattern(data);
        console.log("message success. service up and running");
        res.send({ message: 'Insertion successfull' });
    } catch (e) {
        console.log(e);
        throw e
    }
})

router.get('/getPatternNames', async (req, res) => {
    try {
        var result = await service.processUniqueName();
        res.send(result);
    } catch (e) {
        console.log(e);
        throw e
    }
})

router.post('/createNewPipeline', (req, res) => {
    try {
        var data = req.body
        service.processNewPipeline(data);
        console.log("message success. service up and running");
        res.send({ message: 'Insertion successfull' });
    } catch (e) {
        console.log(e);
        throw e
    }
})


router.get('/getAllPipelines', async (req, res) => {
    try {
        var result = await service.processExistingPipeline();
        res.send(result);
    } catch (e) {
        console.log(e);
        throw e
    }
})

router.get('/getPatternByName/:name', async (req, res) => {
    try {
        var name = req.params['name'];
        var result = await service.processpatternByName(name);
        res.send(result);
    } catch (e) {
        console.log(e);
        throw e
    }
})

router.post('/getHandlebars', async (req, res) => {
    try {
        var data = req.body;
        var result = await service.processDynamicUserInput(data['message'],data['template']);
        res.send(result);
    } catch (e) {
        console.log(e);
        throw e
    }
})

router.post('/parseJson', async (req, res) => {
    try {
        var data = req.body;
        console.log(data['jsonTemplate']);
        var result = await service.parseJson(data['jsonTemplate']);
        res.send(result);
    } catch (e) {
        console.log(e);
        throw e
    }
})


module.exports = router;
