import gulp from "gulp"
import yargs from "yargs"
// import sass from "gulp-sass"
import cleanCSS from 'gulp-clean-css'
import gulpif from 'gulp-if'
import sourcemaps from 'gulp-sourcemaps'
import imagemin from 'gulp-imagemin'
import del from 'del'
import webpack from 'webpack-stream'
import uglify from 'gulp-uglify'
import named from 'vinyl-named'
import browserSync from "browser-sync"
import zip from 'gulp-zip'
 /* imontheme */
 import replace from 'gulp-replace'
 import info from './package.json'

const server = browserSync.create();

// const named = require('vinyl-named')
const { src, dest } = require('gulp')
// change gulp.src and gulp.dest to src & dest

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
  scripts: {
    src: ['src/assets/js/bundle.js','src/assets/js/admin.js'],
    dest: 'dist/assets/js',
  },
  other: {
    src: ['src/assets/**/*', '!src/assets/{images,js,scss}', '!src/assets/{images,js,scss}/**/*'],
    dest: 'dist/assets'
  },
  package: {
    src: ['**/*', '!.vscode', '!node_modules{,/**}', '!packaged{./**}', '!src{,/**}', '!.babelrc', '!.gitignore', '!gulpfile.babel.js', '!package.json', '!package-lock.json'],
    dest: 'packaged'
  }
}

export const serve = (done) => {
  server.init({
    // proxy: "http://127.0.0.1/wp/WP_Udemy/Premium_WP_Theme/"
    baseDir: "./"
  });
  done();
}

export const reload = (done) => {
  server.reload();
  done();
}

export const clean = () => del(['dist']);

export const styles = () => {
  return src(paths.styles.src)
    .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
    .pipe(sass().on("error", sass.logError))
    .pipe(gulpif(PRODUCTION, cleanCSS({compatibility: 'ie8'})))
    .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
    .pipe(dest(paths.styles.dest))
    .pipe(server.stream());
}

export const watch = () => {
  gulp.watch('src/assets/scss/**/*.scss', styles);
  gulp.watch('src/assets/js/**/*.js', gulp.series(scripts, reload));
  gulp.watch('**/*.php', reload);
  gulp.watch(paths.images.src, gulp.series(images, reload));
  gulp.watch(paths.other.src, gulp.series(copy, reload));
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

export const scripts = () => {
  return src(paths.scripts.src)
    .pipe(named())
    .pipe(webpack({
      module: {
        rules: [
          {
            test: /\.js$/i,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              }
            }
          }
        ]
      },
      output: {
        filename: '[name].js',
      },
      externals: {
        jquery: 'jQuery'
      },
      devtool: !PRODUCTION ? 'inline-source-map' : false,
      mode: 'development'
    }))
    .pipe(gulpif(PRODUCTION, uglify()))
    .pipe(dest(paths.scripts.dest))
}

export const compress = () => {
  return src(paths.package.src)
    .pipe(replace('_themename', info.name))
    .pipe(zip(`${info.name}.zip`))
    .pipe(dest(paths.package.dest));
}

// clean folder first. Then, rebuild!
export const dev = gulp.series(clean, gulp.parallel(styles, scripts, images, copy), serve, watch)
export const build = gulp.series(clean, gulp.parallel(styles, scripts, images, copy))
export const bundle = gulp.series(build, compress)


export default dev
