import { deleteAsync } from 'del';
import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import terser from 'gulp-terser';
import browser from 'browser-sync';
import rename from 'gulp-rename';
import autoprefixer from 'autoprefixer';
import htmlmin from 'gulp-htmlmin';
import ttf2woff2 from 'gulp-ttf2woff2';

const sass = gulpSass(dartSass);

/* Images */

export const images = () => {
    return gulp.src('app/**/*.png')
        .pipe(gulp.dest('public/assets/images'));
};

/* Icons */

export const icons = () => {
    return gulp.src('app/assets/images/**/*.*')
        .pipe(gulp.dest('public/assets/images'));
};

/* Fonts */

export const fonts = () => {
    return gulp.src('app/assets/fonts/*.ttf')
        .pipe(ttf2woff2())
        .pipe(gulp.dest('public/assets/fonts'));
};

/* Scripts */

const scripts = () => {
    return gulp.src('app/**/*.js')
        .pipe(terser())
        .pipe(rename('script.min.js'))
        .pipe(gulp.dest('public/js'));
};

/* HTML */

export const html = () => {
    return gulp.src('app/index.html')
        .pipe(htmlmin())
        .pipe(rename('index.min.html'))
        .pipe(gulp.dest('public'))
        .pipe(browser.stream());
};

/* Pages */

export const pages = () => {
    return gulp.src('app/pages/*.html')
        .pipe(htmlmin())
        .pipe(gulp.dest('public/pages'))
};

/* Styles */

export const styles = () => {
    const plugins = [
        autoprefixer(),
        cssnano()
    ];

    return gulp.src('app/assets/styles/index.scss', { sourcemaps: true })
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(rename('index.min.css'))
        .pipe(gulp.dest('public/css', { sourcemaps: '.' }))
        .pipe(browser.stream());
};

/* Clean */

export const clean = () => {
    return deleteAsync('public');
};

/* Watch */

export const watching = () => {
    browser.init({
        server: {
            baseDir: 'public',
            index: 'index.min.html',
        },
        cors: true,
        notify: false,
        ui: false,
    });

    gulp.watch(['app/**/*.scss'], gulp.series(styles));
    gulp.watch(['app/**/*.js'], gulp.series(scripts));
    gulp.watch(['app/pages/*.html'], gulp.series(pages));
    gulp.watch(['app/index.html'], html).on('change', browser.reload);
};

export const build = gulp.series(
    clean,
    images,
    gulp.parallel(
        styles,
        html,
        pages,
        icons,
        scripts,
        fonts,
    ),
);

export default gulp.series(
    clean,
    images,
    gulp.parallel(
        styles,
        html,
        pages,
        icons,
        scripts,
        fonts,
        watching,
    ),
);
