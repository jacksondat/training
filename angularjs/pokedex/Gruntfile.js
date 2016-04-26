module.exports = function (grunt) {

  grunt.initConfig({
  	shell: {
  		options : {
  		  stdout: true
  		},
  		npm_install: {
        command: 'npm install'
      },
      bower_install: {
        command: 'bower install --save'
      }
  	},
    connect: {
      server: {
        options: {
          port: 9000,
          base: 'web/'
        }
      }
    },
    jscs: {
      src: ["web/**/*.js", "test/**/*.js"],
      options: {
          config: ".jscsrc",
          esnext: false,
          verbose: true,
          fix: false, // Autofix code style violations when possible. 
          preset: 'google',
          excludeFiles: [
            'web/js/lib/*.js',
            'test/coverage/**/*.js',
            'test/report/**/*.js'],
          //visit http://jscs.info/rules for more information about rules
          maximumLineLength: false
        }
    },
    karma: {
      unit: {
        configFile: './karma.conf.js',
        autoWatch: false,
        singleRun: true
      },
      unit_auto: {
        configFile: './karma.conf.js'
      }
    },
    watch: {
      project: {
        files: ['web/**/*.js', 'web/**/*.html', 'web/**/*.json', 'web/**/*.css', 
                'test/**/*.js', '!test/coverage/**/*.js', '!test/report/**/*.js'],
        tasks: ['jscs'],
        options: {
          livereload: true
        }
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.registerTask('default', ['connect', 'watch']);
  
  //installation-related
  grunt.registerTask('install', ['shell:npm_install','shell:bower_install']);
  
  grunt.registerTask('test', ['karma:unit']);

  grunt.registerTask('autotest', ['karma:unit_auto']);

};
