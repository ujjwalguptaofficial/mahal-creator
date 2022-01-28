import { Command } from 'commander';
const program = new Command();
import { askForFolderName, askForProjectLanguage, createProject, getPackageVersion, processCommand } from "@/helpers";
import * as path from 'path';

program.version(getPackageVersion(), '-v, --version').
    option('-d, --debug', 'output extra debugging').
    option('dev', 'start development server').
    option('deploy [deploymentFolderName]', 'create build for deployment').
    option('add', 'add the component');

program.command('init').description('Initiate new project').action(async () => {
    const language = await askForProjectLanguage();
    console.log("language", language);
    const folderName = await askForFolderName();
    console.log("folderName", folderName);

    // if (language === 'typescript') {
    //     const language = await askFor();
    // }
    // else {

    // }


    createProject(language, folderName);
})

const parsed = program.parse(process.argv);

// console.log('parsed', parsed);

// processCommand(program.opts());
