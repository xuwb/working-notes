var gulp = require('gulp');

// babel
// (src.*)为文件名之前的完整路径
var matchRex = /(src.*)\/.*\.(\w+)/;
var babel = require('gulp-babel');
var babelTask = (e) => {

    var match = e.path.replace(/\\/g, '/').match( matchRex ),
        file, filePath;

    // if(match.length == 0) {
    //     console.log('path error');
    //     return;
    // }
    if(match.length) {

        file = match[0];   // src/dataRow.jsx
        filePath = match[1];

        gulp.src( file )
        .pipe( babel( { 
            presets: ['es2015', 'react'], 
            plugins: ['transform-runtime']  // 'transform-es2015-modules-umd'
        } ).on('error', (e) => {
            console.error('error', e.message);
        }) )
        .pipe(gulp.dest( filePath ));
    }
};

// webpack
var del = require('del');
var webpack = require('webpack-stream');
// vinyl-named 可以在gulp中对生成文件命名，或者通过webpack.config中的output来命名
var named = require('vinyl-named');
// var path = require('path');
// var fs = require('vinyl-fs');
var vinylPaths = require('vinyl-paths');
var webpackReg = /src(.*)\/.*\.(\w+)/;;

gulp.task('webpack', (cb) => {
    // console.log(path.join(__dirname, 'src/testPath.js'));
    // webpack-stream 无法根据输入路径，返回dest路径，只会输出到dest
    del('dist/*', cb);

    // 根据输入路径，输出到不同目录
    // gulp.src(['src/js/**/*.js', 
    //           'src/js/**/*.es6', 
    //           'src/css/**/*.less', 
    //           'src/css/**/*.scss', 
    //           '!src/build/*.js'])
    //     .pipe(vinylPaths(function (paths) {
            
    //         var match = paths.replace(/\\/g, '/').match( webpackReg );
    //         // 文件是一个个传入，故common插件无法合并相同require代码
    //         if(match.length){
    //             gulp.src(match[0])
    //                 .pipe(named())
    //                 .pipe(webpack(require('./webpack.config.js')))
    //                 .pipe(gulp.dest('dist/'+match[1]));
    //         }
    //         return Promise.resolve();
    //     }))
    // common插件有效
    var path = require('path');
    var webpackReg = /src\/(.*)\.(\w+)/;;
    gulp.src(['src/js/**/*.js', 
              'src/js/**/*.es6', 
              'src/css/**/*.less', 
              'src/css/**/*.scss', 
              '!src/build/*.js'])
        .pipe(named(function(file){
            var match = file.path.replace(/\\/g, '/').match( webpackReg );
            var fileName = path.basename(file.path, path.extname(file.path));
            if(match.length){
                fileName = match[1] ;
            }
            return fileName;
        }))
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('dist/'));
});

// watch
gulp.task('watch', () => {
    gulp.watch(['src/**/*.jsx', 'src/**/*.es6'], ['webpack']);
})
// gulp.task('watch', function() {
//     // babel & jsx
//     gulp.watch(['src/**/*.jsx', 'src/**/*.es6']).on('change', (event) => {
//         // console.log('File ' + event.path + ' was ' + event.type + ', running tasks...[babel]');
//         // babelTask(event);
//         console.log('File ' + event.path + ' was ' + event.type + ', running tasks...[webpack]');
//         webPackTask(event);
//     });
// });

gulp.task('default', ['watch']);