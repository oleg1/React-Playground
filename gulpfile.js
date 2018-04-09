var SOURCE 			= './source',
	BUILD 			= './build',
	gulp 			= require('gulp'),					// gulp itself
	run 			= require('run-sequence'),			// runs gulp tasks in  _synchronous_ sequence. One by one.
	del 			= require('del'),					// plugin to delete files/folders
	git 			= require('gulp-git'),
    svgstore 		= require('gulp-svgstore'),
    svgmin 			= require('gulp-svgmin'),
    cheerio 		= require('gulp-cheerio'),
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

// SVG Symbols generation
gulp.task('svgSymbols', function () {
    return gulp.src('./images/icons/*.svg')
        .pipe(svgmin())
        .pipe(cheerio({
            run: function ($, file) {
                //get file name without extension, example: tennis, cricket, rounders, etc
                var filePath = file.history[0].lastIndexOf('\\'),
                    fileNameSvg;
                if (filePath === -1) {
                    fileNameSvg = file.history[0].substring(file.history[0].lastIndexOf('/')+1, (file.history[0].length-4)).replace(" ", "_");
                } else {
                    fileNameSvg = file.history[0].substring(file.history[0].lastIndexOf('\\')+1, (file.history[0].length-4)).replace(" ", "_");
                }
                // add filename in all svg tags, which contain attr "class" .st0, .st1, .st2
                $('.st0, .st1, st2').each(function(){
                    var classSvg = $(this);

                    classSvg.attr('class', classSvg.attr('class') + '-' + fileNameSvg);
                });
                // add filename in all svg tags <style>, which contain class .st0, .st1, .st2
                $('style').each(function(){
                    var style 		= $(this),
                        styleText 	= style.text()
                            .replace(".st0", ".st0-" + fileNameSvg)
                            .replace(".st1", ".st1-" + fileNameSvg)
                            .replace(".st2", ".st2-" + fileNameSvg);

                    style.text(styleText);
                });
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(svgstore({ fileName: 'icons.svg', prefix: 'icon_' }))
        .pipe(gulp.dest(BUILD + '/images'))
});

gulp.task('clean', function (callback) {
    del([BUILD]).then( () => callback());
});

gulp.task('cleanAmd', function (callback) {
	del(BUILD + '/js/module', callback);
});

gulp.task('deploy', function (callback) {
    run('clean', 'svgSymbols', 'buildVersionFile', 'webpack', callback);
});