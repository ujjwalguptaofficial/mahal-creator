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
    console.log('Enter folder name to create project inside folder, leave blank for current folder');
    const questions = [{
        name: 'folder_name',
        message: "Folder name - ",
        type: 'input',
    }];
    const answers = await prompt(questions);
    return answers.folder_name;
}