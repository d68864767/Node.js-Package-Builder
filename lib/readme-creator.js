const fs = require('fs');
const chalk = require('chalk');

/**
 * Generates a README.md file with the provided details.
 * @param {Object} details - The details for the README.md file.
 */
function createReadme(details) {
  const {
    name,
    version,
    description,
    main,
    scripts,
    keywords,
    author,
    license,
    repository,
    bugs
  } = details;

  const readmeContent = `# ${name}

${description}

## Version

${version}

## Main File

${main}

## Scripts

${Object.keys(scripts)
  .map((script) => `- \`${script}\`: ${scripts[script]}`)
  .join('\n')}

## Keywords

${keywords.join(', ')}

## Author

${author}

## License

This project is licensed under the ${license} License.

## Repository

${repository.url}

## Bugs

Please report any bugs or issues [here](${bugs.url}).

## Installation

\`\`\`sh
npm install ${name}
\`\`\`

## Usage

Refer to the "scripts" section for available commands.

\`\`\`sh
npm run <script-name>
\`\`\`

Thank you for using ${name}!
`;

  // Write the README.md file to the filesystem
  fs.writeFile('README.md', readmeContent, (err) => {
    if (err) {
      console.error(chalk.red('Error writing README.md file:'), err);
    } else {
      console.log(chalk.green('Successfully created README.md file.'));
    }
  });
}

module.exports = { createReadme };
