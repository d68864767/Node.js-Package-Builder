const createReadme = require('../lib/readme-creator');
const fs = require('fs');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);

// Mock the console.log and console.error functions
console.log = jest.fn();
console.error = jest.fn();

// Mock the fs.writeFile function
jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  writeFile: jest.fn((path, data, callback) => callback(null))
}));

describe('readme-creator', () => {
  afterEach(() => {
    // Clear all mocks after each test
    jest.clearAllMocks();
  });

  it('should create a README.md file with the correct content', async () => {
    const details = {
      name: 'test-package',
      version: '1.0.0',
      description: 'A test package for Node.js',
      main: 'index.js',
      scripts: {
        start: 'node index.js',
        test: 'jest'
      },
      keywords: ['test', 'package', 'node', 'npm'],
      author: 'Test Author',
      license: 'MIT',
      repository: {
        type: 'git',
        url: 'https://github.com/test/test-package.git'
      },
      bugs: {
        url: 'https://github.com/test/test-package/issues'
      }
    };

    createReadme(details);

    // Check if fs.writeFile was called
    expect(fs.writeFile).toHaveBeenCalled();

    // Check if the correct file path and content were passed to fs.writeFile
    const expectedContent = `# test-package

A test package for Node.js

## Version

1.0.0

## Main File

index.js

## Scripts

- \`start\`: node index.js
- \`test\`: jest

## Keywords

test, package, node, npm

## Author

Test Author

## License

This project is licensed under the MIT License.

## Repository

https://github.com/test/test-package.git

## Bugs

https://github.com/test/test-package/issues
`;

    expect(fs.writeFile).toHaveBeenCalledWith('README.md', expectedContent, expect.any(Function));
  });
});
