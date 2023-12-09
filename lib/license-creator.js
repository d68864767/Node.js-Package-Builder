const fs = require('fs');
const chalk = require('chalk');

/**
 * Generates a LICENSE file with the provided license type.
 * @param {string} licenseType - The type of license to create.
 * @param {string} author - The author's name to include in the license.
 */
function createLicense(licenseType, author) {
  const year = new Date().getFullYear();
  let licenseContent = '';

  switch (licenseType.toUpperCase()) {
    case 'MIT':
      licenseContent = `MIT License

Copyright (c) ${year} ${author}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;
      break;
    // Add other license types here as needed
    default:
      console.error(chalk.red(`Unsupported license type: ${licenseType}`));
      return;
  }

  fs.writeFile('LICENSE', licenseContent, (err) => {
    if (err) {
      console.error(chalk.red('Error writing LICENSE file:'), err);
    } else {
      console.log(chalk.green('LICENSE file created successfully.'));
    }
  });
}

module.exports = { createLicense };
