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

gulp.task('webpack',(done) => {//这个done是表示这个事做完了，可以开始下一个事，和express的next()作用一样。
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

gulp.task('serve',gulp.parallel(//要用parallel使得，否则webpack对js的watch会阻塞后面的函数执行。
	'html','webpack', () => {
		browserSync.init({
			server:{
				baseDir:['.tmp'],
				index:'demo.html'
				//directory:true 如果有这一项，则会列出目录，而不是直接显示index:'demo.html'
			}
		});
	}

));

