import { existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "fs";
import { EOL } from "os";
import { runCommand } from ".";
import { Spinner } from "cli-spinner";
import * as path from "path";
import { pathExistsSync } from "fs-extra";

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

function copyFolderRecursiveSync(source, target) {
    var files = [];

    // Check if folder needs to be created or integrated
    var targetFolder = path.join(target, path.basename(source));
    if (!existsSync(targetFolder)) {
        mkdirSync(targetFolder);
    }

    // Copy
    if (lstatSync(source).isDirectory()) {
        files = readdirSync(source);
        files.forEach(function (file) {
            var curSource = path.join(source, file);
            if (lstatSync(curSource).isDirectory()) {
                copyFolderRecursiveSync(curSource, targetFolder);
            } else {
                copyFileSync(curSource, targetFolder);
            }
        });
    }
}

function copyFileSync(source, target) {

    var targetFile = target;

    // If target is a directory, a new file with the same name will be created
    if (existsSync(target)) {
        if (lstatSync(target).isDirectory()) {
            targetFile = path.join(target, path.basename(source));
        }
    }

    writeFileSync(targetFile, readFileSync(source));
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
        copyFolderRecursiveSync(templatePath, projectPath);
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
                console.log(`'cd' into project folder ${folderName}`)
            }
            console.log(`Execute command - 'mahal-creator dev' for startin dev server`);
        }
    }
    catch (err) {
        console.error(err);
        SpinnerHelper.stop();
    }
}