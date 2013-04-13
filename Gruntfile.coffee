
module.exports = (grunt) ->

  grunt.initConfig

    jshint:
      src:
        src: ['div.js', 'transition.js']
        options:
          jshintrc: '.jshintrc'

    coffee:
      compile:
        files:
          'test/div_spec.js': 'test/div_spec.coffee'

    jasmine:
      divjs:
        src: ['./transition.js', './div.js']
        options:
          specs: ['./test/div_spec.js']

  [
    'grunt-contrib-jshint'
    'grunt-contrib-connect'
    'grunt-contrib-jasmine'
    'grunt-contrib-coffee'
  ]
  .forEach grunt.loadNpmTasks

  grunt.registerTask 'default', [
    'jshint'
    'coffee'
    'jasmine'
  ]
