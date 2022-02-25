var serviceDs = require('../lib/iac-tool-ds');
var processing= require('../lib/processing')
var utility = require('../lib/handler-utilty');
var folderUtility = require('../lib/folder-utility');
var gitUtil = require('../lib/git-utility');
class Controller {
    init() {
        try {
            return new Promise((resolve, reject) => {
                console.log('initializing services');
                var inits = [serviceDs.init(), utility.init(), folderUtility.init(), gitUtil.init()]
                Promise.all(inits).then(
                    () => {
                        console.log('All the servicess initialized successfully');
                        setTimeout(() => {
                            resolve(processing.startPolling());
                        }, 5000);
                        
                    },
                    (error) => {
                        console.log('Service initialization failed');
                        reject(error);
                    }
                )
            })
        } catch (error) {
            throw error;
        }
    }

    sampleFunction() {
        try {
            console.log('sample function is triggered');
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Controller;
