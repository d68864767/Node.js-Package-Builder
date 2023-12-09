const { createIndex } = require('../lib/index-creator');
const fs = require('fs');
const path = require('path');
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

describe('index-creator', () => {
  const mainFile = 'index.js';
  const mainFilePath = path.join(process.cwd(), mainFile);

  afterEach(() => {
    // Clear all mocks after each test
    jest.clearAllMocks();
  });

  it('should create an index.js file with the correct content', async () => {
    // Call the createIndex function with the mainFile name
    createIndex(mainFile);

    // Check if fs.writeFile has been called
    expect(fs.writeFile).toHaveBeenCalledWith(
      mainFilePath,
      expect.any(String),
      'utf8',
      expect.any(Function)
    );

    // Check if console.log has been called with the success message
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining(`${mainFile} was created successfully.`));
  });

  it('should handle errors when creating the index.js file', async () => {
    // Mock fs.writeFile to simulate an error
    fs.writeFile.mockImplementation((path, data, callback) => {
      callback(new Error('Failed to create file'));
    });

    // Call the createIndex function with the mainFile name
    expect(() => createIndex(mainFile)).toThrow();

    // Check if console.error has been called with the error message
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining(`Error creating ${mainFile}`));
  });

  it('should create an index.js file with the expected basic structure', async () => {
    const expectedContent = `'use strict';

// Entry point of the package
function main() {
  console.log('Package initialized successfully.');
}

module.exports = { main };
`;

    // Call the createIndex function with the mainFile name
    createIndex(mainFile);

    // Check if fs.writeFile has been called with the expected content
    expect(fs.writeFile).toHaveBeenCalledWith(
      mainFilePath,
      expectedContent,
      'utf8',
      expect.any(Function)
    );
  });
});
