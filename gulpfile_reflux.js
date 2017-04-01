var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename');

// babel
// (src.*)为文件名之前的完整路径
var matchRex = /(src.*)\/.*\.(\w+)/;
var babel = require('gulp-babel');
var babelTask = (e) => {
    // e.path
    var match = e.path.replace(/\\/g, '/').match( matchRex ),
        file, filePath, extendName;

    if(match.length == 0) {
        console.log('path error');
        return;
    }

    file = match[0];   // src/dataRow.jsx
    filePath = match[1];
    extendName = match[2];
    
    // # ES2015转码规则
    // $ npm install --save-dev babel-preset-es2015

    // # react转码规则
    // $ npm install --save-dev babel-preset-react
    if(extendName == 'jsx' || extendName == 'es6')
    {
        gulp.src( file )
        .pipe( babel( { presets: ['es2015', 'react', 'stage-0'] } ).on('error', (e) => {
            console.error('error', e.message);
        }) )
        .pipe(gulp.dest( filePath ));
    }

    // gulp.src('src/**/*.js')
    //     .pipe(rename(function(path) {
    //         path.extname = ".min.js";
    //     }))
    //     .pipe(uglify())
    //     .pipe(gulp.dest('dist'));

};
// sass预编译
var sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function() {
        return sass('./src/sass/**/*.scss', {
            sourcemap: true,
            // 嵌套输出方式 nested, 展开输出方式 expanded, 紧凑输出方式 compact, 压缩输出方式 compressed
            style: 'expanded'
        })
        .on('error', sass.logError)
        // 在css文件中写souremaps
        // .pipe(sourcemaps.write())

        // 在.map文件中写sourcemaps
        .pipe(sourcemaps.write('./', {   // map文件的路径, 相对于css文件
            includeContent: false,
            sourceRoot: '../sass'        // scss文件的路径, 相对于map文件
        }))
        .pipe(gulp.dest('./src/css'));
});
// watch
gulp.task('watch', function() {
    // babel & jsx
    gulp.watch(['src/**/*.js', 'src/**/*.jsx', 'src/**/*.es6']).on('change', (event) => {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...[babel]');
        babelTask(event);
    });
    gulp.watch('./src/sass/**/*.scss', ['sass']);
});
// 浏览器侦听
var browserSync = require('browser-sync').create();
gulp.task('browser-sync', function() {
	var file = ['./**/*.html', './**/*.css', './**/*.js'];
	browserSync.init({
		files: file,
		server: {
			baseDir: './'
		}
	});
});

gulp.task('default', ['browser-sync', 'watch']);