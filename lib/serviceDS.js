const { type } = require('express/lib/response');
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://demo1234:demo1234@cluster0.na252.mongodb.net/acce-iac?retryWrites=true&w=majority";
var mongoDs;
var collection;
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

    async readData (params) {
        try {
            var me = this;
            var query = {key: params.type}
            var result = await mongoDs.collection("iacData_1_0").find({}).toArray();
            console.log('monog function is triggered');
            console.log(result);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async updateConfig (data) {
        try {
            var me = this;
            var query = {key: data.patternName}
            var result = await mongoDs.collection("iacData_1_0").findOneAndReplace(query,{"$set" : data},{upsert: true});
            console.log('monog function is triggered');
            console.log(result);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async readDefaultData (params) {
        try {
            var me = this;
            var query = {key: params.type}
            var result = await mongoDs.collection("sampleTemplate_1_0").find({}).toArray();
            console.log('monog function is triggered');
            console.log(result);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async insertData(data) {
        try {
            var me = this;
            var result = await mongoDs.collection("iacData_1_0").insertOne(data);
            console.log(result);
            console.log('monog Insert successfull');
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new serviceDS;