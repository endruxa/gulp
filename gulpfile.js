//подключили модуль галп из node_modules
const gulp = require('gulp');

//подключаем gulp-concat
const concat = require('gulp-concat');

const autoprefixer = require('gulp-autoprefixer');

const cleanCSS = require('gulp-clean-css');

const uglify = require('gulp-uglify');

const del = require('del');

const browserSync = require('browser-sync').create();


//шаблоны css
const cssFiles = [
    './src/css/main.css',
    './src/css/footer.css',
];

//таск на стили CSS по шаблону "./src/css/**/*.css"
function styless() {

    return gulp.src(cssFiles)
            .pipe(concat('style.css'))
            .pipe(autoprefixer({
                browsers: ['>0.1%'],
                cascade: false
            }))
            .pipe(cleanCSS({level: 2}))
            .pipe(gulp.dest('./build/css'))
            .pipe(browserSync.stream())
     
}

//шаблоны js
const jsFiles = [
    './src/js/lodash.js',
    './src/js/main.js',
    './src/js/lib.js',
];

//таск на js JS
function scripts() {
    return gulp.src(jsFiles)
    .pipe(concat('scripts.js'))
     .pipe(uglify({
         toplevel: true
     }))
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream())
}

//удалить все в указанной папке
function clean() {
    return del(['build/*']);
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    //следить за css
    gulp.watch('./src/css/**/*.css', styless);
    //следить за js
    gulp.watch('./src/js/**/*.js', scripts);
    //следить за html
    gulp.watch("./*.html").on('change', browserSync.reload);
}

//1-таск-любое название, 2-название функции. Вызов gulp (имя таска)
gulp.task('styles', styless);
gulp.task('js', scripts);
//для примера
//gulp.task('clean', clean);

gulp.task('watch', watch);

gulp.task('build', gulp.series(clean, gulp.parallel(styless, scripts)));

gulp.task('dev', gulp.series('build', 'watch'));