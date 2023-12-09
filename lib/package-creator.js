const fs = require('fs');
const chalk = require('chalk');

/**
 * Generates a package.json file with the provided details.
 * @param {Object} details - The details for the package.json file.
 */
function createPackageJson(details) {
  const {
    name,
    version,
    description,
    main,
    scripts,
    keywords,
    author,
    license,
    repository
  } = details;

  const packageJsonContent = {
    name,
    version,
    description,
    main: main || 'index.js',
    scripts: scripts || {},
    keywords: keywords || [],
    author,
    license,
    repository: repository || {},
    dependencies: {},
    devDependencies: {},
    files: [
      "bin",
      "lib",
      "README.md",
      "LICENSE"
    ],
    bin: {
      [name]: "./bin/index.js"
    }
  };

  // Add 'test' script by default if not provided
  if (!packageJsonContent.scripts.test) {
    packageJsonContent.scripts.test = 'echo "Error: no test specified" && exit 1';
  }

  // Convert the package.json content to a formatted string
  const packageJsonString = JSON.stringify(packageJsonContent, null, 2);

  // Write the package.json file to the file system
  fs.writeFile('package.json', packageJsonString, (err) => {
    if (err) {
      console.error(chalk.red('Error writing package.json file:'), err);
    } else {
      console.log(chalk.green('Successfully created package.json file.'));
    }
  });
}

module.exports = createPackageJson;
