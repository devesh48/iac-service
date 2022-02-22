var asyncMode = require('async')
var serviceDs = require('./iac-tool-ds');
class processing{
    startPolling(){
        var me = this;
        asyncMode.forever(
            function(next){
                me.fetchRecord().then(()=>{
                    setTimeout(() => {
                        next()
                    }, 2000);
                })
            }
        )
    }
   async fetchRecord(){
       try {
        var response = await serviceDs.getRecordForProcessing()
        console.log(response) 
       } catch (error) {
        console.log(error) 
       }
        
    }
}

module.exports = new processing;
