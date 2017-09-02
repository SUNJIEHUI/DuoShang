var gulp = require('gulp');
var sass= require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


gulp.task('xxx',function(){
	return gulp.src('./src/sass/*.scss')
		.pipe(sass({outputStyle:'compact'})).on('error',sass.logError)
		.pipe(gulp.dest('./src/css'))
})


gulp.task('watch',function(){
	gulp.watch('./src/**/*.scss',['xxx']);
})


gulp.task('yasuo',function(){
	return gulp.src('./src/js/*.js')

		// 合并成all.js
		.pipe(concat('all.js'))

		// 输出到dist目录
		.pipe(gulp.dest('./dist/js'))

		// 压缩
		//.pipe(uglify({mangle:false,compress:false}))
		.pipe(uglify())

		// 重命名
		.pipe(rename({suffix:'.min'}))

		// 输出到dist目录
		.pipe(gulp.dest('./dist/js'))
});


// 自动刷新
var browserSync = require('browser-sync');
gulp.task('server',function(){
	browserSync({
		// 静态服务器
		// server:'./src/',

		// 代理服务器
		proxy:'http://localhost:44',

		// 端口
		port:2008,

		// 监听文件修改，自动刷新浏览器
		files:['./src/**.html','./src/css/*.css','./src/api/*.php']
	});



	// 开启服务器的同时，监听sass的修改*/
	gulp.watch('./src/**/*.scss',['xxx']);
})