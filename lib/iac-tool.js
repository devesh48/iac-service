var mongoDs;
const serviceDs = require('../lib/iac-tool-ds');
const handlebars = require('../lib/handler-utilty');
class processing {
    async init () {
        try {
            console.log('processing is initialized');
        } catch (error) {
            throw error;
        }
    }

    async processTriggerData (data) {
        try {
            var me = this;
            console.log('processing function is triggered');
            console.log(data);
        } catch (error) {
            throw error;
        }
    }

    async processAddNewPattern (data) {
        try {
            var me = this;
            serviceDs.insertData(data);
            console.log('processing function is triggered');
        } catch (error) {
            throw error;
        }
    }

    async processUniqueName(){
        try {
            var result = await serviceDs.getUniqueNames();
            return result;
        } catch (e) {
            console.log(e);
            throw e
        }
    }

    async processNewPipeline(data){
        try {
            if (data['_id']){
                delete(data['_id']);
            }
            var dataInputs = await this.processDataInputs(data['templateDetails']);
            let finalData = await this.processDynamicUserInput(dataInputs,JSON.parse(data['jsonTemplate']));
            data['dynamicTemplateData'] = finalData;
            serviceDs.insertNewPipelineData(data);
            console.log("Insertion succesfull");
        } catch (e) {
            console.log(e);
            throw e
        }
    }

    async processExistingPipeline(){
        try {
            var result = await serviceDs.readAllPipelineInfo();
            return result;
        } catch (e) {
            console.log(e);
            throw e
        }
    }

    async processDataInputs(data){
        try {
            let dataObject = {};
            data.map((i) => {
                let innerObj = i['templateInputDetails'];
                innerObj.map((j) => {
                    dataObject[j['name']] = j['value'];
                })
            })
            return dataObject;
        } catch (e) {
            console.log(e);
            throw e
        }
    }

    async processpatternByName(name){
        try {
            var result = await serviceDs.getPatternDataByName(name);
            return result;
        } catch (e) {
            console.log(e);
            throw e
        }
    }

    async processDynamicUserInput(message, template){
        try {
            var result = await handlebars.handleEvent(message,template);
            console.log(result);
            return result;
        } catch (e) {
            console.log(e);
            throw e
        }
    }
}

module.exports = new processing;