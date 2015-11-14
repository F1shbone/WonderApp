/*jshint camelcase: true, eqeqeq: true, globalstrict: true, laxbreak: true, laxcomma: true, browser: true, jquery: true, indent: 2, sub: true*/
/*global module, console */

module.exports = function (grunt) {
  'use strict';

  // Global Config
  var pkg = grunt.file.readJSON('package.json');

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  //    grunt.loadNpmTasks('grunt-mocha-test');
  //    grunt.loadNpmTasks('grunt-karma');

  // Banner
  console.log('/*\n' +
    ' * 7 Wonders Statistik Tool\n' +
    ' * Build: \x1b[32m' + pkg.version + '\x1b[0m\n' +
    ' */\n');

  // Project configuration.
  grunt.initConfig({
    pkg: pkg,
    copyTarget: process.platform === 'win32' ? 'D:/xampp/htdocs/wonderApp/' : '/Applications/XAMPP/htdocs/wonderApp/',

    sass: {
      options: {
        sourceMap: true,
        outputStyle: 'compressed' //nested compressed
      },
      dist: {
        files: {
          'client/css/layout.min.css': '_scss/layout.scss'
        }
      }
    },

    uglify: {
      options: {
        mangle: false
      },
      dist: {
        files: {
          'client/js/script.min.js': ['_js/**/*.js']
        }
      }
    },

    concat: {
      options: {
        separator: ' '
      },
      angular: {
        src: [
          './node_modules/angular/angular.min.js',
          './node_modules/angular-sanitize/angular-sanitize.min.js',
          './node_modules/angular-route/angular-route.min.js',
          './node_modules/angular-touch/angular-touch.min.js'
        ],
        dest: 'client/js/angular.min.js'
      }
    },

    copy: {
      npm: {
        files: [
          //jQuery
          {
            expand: true,
            cwd: './node_modules/jquery/dist',
            src: ['jquery.min.js'],
            dest: 'client/js/'
          },
          //Ionicon
          {
            expand: true,
            cwd: './node_modules/ionicons/fonts',
            src: ['*'],
            dest: 'client/fonts'
          }
        ]
      },
      xampp: {
        files: [
          {
            expand: true,
            cwd: './client',
            src: ['**/*'],
            dest: '<%= copyTarget %>'
          }
        ]
      }
    },

    clean: {
      build: ['client/css', 'client/js/script.min.js']
    },

    watch: {
      scss: {
        files: ['_scss/**/*.scss'],
        tasks: ['sass', 'copy:xampp'],
        options: {
          spawn: false
        }
      },
      js: {
        files: ['_js/**/*.js'],
        tasks: ['uglify:dist', 'copy:xampp'],
        options: {
          spawn: false
        }
      },
      html: {
        files: ['client/**/*.html'],
        task: ['copy:xampp'],
        options: {
          spawn: true
        }
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', [
    'sass',
    'uglify',
    'copy:xampp'
  ]);
  grunt.registerTask('full', [
    'clean',
    'sass',
    'uglify',
    'concat',
    'copy:npm',
    'copy:xampp'
  ]);
  grunt.registerTask('dev', [
    'default',
    'watch'
  ]);
};
