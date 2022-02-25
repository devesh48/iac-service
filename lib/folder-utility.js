const fs = require('fs');
const path = require('path');
const mv = require('mv');

class directoryUtility {
    async init() {
        try {
            const dir = path.join(__dirname, "../gitSource");
            if (!fs.existsSync(dir)) {
                await fs.mkdirSync(dir);
                console.log("gitSource is created.");
            }
            const dirNew = path.join(__dirname, "../DataSource");
            if (!fs.existsSync(dirNew)) {
                await fs.mkdirSync(dirNew);
                console.log("Datasource is created.");
            }

        } catch (e) {
            throw e;
        }
    }
    async cleanDataDIRUtility(inputPath) {
        try {
            await fs.rmdirSync(inputPath, { recursive: true });
            await fs.mkdirSync(inputPath);
        } catch (err) {
            console.log(err);
        }
    }

    async moveFile(gitData) {
        try {
            const repoName = gitData.split('.git')[0].split('/').slice(-1)[0];
            const currentPath = path.join(__dirname, "../DataSource");
            const destinationPath = path.join(__dirname, "../gitSource/" + repoName);
            // Assuming all files are in same folder
            let files = ['data.json', 'jenkinsfile'];

            // I am using simple for, you can use any variant here
            for (var i = files.length - 1; i >= 0; i--) {
                var file = files[i];
                if (fs.existsSync(currentPath + '/' + file)){
                    fs.renameSync(currentPath + '/' + file, destinationPath + '/' + file);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

}

module.exports = new directoryUtility;