const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://demo1234:demo1234@cluster0.na252.mongodb.net/acce-iac?retryWrites=true&w=majority";
var mongoDs;

class serviceDS {
    async init () {
        try {
            this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            this.client.connect(err => {
                mongoDs = this.client.db("acce-iac");
                // perform actions on the collection object
              });
            console.log('Mongo connection initialized');
        } catch (error) {
            throw error;
        }
    }

    async getRecordForProcessing () {
        try {
            var me = this;
            var result = await mongoDs.collection("iac_patternInfo_1_0").find({}).limit(1).toArray();
            console.log('mongo function is triggered');
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getUniqueNames () {
        try {
            var me = this;
            var result = await mongoDs.collection("iac_patternInfo_1_0").find({}).toArray();
            var nameList = [];
            result.filter(function (item) {
                if (nameList.indexOf(item.patternName) === -1) {
                    nameList.push(item.patternName)
                }
            });
            console.log('monog function is triggered');
            return nameList;
        } catch (error) {
            throw error;
        }
    }

    async readAllPipelineInfo () {
        try {
            var me = this;
            console.log('Fetching all pipeline info');
            var result = await mongoDs.collection("iac_pipelineInfo_1_0").find({}).sort({'_id' : -1}).toArray();
            console.log('mFetch completed');
            console.log(result);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async insertData(data) {
        try {
            var me = this;
            var result = await mongoDs.collection("iac_patternInfo_1_0").insertOne(data);
            console.log(result);
            console.log('monog Insert successfull');
        } catch (error) {
            throw error;
        }
    }

    async insertNewPipelineData(data) {
        try {
            var me = this;
            var result = await mongoDs.collection("iac_pipelineInfo_1_0").insertOne(data);
            console.log(result);
            console.log('monog Insert successfull');
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new serviceDS;
