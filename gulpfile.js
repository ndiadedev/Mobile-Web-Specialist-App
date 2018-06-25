const gulp = require('gulp'),
    runSequence = require('run-sequence'),
    del = require('del'),
    mergeStream = require('merge-stream'),
    nodemon = require('gulp-nodemon'),
    sass = require('gulp-sass');

//I make it Optional/ it does delete the build/ scope
gulp.task('clean', (done)=> {
  del(['build'], done);
});
//Copy all needed files 
gulp.task('copy', ()=> {
  return mergeStream(
     gulp.src('src/images/**/*').pipe(gulp.dest('build/images/')),
     gulp.src('src/style/*').pipe(sass()).pipe(gulp.dest('build/style/')),
     gulp.src('src/js/*').pipe(gulp.dest('build/js/')),
     gulp.src('src/sw.js').pipe(gulp.dest('build/')),   
     gulp.src('src/lib/**/*').pipe(gulp.dest('build/lib/')),
     gulp.src('src/pages/*').pipe(gulp.dest('build/pages/')),
     gulp.src('./src/*.html').pipe(gulp.dest('build/')),
  );
});

//This to run the server to the specified port in server.js file
gulp.task('server', ()=> {
  nodemon({
    script: 'server.js',
    ext: 'js',
    ignore: ['build/']
  })
  .on('restart',()=> {
    console.log('>> node restart');
  })
});
//All done/ we only run one command
gulp.task('start', (callback)=> {
  runSequence(['copy'], ['server'], callback);
});
