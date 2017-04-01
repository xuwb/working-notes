var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename');

// babel
// (src.*)Ϊ�ļ���֮ǰ������·��
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
    
    // # ES2015ת�����
    // $ npm install --save-dev babel-preset-es2015

    // # reactת�����
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
// sassԤ����
var sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function() {
        return sass('./src/sass/**/*.scss', {
            sourcemap: true,
            // Ƕ�������ʽ nested, չ�������ʽ expanded, ���������ʽ compact, ѹ�������ʽ compressed
            style: 'expanded'
        })
        .on('error', sass.logError)
        // ��css�ļ���дsouremaps
        // .pipe(sourcemaps.write())

        // ��.map�ļ���дsourcemaps
        .pipe(sourcemaps.write('./', {   // map�ļ���·��, �����css�ļ�
            includeContent: false,
            sourceRoot: '../sass'        // scss�ļ���·��, �����map�ļ�
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
// ���������
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