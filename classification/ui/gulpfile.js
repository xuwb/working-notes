// 依赖
const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify= require('gulp-uglify');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');

// 任务
gulp.task('default', ['zip', 'cssMin']);
gulp.task('server', ['brow', 'watch']);

// 静态服务
gulp.task('brow', () => {
    return browserSync({
        files: ['dist/**/*.js', 'exemple/**/*.html'],
        server: {
            baseDir: "./"
        }
    });
});

// babel编译
gulp.task('babel', () => {
	return gulp.src(['src/js/**/*.js'])
		.pipe(babel({presets: ['es2015', 'stage-0']}).on('error', (e) => {
            console.log(e.message);
        }))
		.pipe(gulp.dest('dist'));
});

// 压缩
gulp.task('zip', ['babel'], () => {
    return gulp.src(['dist/js/**/*.js', '!dist/**/*.min.js'])
        .pipe( uglify() )
        .pipe( rename({suffix: '.min'}) )
        .pipe(gulp.dest('dist'));
});

// sass预编译
const sass = require('gulp-ruby-sass');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', () => {
        return sass('./src/sass/**/*.scss', {
            sourcemap: true,
            // 嵌套输出方式 nested, 展开输出方式 expanded, 紧凑输出方式 compact, 压缩输出方式 compressed
            style: 'expanded'
        })
        .on('error', sass.logError)
        // 在css文件中写souremaps
        // .pipe(sourcemaps.write())

        // 在.map文件中写sourcemaps
        .pipe(sourcemaps.write('./', {     // map文件的路径, 相对于css文件
            includeContent: false,
            sourceRoot: '../sass'   // scss文件的路径, 相对于map文件
        }))
        .pipe(gulp.dest('./src/css'));
});

gulp.task('cssMin', () => {
    return sass('./src/sass/**/*.scss', {
            sourcemap: true,
            style: 'compressed'
        })
        .on('error', sass.logError)
        .pipe(gulp.dest('./dist/css'));
})

// 自动编译
gulp.task('watch', () => {
    const matchRex = /src((?:\/.*\/)?).*\..*/;
    gulp.watch(['src/js/**/*.js'])
        .on('change', (e) => {
            var match = e.path.replace(/\\/g, '/').match( matchRex ),
                file = match[0];
            // console.log('File ' + file + ' was ' + e.type);
            gulp.src( file )
                .pipe( babel( { presets: ['es2015', 'stage-0'] } ).on('error', (e) => {
                    console.error('error', e.message);
                }) )
                .pipe(gulp.dest('dist' + match[1]));
        });
    // sass
    gulp.watch('src/**/*.scss', ['sass']).on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...[sass]');
    });
});