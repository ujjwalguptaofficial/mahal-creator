import { pathExistsSync, readFileSync } from "fs-extra";
import { askForProjectLanguage } from "./ask_for_project_language";
import { createProject } from "./create_project";
import { ERROR_MSG_FOR_INVALID_PROJECT_DIRECTORY } from "@/constants";
import { handleDeploy, handleDevStart } from "@/handlers";

export const processCommand = async function (options) {
    if (options.debug) console.log(options);

    if (options.init) {
        const appname = typeof options.new != "string" ? "mahal-app" : options.new;
        const language = await askForProjectLanguage();
        // if (language === 'typescript') {
        //     const language = await askFor();
        // }
        // else {

        // }
        createProject(language, appname);
    }
    else if (options.add || options.dev || options.deploy) {
        var content;
        try {
            const pathOfPackage = "./package.json";
            if (!pathExistsSync(pathOfPackage)) {
                console.error(ERROR_MSG_FOR_INVALID_PROJECT_DIRECTORY);
                return;
            }
            content = readFileSync(pathOfPackage, {
                encoding: "utf8"
            });
        } catch (ex) {
            console.error(ERROR_MSG_FOR_INVALID_PROJECT_DIRECTORY);
        }
        const packageInfo = JSON.parse(content);
        if (packageInfo && packageInfo.project && packageInfo.project.framework === "mahal") {
            if (options.start) {
                handleDevStart();
            } else if (options.deploy) {
                var deployFolderName = typeof options.deploy == "string" ? options.deploy : "bin";
                handleDeploy(deployFolderName);
            }
            // else if (program.add) {
            //     handleFileAdd(packageInfo.project.language);
            // }
        } else {
            console.error(ERROR_MSG_FOR_INVALID_PROJECT_DIRECTORY);
        }
    }
    else {
        console.log('invalid command');
    }
}
