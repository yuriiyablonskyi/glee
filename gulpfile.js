const { src, dest, watch, parallel, series } = require('gulp');

const svgSprite = require("gulp-svg-sprites");
const scss = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const del = require('del');
const browserSync = require('browser-sync').create();
// const svgSprite    = require('gulp-svg-sprite');

// const svgSprites = () => {
//   return src('app/svg-sprite/*.svg')
//   .pipe(svgSprite({
//     mode: {
//       stack: {
//         sprite: "../images/sprite.svg"
//       }
//     }
//   }))
//   .pipe(dest('app/'))
// }

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    },
    notofy: false
  })
}

function styles() {
  return src('app/scss/style.scss')
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 version'],
      grid: true
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/mixitup/dist/mixitup.js',
    'app/js/main.js'
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function images() {
  return src('app/images/**/*.*')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(dest('dist/images'))
}

function build() {
  return src([
    'app/**/*.html',
    'app/css/style.min.css',
    'app/js/main.min.js'
  ], { base: 'app' })
    .pipe(dest('dist'))
}

function cleanDist() {
  return del('dist')
}

function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/**/*.html']).on('change', browserSync.reload);
}

function svgSprites() {
  return src('app/images/*.svg')
  .pipe(svgSprite({
    mode: {
      stack: {
        sprite: '../sprite.svg'
      }
    }
  }))
  .pipe(dest('app/images'));
};

exports.styles = styles;
exports.svgSprites = svgSprites;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.cleanDist = cleanDist;

exports.default = parallel(styles, scripts, svgSprites, browsersync, watching);
exports.build = series(cleanDist, images, build);
watch('./src/img/**.svg').svgSprites;

// exports.default = parallel(styles, scripts, svgSprites, browsersync, watching);
// var gulp = require('gulp'),
//   svgSprite = require('gulp-svg-sprite'),

//   // More complex configuration example
//   config = {
//     shape: {
//       dimension: { // Set maximum dimensions
//         maxWidth: 32,
//         maxHeight: 32
//       },
//       spacing: { // Add padding
//         padding: 10
//       },
//       dest: 'out/intermediate-svg' // Keep the intermediate files
//     },
//     mode: {
//       view: { // Activate the «view» mode
//         bust: false,
//         render: {
//           scss: true // Activate Sass output (with default options)
//         }
//       },
//       symbol: true // Activate the «symbol» mode
//     }
//   };

// gulp.src('app/svg-sprite/*.svg', { cwd: 'path/to/assets' })
//   .pipe(svgSprite(config))
//   .pipe(gulp.dest('out'));

// // SVG Config
// var config = {
//   mode: {
//     symbol: { // symbol mode to build the SVG
//       render: {
//         css: false, // CSS output option for icon sizing
//         scss: false // SCSS output option for icon sizing
//       },
//       dest: 'sprite', // destination folder
//       prefix: '.svg--%s', // BEM-style prefix if styles rendered
//       sprite: 'sprite.svg', //generated sprite name
//       example: true // Build a sample page, please!
//     }
//   }
// };