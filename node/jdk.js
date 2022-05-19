var path = require('path');
const { exec } = require('child_process');



class JdkService {
  
    out = "";



    async getInstalledVersionsString() {
        return new Promise(resolve => {
            exec("update-java-alternatives --list ",
                (error, stdout, stderr) => {
                    return resolve(stdout);
                });
        });
    }


    convertToObjects(out) {
        let versions = [];
        let completeArray = out.split("\n");
        for (let i = 0; i < completeArray.length; i++) {
            if (completeArray[i] != "") {
                let versionsObject = {
                    name: completeArray[i].split(" ")[0],
                    path: completeArray[i].split(" ")[completeArray[i].split(" ").length - 1]
                };
                versions.push(versionsObject);
            }
        }
        return versions;
    }


    getVersionsList() {
        return new Promise(resolve => this.getInstalledVersionsString().then(out => {
            resolve(this.convertToObjects(out));
        }));
    }

    setJavaVersion(path) {
        exec(`sudo update-java-alternatives --set ${path}`,
            (error, stdout, stderr) => {
                console.log(stdout);
            });

    }

    getCurrentVersion() {
        return new Promise(resolve => {
            exec("java -version",
                (error, stdout, stderr) => {
                    resolve(stderr);
                });
        });
    }

};
module.exports.JdkService = JdkService;




/* if (process.platform === "linux") { }


 */




/*  await exec("sudo update-java-alternatives --list ",
  (error, stdout, stderr) => {
    return out = stdout;
 }) */











/* getInstalledVersionsString().then(function (versionsString) {
    const selectedVersion = convertToObjects(versionsString)[1];
    console.log(selectedVersion.path);
    setJavaVersion(selectedVersion.path);
    exec("java -version",
        (error, stdout, stderr) => {
            console.log(stdout);
        }
    );
}); */


/* console.log("versions: " + convertToObjects(out)); */

/* setJavaVersion(versions[0].path); */
