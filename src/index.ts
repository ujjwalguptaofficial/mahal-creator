import { Command } from 'commander';
const program = new Command();
import { askForFolderName, askForProjectLanguage, createProject, getPackageVersion, isMahalProject, processCommand } from "@/helpers";
import { handleDeploy, handleDevStart } from '@/handlers';

program.version(getPackageVersion(), '-v, --version');

// option('-d, --debug', 'output extra debugging');
// option('add', 'add the component');

program.command('dev').description('start development server').action(() => {
    if (isMahalProject()) {
        handleDevStart();
    }
});

program.command('deploy').description('create build for deployment').action(() => {
    if (isMahalProject()) {
        handleDeploy('');
    }
});

program.command('init').description('Initiate new project').action(async () => {
    const language = await askForProjectLanguage();
    // console.log("language", language);
    const folderName = await askForFolderName();
    // console.log("folderName", folderName);

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
