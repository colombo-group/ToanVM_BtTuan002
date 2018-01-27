//require browser sync.
var Sync = require('browser-sync').create();

// include gulp library
var gulp = require('gulp');

// include gulp-sass, convert sass file to css file.
var sass = require('gulp-sass');

// include gulp-useref for minify JS
var useref = require('gulp-useref');

// include gulp-uglify for minify js file
var uglify = require('gulp-uglify');
var uglyIf = require('gulp-if');

//include gulp-cssnano
var cssnano = require('gulp-cssnano');

//include gulp-images
var imagemin = require('gulp-imagemin');

//include cache package
var cache = require('gulp-cache');

// include del
var del = require('del');


//sync
gulp.task('Sync',function () {
    Sync.init({
        server: {
            baseDir: "dist",
        },
    })
});

// task build css
gulp.task('build-scss',function () {
    return gulp.src('app/scss/**/*.+(scss|sass)')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(Sync.reload({
            stream: true,
        }));
});

gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/public/fonts'))
})

//task useref
gulp.task('useref',function () {
    gulp.src('app/**/*.html')
        .pipe(useref())
        .pipe(uglyIf('.js',uglify()))
        .pipe(uglyIf('.css',cssnano()))
        .pipe(gulp.dest('dist'));
});

gulp.task('dist:clear', function() {
    return del.sync('dist');
});

gulp.task('cache:clear', function (callback) {
    return cache.clearAll(callback)
});

gulp.task('images', function(){
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/public/images'))
});

gulp.task('watch',['build-scss','useref'],function () {

    gulp.watch('app/scss/**/*.+(sass|scss)',['build-scss','useref']);
    gulp.watch('app/js/**/*.js',['useref']);
    gulp.watch("app/**/*.html").on('change', function(){
        console.log("Reloading");
        gulp.run('useref');
        Sync.reload();
    });
    gulp.watch('dist/**/*.+(html|css|js)').on('change',function () {
        console.log('Reloading...');
        Sync.reload();
    });

});


var runSequence = require('run-sequence');

gulp.task('default', function(callback) {
    runSequence(['dist:clear','Sync'],['build-scss','fonts','useref','images'],'watch', callback);

});


