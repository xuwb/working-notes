var gulp = require('gulp');

// babel
// (src.*)为文件名之前的完整路径
var matchRex = /src\/(.*)\/.*\.(\w+)/;
var babel = require('gulp-babel');
var babelTask = (e) => {
    // e.path
    var match = e.path.replace(/\\/g, '/').match( matchRex ),
        file, filePath, extendName;

    if(match.length) {

        file = match[0];   // src/dataRow.jsx
        filePath = match[1];

        gulp.src( file )
        .pipe( babel( { 
            presets: ['es2015', 'react', 'stage-0']
        } ).on('error', (e) => {
            console.error('error', e.message);
        }) )
        .pipe(gulp.dest( 'dist/' + filePath ));
    }

};
// watch
gulp.task('watch', function() {
    // babel & jsx
    gulp.watch(['src/**/*.jsx', 'src/**/*.js', '!src/build/*.js']).on('change', (event) => {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...[babel]');
        babelTask(event);
    });
});
// 浏览器侦听
var browserSync = require('browser-sync').create();
gulp.task('browser-sync', function() {
	var file = ['./page/**/*.html', './**/*.css', './src/**/*.js'];
	browserSync.init({
		files: file,
		server: {
			baseDir: './'
		}
	});
});

gulp.task('default', ['browser-sync', 'watch']);