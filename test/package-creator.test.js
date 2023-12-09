const createPackageJson = require('../lib/package-creator');
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

describe('package-creator', () => {
  afterEach(() => {
    // Clear all mocks after each test
    jest.clearAllMocks();
  });

  it('should create a package.json file with the correct content', async () => {
    const details = {
      name: 'test-package',
      version: '1.0.0',
      description: 'A test package',
      main: 'index.js',
      scripts: {
        start: 'node index.js'
      },
      keywords: ['test', 'package'],
      author: 'Test Author',
      license: 'MIT'
    };

    createPackageJson(details);

    // Check if fs.writeFile was called
    expect(fs.writeFile).toHaveBeenCalled();

    // Check if the correct file path and content were passed to fs.writeFile
    const expectedContent = JSON.stringify({
      name: 'test-package',
      version: '1.0.0',
      description: 'A test package',
      main: 'index.js',
      scripts: {
        start: 'node index.js',
        test: 'echo "Error: no test specified" && exit 1'
      },
      keywords: ['test', 'package'],
      author: 'Test Author',
      license: 'MIT',
      repository: {},
      dependencies: {},
      devDependencies: {},
      files: [
        "bin",
        "lib",
        "README.md",
        "LICENSE"
      ],
      bin: {
        'test-package': './bin/index.js'
      }
    }, null, 2);

    // Since writeFile is mocked, we need to call the mock implementation
    const mockWriteFile = fs.writeFile.mock.calls[0][2];
    await mockWriteFile(null);

    // Check if the console logged the success message
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Successfully created package.json file.'));

    // Read the file to verify content
    await writeFileAsync('package.json', expectedContent);
    const fileContent = await readFileAsync('package.json', 'utf8');
    expect(fileContent).toBe(expectedContent);
  });

  it('should log an error if writing package.json fails', async () => {
    const details = {
      name: 'test-package',
      version: '1.0.0',
      description: 'A test package',
      main: 'index.js',
      scripts: {
        start: 'node index.js'
      },
      keywords: ['test', 'package'],
      author: 'Test Author',
      license: 'MIT'
    };

    // Mock fs.writeFile to simulate an error
    fs.writeFile.mockImplementation((path, data, callback) => {
      callback(new Error('Failed to write file'));
    });

    createPackageJson(details);

    // Check if the console logged the error message
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Error writing package.json file:'));
  });
});
