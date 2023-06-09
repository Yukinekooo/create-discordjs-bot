import chalk from 'chalk';
import path from 'path';
import { ExpectedAnswers } from '../types.js';
import { copy } from './copy.js';
import { install, PM } from './package-manager.js';
import { templates } from './templates.js';

export async function handle(answers: ExpectedAnswers) {
    const projectName = answers.name;
    const projectPath = path.resolve(projectName);

    // TODO add mutpile templates to choose from
    const template =
        'template' in answers && typeof answers.template == 'string'
            ? answers.template
            : templates[0];

    const pm = answers.manager;

    await copy(template, projectPath, pm);

    if (pm !== PM.none) await install(pm, projectPath);

    console.log(
        chalk.greenBright('√'),
        chalk.bold('Created discord.js project'),
        chalk.gray('»'),
        chalk.greenBright(projectName),
    );

    console.log(chalk.blueBright('?'), chalk.bold('Next Steps!'));
    console.log(`\t> cd ${path.relative(process.cwd(), projectPath)}`);
    console.log(`\t> // Configure your bot in .env and config.json`);

    if (pm !== PM.none) console.log(`\t> ${PM[pm]} run dev`);
    else {
        console.log('\t> npm install');
        console.log('\t> npm run dev');
    }
}
