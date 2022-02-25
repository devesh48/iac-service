const { MongoClient, ObjectId } = require('mongodb');
var ObjectID = require('mongodb').ObjectID;
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
            var query = {"$and" : [{"processingIndexed" : {"$exists" : true}},{"processingIndexed" : false}]};
            var result = await mongoDs.collection("iac_pipelineInfo_1_0").find(query).limit(1).toArray();
            if (result.length > 0){
                return result[0];
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    async setProcessingIndex (data) {
        try {
            var me = this;
            var query = {'_id' : ObjectId(data['_id'])};
            await mongoDs.collection("iac_pipelineInfo_1_0").findOneAndUpdate(query, {'$set' : {'processingIndexed' : true}});
        } catch (error) {
            throw error;
        }
    }

    async getUniqueNames () {
        try {
            var me = this;
            var nameList = await mongoDs.collection("iac_patternInfo_1_0").distinct("patternName");
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

    async getPatternDataByName (name) {
        try {
            var me = this;
            console.log('Fetching all pipeline info');
            var result = await mongoDs.collection("iac_patternInfo_1_0").find({"patternName" : name}).toArray();
            if (result && result.length >= 0){
                console.log(result[0]);
                return result[0];
            }else {
                console.log('record not found');
                return {};
            }
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

    async getLatestRecordUpdated () {
        try {
            var result = await mongoDs.collection("iac_pipelineInfo_1_0").find({}).sort({'_id':-1}).limit(1).toArray();
            if (result && result.length >= 0){
                result[0]['processingIndexed'] = false;
                await mongoDs.collection("iac_pipelineInfo_1_0").findOneAndUpdate({'_id' : ObjectId(result[0]['_id'])}, {'$set' : result[0]});
            }else {
                console.log('record not found');
                return {};
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new serviceDS;
