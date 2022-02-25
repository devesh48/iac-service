// require the library, main export is a function
const simpleGit = require('simple-git');
// simpleGit().clean(simpleGit.CleanOptions.FORCE);


class gitUtility {

  async init(){
    this.git = simpleGit('gitSource', { binary: 'git' });
  }

  async gitClone(repoURL, token) {
    try {
      var me = this;
      const USER = 'acc-github-repo';
      let PASS = token?token:'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';
      // me.git = simpleGit('gitSource', { binary: 'git' });
      const REPO = repoURL?repoURL:'github.com/acc-github-repo/iac-auto-commit.git';
      var nameArray = REPO.split('.git')[0].split('/');
      var reponame = nameArray.slice(-1)[0]
      console.log(repoURL, token);

      const remote = `https://${USER}:${PASS}@${REPO}`;

      await me.git.clone(remote).then(() => console.log('finished')).catch((err) => console.error('failed: ', err));
      me.git = simpleGit('gitSource/' + reponame, { binary: 'git' });

    } catch (e) {
      throw e;
    }
  }

  async performCommit() {
    try {
      var me = this;
      await me.git.add('.').commit("Adding new file changes").push('origin', 'main');
    } catch (e) {
      throw e;
    }
  }

  async main() {
    try {
      const status = await git.status();

      if (!status.isClean()) {
        return;
      }

      await git.checkout("HOTFIX");
      await git.reset("hard", ["origin/HOTFIX"]);
      await git.pull();

      await git.checkout("STAGING");
      await git.reset("hard", ["origin/STAGING"]);
      await git.pull();

      await git.rebase(["HOTFIX"]);
      await git.push("origin", "STAGING", ["--force"]);
    } catch (error) {
      const status = await git.status();

      if (status.conflicted.length > 0) {
        return;
      }
      console.log(error);
    }
  }

}

module.exports = new gitUtility;