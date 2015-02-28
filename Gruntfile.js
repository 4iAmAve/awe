module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            src: {
                files: [
                    '<%= pkg.project.directories.src %>/**/*'
                ],
                tasks: ['dev'],
                options: {
                    spawn: false,
                    interrupt: true,
                    livereload: true
                }
            }
        },

        clean: {
            css: 'css/',
            report: 'report/',
            bin: 'bin/'
        },

        less: {
            src: {
                files: {
                    '<%= pkg.project.directories.css %>/index.css': '<%= pkg.project.directories.src %>/index.less'
                }
            }
        },

        jade: {
            src: {
                options: {
                    pretty: true,
                    data: {
                        debug: false
                    }
                },
                files: {
                    '<%= pkg.project.directories.bin %>index.html': '<%= pkg.project.directories.src %>/index.jade'
                }
            }
        },

        copy: {
            js: {
                expand: true,
                cwd: '<%= pkg.project.directories.js %>',
                src: ['**'],
                dest: '<%= pkg.project.directories.bin %>/js/',
            },
            images: {
                expand: true,
                cwd: '<%= pkg.project.directories.img %>',
                src: ['**'],
                dest: '<%= pkg.project.directories.bin %>/img/',
            },
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src : 'assets/css/*.css'
                },
                options: {
                    watchTask: true // < VERY important
                }
            }
        },

        todo: {
            options: {
                marks: [
                    {
                        name: "FIX",
                        pattern: /FIXME/,
                        color: "red"
                    },
                    {
                        name: "TODO",
                        pattern: /TODO/,
                        color: "yellow"
                    },
                    {
                        name: "NOTE",
                        pattern: /NOTE/,
                        color: "blue"
                    },
                    {
                        name: "AVE",
                        pattern: /AVE/,
                        color: "cyan"
                    },
                    {
                        name: "DEV",
                        pattern: /DEV/,
                        color: "green"
                    }
                ],
                file: "report/report.md",
                    githubBoxes: true,
                    colophon: true,
                    usePackage: true
                },
                src: [
                    '<%= pkg.project.directories.src %>/**/*'
                ]
            },
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-todo');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerTask('dev', '', [
      'clean:css',
      'clean:report',
      'clean:bin',
      'less:src',
      'jade:src',
      'copy:js',
      'copy:images',
      'todo'
    ]);

  grunt.registerTask('default', ['dev', 'browserSync', 'watch:src']);

};