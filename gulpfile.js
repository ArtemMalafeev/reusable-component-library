import { deleteAsync } from 'del';
import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import browser from 'browser-sync';
import rename from 'gulp-rename';
import autoprefixer from 'autoprefixer';
import htmlmin from 'gulp-htmlmin';
import ttf2woff2 from 'gulp-ttf2woff2';

const sass = gulpSass(dartSass);

/* Fonts */

export const fonts = () => {
    return gulp.src('app/assets/fonts/*.ttf')
        .pipe(ttf2woff2())
        .pipe(gulp.dest('public/assets/fonts'));
};

/* HTML */

export const html = () => {
    return gulp.src('app/index.html')
        .pipe(htmlmin())
        .pipe(rename('index.min.html'))
        .pipe(gulp.dest('public'))
        .pipe(browser.stream());
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
    gulp.watch(['app/index.html'], html).on('change', browser.reload);
};


export default gulp.series(
    clean,
    gulp.parallel(
        styles,
        html,
        fonts,
        watching,
    ),
);
