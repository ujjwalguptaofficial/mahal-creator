import { runCommand } from "../helpers";

export const handleDeploy = async function (deployFolderName: string) {
    const code = await runCommand(`npm run deploy`);
    if (code == 0) {
        console.log("Build created for deploy")
    } else {
        console.log(`Unable to create build for deploy, process exited with code ${code.toString()}`);
    }
}