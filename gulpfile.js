const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const isThere = require('is-there');
const mkdirp = require('mkdirp');
const webpack = require('webpack');
const webpackConfig = require('./webpackConfig.js');

gulp.task('html',()=>{
	const SRC = './demo/demo.html';
	const DEST = '.tmp';
	if(!isThere(DEST)){
		mkdirp(DEST,(err) => {
			if(err){
				console.log(err);
			}
		});
	}
	return gulp.src(SRC)
		.pipe(gulp.dest(DEST));
});

gulp.task('webpack',(done) => {
	webpack(webpackConfig,function(err,stats){
		if(err){
			throw new $.util.PluginErr('webpack',err);
		}
		$.util.log('[webpack]',stats.toString({
			colors:$.util.colors.supportsColor,
			chunks:false,
			hash:false,
			version:false
		}));
		browserSync.reload({
			once:true
		});
		done();
	});
});

gulp.task('serve',gulp.parallel(
	'html','webpack', () => {
		browserSync.init({
			server:{
				baseDir:['.tmp'],
				index:'demo.html'
			}
		});
	}

));

