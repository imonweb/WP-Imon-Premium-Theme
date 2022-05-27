import gulp from "gulp"
import yargs from "yargs"
// import sass from "gulp-sass"
import cleanCSS from 'gulp-clean-css'
import gulpif from 'gulp-if'
import sourcemaps from 'gulp-sourcemaps'
import imagemin from 'gulp-imagemin'
import del from 'del'


const sass = require('gulp-sass')(require('sass'));

const PRODUCTION = yargs.argv.prod

const paths = {
  styles: {
    src: ["src/assets/scss/bundle.scss","src/assets/scss/admin.scss"],
    dest: 'dist/assets/css'
  },
  images: {
    src: 'src/assets/images/**/*.{jpg,jpeg,jpg,png,svg,gif}',
    dest: 'dist/assets/images'
  },
  other: {
    src: ['src/assets/**/*', '!src/assets/{images,js,scss}', '!src/assets/{images,js,scss}/**/*'],
    dest: 'dist/assets'
  }
}

const { src, dest } = require('gulp')
// change gulp.src and gulp.dest to src & dest

export const clean = () => del(['dist']);

export const styles = () => {
  return src(paths.styles.src)
    .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
    .pipe(sass().on("error", sass.logError))
    .pipe(gulpif(PRODUCTION, cleanCSS({compatibility: 'ie8'})))
    .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
    .pipe(dest(paths.styles.dest));
}

export const watch = () => {
  gulp.watch('src/assets/scss/**/*.scss', styles);
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.other.src, copy);
}

export const images = () => {
  return src(paths.images.src)
    .pipe(gulpif(PRODUCTION, imagemin()))
    .pipe(dest(paths.images.dest));
}

export const copy = () => {
  return src(paths.other.src)
    .pipe(dest(paths.other.dest));
}

// clean folder first. Then, rebuild!
export const dev = gulp.series(clean, gulp.parallel(styles, images, copy), watch)
export const build = gulp.series(clean, gulp.parallel(styles, images, copy))


// export default hello
