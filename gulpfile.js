const browserSync = require('browser-sync').create();
const gulp = require('gulp');

const $ = require('gulp-load-plugins')();

const webpack = require('webpack');
const webpackConfig = require('./webpackConfig.js');


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
	'webpack', () => {
		browserSync.init({
			server:{
				baseDir:['demo'],
				index:'demo.html',
				directory:true
			}
		});
	}

));

