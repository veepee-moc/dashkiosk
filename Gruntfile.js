'use strict';

var fs   = require('fs');

var PORTS = {
  express: 8080 || process.env.PORT,
  livereload: 31452
};

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({

    nodemon: {
      debug: {
        script: 'server.js',
        args: [ '--environment', 'development',
                '--port', PORTS.express ],
        options: {
          watch: [
            'server.js', 'lib/*', 'migration/*.js'
          ],
          nodeArgs: ['--inspect=1337'],
          env: {
            LIVERELOAD_PORT: PORTS.livereload
          },
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });
            nodemon.on('restart', function () {
              setTimeout(function() {
                fs.writeFileSync('.rebooted', 'rebooted');
              }, 1000);
            });
          }
        }
      }
    },

    // Watching changes
    watch: {
      server: {           // nodemon will write this file
        files: [ '.rebooted' ],
        tasks: [ 'newer:jshint:server' ],
        options: {
          livereload: true,
          spawn: false
        }
      },
      test: {
        files: [ 'test/**/*.js' ],
        tasks: [ 'test' ]
      }
    },

    exec: {
      react: {
        cwd: './front',
        cmd: 'yarn build'
      },
    },

    // Cleaning
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [ 'dist/*', '.tmp', '!dist/db/*.sqlite' ]
        }]
      },
      build: {
        files: [{
          dot: true,
          src: [ 'build/*' ]
        }]
      }
    },

    // lint
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        jshintrc: '.jshintrc'
      },
      server: {
        options: {
          jshintrc: 'lib/.jshintrc'
        },
        src: [ 'lib/**/*.js' ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: [ 'test/**/*.js' ]
      }
    },

    uglify: {
      my_target: {
        files: [{
          expand: true,
          cwd: 'dist/',
          src: [
            '*.js',
            'lib/*/*.js',
            'lib/*.js'
          ],
          dest: 'dist/'
        }]
      }
    },

    // Image minification
    imagemin: {
      options: {
        cache: false
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'dist/front/static/media/',
          src: '*.{png,jpg,gif}',
          dest: 'dist/front/static/media'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'dist/front/static/media/',
          src: '*.svg',
          dest: 'dist/front/static/media'
        }]
      }
    },

    concurrent: {
      server: {
        tasks: [
          'nodemon',
          'watch'
        ],
        options: {
          limit: 2,
          logConcurrentOutput: true
        }
      }
    },

    // Server side tests with mocha
    mochaTest: {
      server: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      },
      coverage: {
        options: {
          reporter: 'html-cov',
          quiet: true,
          captureFile: 'coverage.html'
        },
        src: ['test/**/*.js']
      }
    },

    // Copy files
    copy: {
      dist: {
        files: [{
          expand: true,
          dest: 'dist',
          src: [
            'package.json',
            'server.js', 'forever.js',
            'lib/**/*',
            'db/migrations/*.js'
          ]
        }, {
          expand: true,
          cwd: 'front/build',
          dest: 'dist/front',
          src: [
            '**'
          ]
        }]
      }
    }

  });

  grunt.registerTask('serve', [
    'build',
    'concurrent:server'
  ]);

  grunt.registerTask('build', function(target) {
    switch (target) {
    case 'react':
      grunt.task.run('exec:react');
    case 'scripts':
      grunt.task.run('jshint');
      break;
    case 'server':
      grunt.task.run('jshint:server');
      break;
    case undefined:
      grunt.task.run(
        'clean:build',
        'build:react',
        'build:server'
      );
      break;
    default:
      grunt.util.error('unknown target ' + target + ' for build');
    }
  });

  grunt.registerTask('dist', [
    'clean:dist',
    'build',
    'copy:dist',
    'imagemin',
    'svgmin',
    'uglify'
  ]);

  grunt.registerTask('test', [
    'jshint:test',
    'mochaTest:server'
  ]);

  grunt.registerTask('heroku', [
    'dist'
  ]);

  grunt.registerTask('default', [
    'dist'
  ]);
};
