var request = require('request');
var fs = require('fs');
const path = require('path');

class pipelineTrigger {

  async buildJenkinsFile(gitreponame) {
    try {
      var rand = Math.random();
      const file0path = path.join(__dirname, "../DataSource", "input.json");
      var name = ''
      if (gitreponame){
        name = gitreponame;
      }else {
        name = "serviceTest" + rand
      }
      var jenkinsBuildData = {"parameter": [{"name":"input.json", "file":"file0"},{"name":"RepositoryName", "value": name}]}
      var options = {
        'method': 'POST',
        'url': 'http://3.214.182.159:8080/job/CloudBuilder/job/Cloud_Builder_Kick_Off_Pipeline/build',
        'headers': {
          'Authorization': 'Basic c2FiYXJlZXNoYWtva2E6MTE1Njk2MmIwN2UwMGM1ZGZiODZjZTgxNDY1NDVkNTFmMg=='
        },
        formData: {
          'file0': {
            'value': fs.createReadStream(file0path),
            'options': {
              'filename': file0path,
              'contentType': null
            }
          },
          'json': {
            'value': JSON.stringify(jenkinsBuildData),
            'options': {
              'filename': 'json',
              'contentType': null
            }
          }
        }
      };
      var result = await request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        return response.body;
      });
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

}

module.exports = new pipelineTrigger;