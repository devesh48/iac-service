var asyncMode = require('async')
var serviceDs = require('./iac-tool-ds');
var service = require('./iac-tool');
var gitUtil = require('./git-utility');
class processing{
    startPolling(){
        var me = this;
        asyncMode.forever(
            function(next){
                me.fetchRecord().then(()=>{
                    setTimeout(() => {
                        next();
                    }, 4000);
                })
            }
        )
    }
   async fetchRecord(){
       try {
        var response = await serviceDs.getRecordForProcessing();
        console.log(response);
        if (response){
            var finalData = response['dynamicTemplateData']
            // await gitUtil.init();
            await service.createJSONFile(finalData);
            await service.buildJenkinsFile(response);
            await service.commitGitRepo(response);
            await serviceDs.setProcessingIndex(response);
        }
       } catch (error) {
        console.log(error) 
       }
        
    }
}

module.exports = new processing;
