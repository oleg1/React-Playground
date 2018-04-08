var SOURCE 			= './source',
	BUILD 			= './build',
	gulp 			= require('gulp'),					// gulp itself
	run 			= require('run-sequence'),			// runs gulp tasks in  _synchronous_ sequence. One by one.
	del 			= require('del'),					// plugin to delete files/folders
	git 			= require('gulp-git'),
	fs 				= require('fs'),
	webpack			= require('webpack'),
	webpackStream	= require('webpack-stream');

gulp.task('buildVersionFile', function(done){
	git.revParse({args:'HEAD'}, function (err, hash) {
		if(err) {
			console.log('Error during getting revision from git: ' + err);
			done(null);
		} else {
			fs.writeFile('VERSION.txt', hash, 'utf8', function (err) {
				done(null);
			});
		}
	});
});

gulp.task('webpack', function() {
	return gulp.src([SOURCE + '/*.js', SOURCE + '/**/*.js'])
		.pipe(webpackStream( require('./webpack.config'), webpack))
		.pipe(gulp.dest('dist/'));
});

gulp.task('clean', function (callback) {
    del([BUILD]).then( () => callback());
});

gulp.task('cleanAmd', function (callback) {
	del(BUILD + '/js/module', callback);
});

gulp.task('deploy', function (callback) {
    run('clean', 'buildVersionFile', 'webpack', callback);
});