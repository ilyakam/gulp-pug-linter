const configFile = require('pug-lint/lib/config-file');
const PugLint = require('pug-lint');
const Vinyl = require('vinyl');

jest.mock('pug-lint/lib/config-file');
jest.mock('pug-lint');

const mockFile = new Vinyl({
  base: 'base',
  contents: Buffer.from(''),
  cwd: __dirname,
  path: 'path.pug',
});

describe('gulp-pug-linter', () => {
  describe('configuration', () => {
    beforeEach(() => {
      const gulpPugLinter = require('./index');

      gulpPugLinter();
    });

    test('should load the configuration file', () => {
      expect(configFile.load)
        .toHaveBeenCalled();
    });

    test('should initialize the linter', () => {
      expect(PugLint)
        .toHaveBeenCalled();
    });
  });

  describe('file stream', () => {
    let stream;

    beforeEach(() => {
      const gulpPugLinter = require('./index');

      stream = gulpPugLinter();
    });

    afterEach(() => {
      stream.end();
    });

    describe('when file is null', () => {
      test('should pass it through to the callback', () => {
        const file = { isNull: () => true };

        stream.on('data', (data) => {
          expect(data)
            .toBe(file);
        });

        stream.write(file);
      });

      describe('when file is a stream', () => {
        test('should throw an error', () => {
          const file = {
            isNull: () => false,
            isStream: () => true,
          };

          stream.on('error', (error) => {
            expect(error.message)
              .toEqual('Streaming is not supported');
          });

          stream.write(file);
        });
      });
    });
  });

  describe('reporters', () => {
    let stream;

    const mockFancyLog = jest.fn();

    mockFancyLog.warn = jest.fn();

    beforeEach(() => {
      jest.resetModules();

      jest.mock('fancy-log', () => mockFancyLog);
    });

    describe('when there are no errors', () => {
      beforeEach(() => {
        jest.mock('pug-lint', () => jest.fn().mockImplementation(() => ({
          checkFile: () => [],
          configure: () => {},
        })));
      });

      afterEach(() => {
        stream.write(mockFile);

        stream.end();
      });

      test('should not find any errors in the file', () => {
        const gulpPugLinter = require('./index');

        stream = gulpPugLinter();

        stream.on('data', (file) => {
          expect(file.pugLinter.errors)
            .toHaveLength(0);
        });
      });

      test('should not throw errors on failAfterError', () => {
        const shouldNotThrowError = () => {
          const gulpPugLinter = require('./index');

          stream = gulpPugLinter({ failAfterError: true });
        };

        expect(shouldNotThrowError)
          .not.toThrow();
      });

      test('should not show errors with the default reporter', () => {
        const gulpPugLinter = require('./index');

        stream = gulpPugLinter({ reporter: undefined });

        stream.on('data', () => {
          expect(mockFancyLog)
            .not.toHaveBeenCalled();
        });
      });
    });

    describe('when there are some errors', () => {
      beforeEach(() => {
        jest.mock('pug-lint', () => jest.fn().mockImplementation(() => ({
          checkFile: () => [{ message: 'some error' }],
          configure: () => {},
        })));
      });

      test('should stream the errors with the file', (done) => {
        const gulpPugLinter = require('./index');

        stream = gulpPugLinter();

        stream.on('data', (file) => {
          expect(file.pugLinter.errors)
            .toHaveLength(1);
        });

        stream.on('finish', done);

        stream.write(mockFile);

        stream.end();
      });

      test('should throw an error on failAfterError', () => {
        const shouldThrowError = () => {
          const gulpPugLinter = require('./index');

          stream = gulpPugLinter({ failAfterError: true });

          stream.write(mockFile);

          stream.end();
        };

        expect(shouldThrowError)
          .toThrow('Lint failed');
      });

      test('should pass errors to a default reporter when specified', (done) => {
        const gulpPugLinter = require('./index');

        stream = gulpPugLinter({ reporter: 'default' });

        stream.on('data', () => {
          expect(mockFancyLog)
            .toHaveBeenCalledWith(expect.stringContaining('some error'));
        });

        stream.on('finish', done);

        stream.write(mockFile);

        stream.end();
      });

      test('should pass errors to a custom reporter function', (done) => {
        const gulpPugLinter = require('./index');
        const mockReporter = jest.fn();

        stream = gulpPugLinter({ reporter: mockReporter });

        stream.on('data', () => {
          expect(mockReporter)
            .toHaveBeenCalledWith([{ message: 'some error' }]);
        });

        stream.on('finish', done);

        stream.write(mockFile);

        stream.end();
      });

      test('should pass errors to a custom reporter module string', (done) => {
        const gulpPugLinter = require('./index');
        const mockReporter = require('custom-reporter');

        jest.mock('custom-reporter', () => jest.fn(), { virtual: true });

        stream = gulpPugLinter({ reporter: 'custom-reporter' });

        stream.on('data', () => {
          expect(mockReporter)
            .toHaveBeenCalledWith([{ message: 'some error' }]);
        });

        stream.on('finish', done);

        stream.write(mockFile);

        stream.end();
      });

      describe('when no reporters are specified', () => {
        test('should warn about fallback to the default reporter', (done) => {
          const gulpPugLinter = require('./index');

          stream = gulpPugLinter({ reporter: 'missing reporter' });

          stream.on('finish', done);

          stream.write(mockFile);

          stream.on('data', () => {
            expect(mockFancyLog.warn)
              .toHaveBeenCalledWith(expect.stringContaining('warning'));
          });

          stream.end();
        });

        test('should fall back to the default reporter', (done) => {
          const gulpPugLinter = require('./index');

          stream = gulpPugLinter({ reporter: 'missing reporter' });

          stream.on('finish', done);

          stream.write(mockFile);

          stream.on('data', () => {
            expect(mockFancyLog)
              .toHaveBeenCalledWith(expect.stringContaining('some error'));
          });

          stream.end();
        });
      });
    });
  });
});
