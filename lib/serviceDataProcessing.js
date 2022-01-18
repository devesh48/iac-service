var mongoDs;
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
}

module.exports = new processing;