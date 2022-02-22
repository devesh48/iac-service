var serviceDs = require('../lib/iac-tool-ds');
var processing= require('../lib/processing')
class Controller {
    init() {
        try {
            console.log('first function');
            return new Promise((resolve, reject) => {
                console.log('initializing services');
                var inits = [serviceDs.init()]
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
