// 依赖
const gulp = require('gulp');
const del = require('del');
const babel = require('gulp-babel');
const uglify= require('gulp-uglify');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');

// 任务
gulp.task('server', ['brow', 'watch']);
gulp.task('default', ['clean'], () => {
    gulp.start('produce', 'cssMin');
});

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
var matchRex = /(src.*)\/.*\.(\w+)/;
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
    
    if(extendName == 'jsx' || extendName == 'es6')
    {
        gulp.src( file )
        .pipe( babel( { presets: ['es2015', 'stage-0', 'react'] } ).on('error', (e) => {
            console.error('error', e.message);
        }) )
        .pipe(gulp.dest( filePath ));
    }
};

gulp.task('babel', () => {
	return gulp.src(['src/**/*.js', 'src/**/*.jsx'], {base: 'src'})
		.pipe(babel({presets: ['es2015', 'react', 'stage-0']}).on('error', (e) => {
            console.log(e.message);
        }))
		.pipe(gulp.dest('dist'));
});

// 压缩
gulp.task('zip', ['babel'], () => {
    return gulp.src(['dist/**/*.js'])   //, '!dist/**/*.min.js'
        .pipe( uglify({
            mangle: {except: ['require' ,'exports' ,'module' ,'$']}//排除混淆关键字
        }) )
        .pipe( rename({suffix: '.min'}) )  // .pipe(rename(function(path) {path.extname = ".min.js";}))
        .pipe(gulp.dest('dist'));
});

gulp.task('produce', ['zip'], () => {
    return del.sync(['dist/**/*.js', '!dist/**/*.min.js']);
})

// 清空目录
gulp.task('clean', function(){
    console.log('清除dist目录');
    return del.sync(['dist']);
});

// sass预编译
const sass = require('gulp-ruby-sass');
const sourcemaps = require('gulp-sourcemaps');

var sassTask = (style, dest, saveSource) => {
    var sassPipe = sass('./src/**/*.scss', {
        sourcemap: true,
        // 嵌套输出方式 nested, 展开输出方式 expanded, 紧凑输出方式 compact, 压缩输出方式 compressed
        style: style
    })
    .on('error', sass.logError);

    // 在css文件中写souremaps
    // .pipe(sourcemaps.write())

    // 在.map文件中写sourcemaps
    if(saveSource) {
        sassPipe.pipe(sourcemaps.write('./', {     // map文件的路径, 相对于css文件
            includeContent: false,
            sourceRoot: './'   // scss文件的路径, 相对于map文件../sass
        }))
    }

    sassPipe.pipe(gulp.dest(dest));
    return sassPipe;
}
gulp.task('sass', () => {
    var match = e.path.replace(/\\/g, '/').match( matchRex ),
        file, filePath, extendName;

    return sassTask('expanded', './src', true)
});

gulp.task('cssMin', () => {
    return sassTask('compressed', './dist', false)
})

// 自动编译
gulp.task('watch', () => {
    const matchRex = /src((?:\/.*\/)?).*\..*/;
    gulp.watch(['src/**/*.js', 'src/**/*.jsx'])
        .on('change', (e) => {
            var match = e.path.replace(/\\/g, '/').match( matchRex ),
                file = match[0];
            // console.log('File ' + file + ' was ' + e.type);
            gulp.src( file )
                .pipe( babel( { presets: ['es2015', 'stage-0', 'react'] } ).on('error', (e) => {
                    console.error('error', e.message);
                }) )
                .pipe( uglify({
                    mangle: {except: ['require' ,'exports' ,'module' ,'$']}//排除混淆关键字
                }) )
                .pipe( rename({suffix: '.min'}) )
                .pipe(gulp.dest('dist' + match[1]));
        });
    // sass
    gulp.watch('src/**/*.scss', ['sass']).on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...[sass]');
    });
});