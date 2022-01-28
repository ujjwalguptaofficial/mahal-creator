import { copySync, pathExistsSync } from "fs-extra";
import { EOL } from "os";
import { runCommand } from ".";
import { Spinner } from "cli-spinner";
import * as path from "path";

class SpinnerHelper {
    static spinnerInstance;
    static init(text: string) {
        const spinnerInstance = SpinnerHelper.spinnerInstance = new Spinner(`${text}.. %s`);
        spinnerInstance.setSpinnerString(18);
        spinnerInstance.start();
    }

    static stop() {
        SpinnerHelper.spinnerInstance.stop();
    }
}

export const createProject = async function (type, folderName) {
    const projectPath = path.join(process.cwd(), folderName);
    console.log("projectPath", projectPath);
    if (pathExistsSync(projectPath)) {
        console.error(`A folder with name ${projectPath} already exist in the current directoy`);
        return;
    }
    var templatePath = path.join(__dirname, '../templates', type);
    try {

        SpinnerHelper.init("Setting up project");
        copySync(templatePath, projectPath);
        SpinnerHelper.stop();
        SpinnerHelper.init(`Installing dependency`);
        // downloading dependencies
        let exitCode = await runCommand(`cd ${projectPath} && npm ci`);
        SpinnerHelper.stop();
        if (exitCode != 0) {
            console.log(`unable to install dependencies, process exited with code ${exitCode.toString()}`)
        }
        else {
            console.log(`${EOL}new project '${projectPath}' initiated`);
            if (folderName) {
                console.log(`Execute command 'cd ${folderName}' to enter into project directory.`)
            }
            console.log(`Execute command - 'mahal-creator dev' for startin dev server.`);
        }
    }
    catch (err) {
        console.error(err);
        SpinnerHelper.stop();
    }
}