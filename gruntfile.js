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

    sass: {
      options: {
        sourceMap: true,
        outputStyle: 'compressed'
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
          'client/js/script.min.js': ['./node_modules/fastclick/lib/fastclick.js', '_js/**/*.js']
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
          './node_modules/angular-bootstrap/ui-bootstrap-tpls.min.js'
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
            dest: 'D:/xampp/htdocs/7-Wonders'
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
        tasks: ['sass'],
        options: {
          spawn: false
        }
      },
      js: {
        files: ['_js/**/*.js'],
        tasks: ['uglify:dist'],
        options: {
          spawn: false
        }
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', [
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
