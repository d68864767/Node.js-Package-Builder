const fs = require('fs');
const { createLicense } = require('../lib/license-creator');

jest.mock('fs');

describe('License Creator', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jest.clearAllMocks();
  });

  it('should create a MIT license file with the correct content', () => {
    const mockWriteFile = jest.spyOn(fs, 'writeFile').mockImplementation((path, data, callback) => {
      callback(null);
    });

    const licenseType = 'MIT';
    const author = 'John Doe';
    const year = new Date().getFullYear();
    const expectedContent = `MIT License

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

    createLicense(licenseType, author);

    expect(mockWriteFile).toHaveBeenCalledWith('LICENSE', expectedContent, expect.any(Function));
  });

  it('should handle unsupported license types', () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
    const licenseType = 'UNSUPPORTED_LICENSE';
    const author = 'John Doe';

    createLicense(licenseType, author);

    expect(consoleErrorMock).toHaveBeenCalledWith(expect.stringContaining('Unsupported license type'));
  });

  it('should handle file writing errors', () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
    const mockWriteFile = jest.spyOn(fs, 'writeFile').mockImplementation((path, data, callback) => {
      callback(new Error('File system error'));
    });

    const licenseType = 'MIT';
    const author = 'John Doe';

    createLicense(licenseType, author);

    expect(mockWriteFile).toHaveBeenCalled();
    expect(consoleErrorMock).toHaveBeenCalledWith(expect.stringContaining('Error writing LICENSE file'));
  });
});
