var mongoDs;
const serviceDs = require('../lib/iac-tool-ds');
const handlebars = require('../lib/handler-utilty');
const folderUtility = require('./folder-utility');
const gitUtility = require('./git-utility');
const fs = require('fs');
const path = require('path');
const pipelineTrigger = require('./pipelineTrigger');

class processing {
    async init() {
        try {
            console.log('processing is initialized');
        } catch (error) {
            throw error;
        }
    }

    async processTriggerData(data) {
        try {
            var me = this;
            console.log('processing function is triggered');
            console.log(data);
        } catch (error) {
            throw error;
        }
    }

    async processAddNewPattern(data) {
        try {
            var me = this;
            serviceDs.insertData(data);
            console.log('processing function is triggered');
        } catch (error) {
            throw error;
        }
    }

    async processUniqueName() {
        try {
            var result = await serviceDs.getUniqueNames();
            return result;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async processNewPipeline(data) {
        try {
            if (data['_id']) {
                delete (data['_id']);
            }
            var dataInputs = await this.processDataInputs(data['templateDetails']);
            data['jsonTemplate'] = JSON.parse(data['jsonTemplate']);
            let finalData = await this.processDynamicUserInput(dataInputs, data['jsonTemplate']);
            data['dynamicTemplateData'] = finalData;
            serviceDs.insertNewPipelineData(data);
            console.log("Insertion succesfull");
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async processExistingPipeline() {
        try {
            var result = await serviceDs.readAllPipelineInfo();
            return result;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async createJSONFile(data) {
        try {
            let cleanPath = path.join(__dirname, "../DataSource");
            await folderUtility.cleanDataDIRUtility(cleanPath);
            const currentPath = path.join(__dirname, "../DataSource", "data.json");
            var result = JSON.stringify(data)
            await fs.writeFileSync(currentPath, result);
            console.log('file created');
            cleanPath = path.join(__dirname, "../gitSource");
            await folderUtility.cleanDataDIRUtility(cleanPath);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async buildJenkinsFile(data) {
        try {
            if (data['gitRepoName'] && data['gitRepoName'] !== '') {
                console.log('no need for jenkinsFile creation')
            } else {
                const tempData = "pipeline { agent any stages { stage('build') { steps { sh \"echo 'hello world devesh changes'\" }}}}"
                const currentPath = path.join(__dirname, "../DataSource", "jenkinsfile");
                // var result = JSON.stringify(data)
                await fs.writeFileSync(currentPath, tempData);
                console.log('Jenkins file created');
            }
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async JenkinsBuildTrigger(gitreponame) {
        try {
            var result = await pipelineTrigger.buildJenkinsFile(gitreponame);
            return result;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async commitGitRepo(data) {
        try {
            if (!data['gitRepoName'] || data['gitRepoName'] === '') {
                const cleanPath = path.join(__dirname, "../gitSource");
                await folderUtility.cleanDataDIRUtility(cleanPath);
                await gitUtility.gitClone(data['gitURL'], data['gitToken']);
                await folderUtility.moveFile(data['gitURL']);
                await gitUtility.performCommit();
                console.log("File updated in Git repository");
            } else {
                await this.JenkinsBuildTrigger(data['gitRepoName']);
            }
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async processDataInputs(data) {
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
            throw e;
        }
    }

    async processpatternByName(name) {
        try {
            var result = await serviceDs.getPatternDataByName(name);
            return result;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async processDynamicUserInput(message, template) {
        try {
            var result = await handlebars.handleEvent(message, template);
            console.log(result);
            return result;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async processJenkinsFile() {
        try {
            // fasdfa
            console.log('hola broda...');
        } catch (e) {
            throw e;
        }

    }

    async handleFolderUtility() {
        try {
            // fasdfa
            folderUtility.createDIRUtility();
        } catch (e) {
            throw e;
        }

    }

    async handleGITUtility() {
        try {
            gitUtility.gitClone();
        } catch (e) {
            throw e;
        }

    }

    async triggerGITUtility() {
        try {
            serviceDs.getLatestRecordUpdated();
        } catch (e) {
            throw e;
        }

    }

    async processNewPipeline(data) {
        try {
            if (data['_id']) {
                delete (data['_id']);
            }
            var dataInputs = await this.processDataInputs(data['templateDetails']);
            data['jsonTemplate'] = JSON.parse(data['jsonTemplate']);
            let finalData = await this.processDynamicUserInput(dataInputs, data['jsonTemplate']);
            data['dynamicTemplateData'] = finalData;
            serviceDs.insertNewPipelineData(data);
            console.log("Insertion succesfull");
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}

module.exports = new processing;