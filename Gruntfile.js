module.exports = function (grunt) {

    var rootConfig = {
        src: 'src',
        dist: 'dist',
        port: 1921,

        assets: 'src/assets',
        scripts: 'src/scripts'
    };

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({

        root: rootConfig,

        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 10']
            },
            main: {
                src: '<%= root.assets %>/css/app.css',
                dest: '<%= root.assets %>/css/app.css'
            }
        },

        clean: {
            dist: {
                src: [
                    '<%= root.dist %>'
                ]
            },
            src: {
                src: [
                    '<%= root.assets %>/css',
                    '<%= root.assets %>/js'
                ]
            }
        },

        compass: {
            src: {
                options: {
                    outputStyle: 'expanded',
                    sassDir: '<%= root.src %>/scss',
                    cssDir: '<%= root.assets %>/css'
                }
            }
        },

        concat: {
            src: {
                src: [
                    '<%= root.scripts %>/app.js',
                    '<%= root.scripts %>/app.route.js',
                    '<%= root.scripts %>/app.global.js',
                    '<%= root.scripts %>/app.controller.js',
                    '<%= root.scripts %>/utils/**/*.module.js',
                    '<%= root.scripts %>/utils/**/*!(.module).js',
                    '<%= root.scripts %>/pages/**/*.module.js',
                    '<%= root.scripts %>/pages/**/*!(.module).js',
                    '<%= root.scripts %>/components/**/*.module.js',
                    '<%= root.scripts %>/components/**/*!(.module).js'
                ],
                dest: '<%= root.assets %>/js/app.js'
            }
        },

        connect: {
            app: {
                options: {
                    host: '*',
                    port: '<%= root.port %>',
                    base: '<%= root.src %>',
                    hostname: '0.0.0.0'
                }
            }
        },

        copy: {
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= root.src %>',
                    src: [
                        'favicon*',
                        'assets/images/**/*',
                        'assets/js/**/*',
                        'templates/**/*',
                        'vendor/**/*',
                        '*.html'
                    ],
                    dest: '<%= root.dist %>'
                }]
            },
            templates: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= root.scripts %>/components',
                        src: [
                            '*.html',
                            '**/*.html'
                        ],
                        dest: '<%= root.src %>/templates'
                    },
                    {
                        expand: true,
                        cwd: '<%= root.scripts %>/pages',
                        src: [
                            '*.html',
                            '**/*.html'
                        ],
                        dest: '<%= root.src %>/templates'
                    }
                ]
            }
        },

        modernizr: {
            dist: {
                "parseFiles": true,
                "customTests": [],
                "dest": "<%= root.assets %>/vendor/modernizr.custom.js",
                "tests": [
                    "svg",
                    "touchevents",
                    "svgasimg",
                    "inlinesvg"
                ],
                "options": [
                    "setClasses"
                ],
                "uglify": true
            }
        },

        watch: {
            html: {
                files: [
                    '<%= root.src %>/*.html',
                    '<%= root.scripts %>/**/*.html'
                ],
                tasks: ['copy:templates'],
                options: {}
            },
            js: {
                files: [
                    '<%= root.scripts %>/*.js',
                    '<%= root.scripts %>/**/*.js'
                ],
                tasks: ['concat:src'],
                options: {}
            },
            scss: {
                files: [
                    '<%= root.src %>/scss/*.scss',
                    '<%= root.src %>/scss/**/*.scss'
                ],
                tasks: ['compass:src'],
                options: {}
            }
        }
    });

    grunt.registerTask('default', [
        'clean:src',
        'compass:src',
        'autoprefixer',
        'concat:src',
        'copy:templates',
        'connect:app',
        'watch'
    ]);

    grunt.registerTask('dist', [
        'clean:src',
        'clean:dist',
        'compass:src',
        'autoprefixer',
        'concat:src',
        'copy:build'
    ]);

};