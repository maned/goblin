/*global module:false*/

module.exports = function (grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		requirejs: {
			compile: {
				options: {
					baseUrl: "public/gb-admin/js",
					mainConfigFile: "public/gb-admin/js/config.js",
					name: 'config',
					out: "public/gb-admin/js/optimized/webclient.min.js",
					preserveLicenseComments: false
				}
			}
		},

		cssmin: {
			compress: {
				files: {
					'public/gb-admin/css/optimized/style.min.css': ['public/gb-admin/css/styles/style.css'],
					'public/gb-admin/css/optimized/main.min.css': ['public/gb-admin/css/styles/main.css']
				}
			}
		},

		jslint: {
			client: {
				src: [
					'*.js',
					'lib/*.js',
					'routes/*.js',
					'public/gb-admin/js/*.js',
					'public/gb-admin/js/collections/*.js',
					'public/gb-admin/js/config/*.js',
					'public/gb-admin/js/controllers/*.js',
					'public/gb-admin/js/layouts/*.js',
					'public/gb-admin/js/models/*.js',
					'public/gb-admin/js/routers/*.js',
					'public/gb-admin/js/views/*.js'
				],
				exclude: [
					'lib/auth.js'
				],
				directives: {
					browser: true,
					predef: [
						'require',
						'define'
					],
					white: true,
					sloppy: true,
					devel: true,
					vars: true,
					regexp: true,
					plusplus: true,
					forin: true,
					nomen: true,
					node: true,
					unparam: true
				}
			}
		},

		replace: {
			example: {
				src: ['lib/views/index.html'],
				dest: 'lib/views/index.html',
				replacements: [{
					from: 'js/config',
					to: 'js/optimized/webclient.min'
				}, {
					from: '/gb-admin/css/styles/main.css',
					to: '/gb-admin/css/optimized/main.min.css'
				}, {
					from: '/gb-admin/css/styles/style.css',
					to: '/gb-admin/css/optimized/style.min.css'
				}]
			}
		},

		watch: {
			files: [
				//'*.js',
				//'lib/*.js',
				//'routes/*.js',
				'public/gb-admin/js/*.js',
				'public/gb-admin/js/collections/*.js',
				'public/gb-admin/js/config/*.js',
				'public/gb-admin/js/controllers/*.js',
				'public/gb-admin/js/layouts/*.js',
				'public/gb-admin/js/models/*.js',
				'public/gb-admin/js/routers/*.js',
				'public/gb-admin/js/views/*.js'
			],
			tasks: ['test']
		}

	});

	// Load tasks
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-jslint');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s)
	grunt.registerTask('test', ['jslint']);
	grunt.registerTask('default', ['cssmin', 'requirejs', 'replace']);

};