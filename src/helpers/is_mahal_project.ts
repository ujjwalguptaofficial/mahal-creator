import { ERROR_MSG_FOR_INVALID_PROJECT_DIRECTORY } from "@/constants";
import { pathExistsSync, readFileSync } from "fs-extra";

export const isMahalProject = () => {
    var content;
    try {
        const pathOfPackage = "./package.json";
        if (!pathExistsSync(pathOfPackage)) {
            console.error(ERROR_MSG_FOR_INVALID_PROJECT_DIRECTORY);
            return false;
        }
        content = readFileSync(pathOfPackage, {
            encoding: "utf8"
        });
    } catch (ex) {
        console.error(ERROR_MSG_FOR_INVALID_PROJECT_DIRECTORY);
        return false;
    }
    const packageInfo = JSON.parse(content);
    return packageInfo && packageInfo.project && packageInfo.project.framework === "mahal";

}