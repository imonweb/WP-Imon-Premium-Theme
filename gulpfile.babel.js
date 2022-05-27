import gulp from "gulp"
import yargs from "yargs"
// import sass from "gulp-sass"
import cleanCSS from 'gulp-clean-css'
import gulpif from 'gulp-if'
import sourcemaps from 'gulp-sourcemaps'
// import imagemin from 'gulp-imagemin'


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
  }
}

const { src, dest } = require('gulp')
// change gulp.src and gulp.dest to src & dest

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
}

// export const images = () => {
//   return src(paths.images.src)
//     .pipe(gulpif(PRODUCTION, imagemin()))
//     .pipe(dest(paths.images.dest));
// }
// export default hello
