import { prompt } from "inquirer";
export const askForProjectLanguage = async function () {
    const questions = [{
        name: 'project_language',
        message: "choose project language",
        type: 'list',
        choices: ["typescript", "javascript"]
    }];
    const answers = await prompt(questions);
    return answers.project_language;
}
export const askForFolderName = async function () {
    const questions = [{
        name: 'folder_name',
        message: "Enter folder name to create project inside folder, leave blank for current folder",
        type: 'input',
    }];
    const answers = await prompt(questions);
    return answers.folder_name;
}