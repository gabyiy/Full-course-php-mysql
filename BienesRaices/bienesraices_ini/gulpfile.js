// dupa ce am instalat gulp  cu npm i -G gulp trebuie creat fiseru gulp
//trebuie sa mai instalam si gulp-sass

//asa extragem src din gulp cea ce na ajuta sa indetificam unde se afla arhivele,
//iar cu dest unde o sa salvam
//cu paralele specificam ca dorim sa execute maimulte functi
const { src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
//folosim plumber ca sa nu ne mai arate mereu eroare de compilare
const plumber = require('gulp-plumber');

//Imagini
const webp = require('gulp-webp');
//cu imagemin facem imaginile mai mici
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
//facem imagini in format avif
const avif = require("gulp-avif")

//asa inbunatatim codul css
const cssnano = require("cssnano")
const autoprefixer = require("autoprefixer")
const postcss = require("gulp-postcss")
const sourcemaps =require("gulp-sourcemaps")


const paths = {
  scss: 'src/scss/**/*.scss',
  js: 'src/js/**/*.js',
  imagenes: 'src/img/**/*'
}

//asta este o functie care avizeaza a gulp
function css(done) {
  //identificam toate arhivele sass cu **
  return src(paths.scss)

  .pipe(sass())
  .pipe(postcss([autoprefixer(), cssnano()]))
  // .pipe(postcss([autoprefixer()]))
  .pipe(sourcemaps.write('.'))
  .pipe(dest('build/css'));
  done();
}
// function css() {
//   return src(paths.scss)
//       .pipe(sourcemaps.init())
//       .pipe(sass())
//       .pipe(postcss([autoprefixer(), cssnano()]))
//       // .pipe(postcss([autoprefixer()]))
//       .pipe(sourcemaps.write('.'))
//       .pipe(dest('build/css'));
// }
// //cu fuctiaasta transforma imaginile in format avif

function versionAvif (done){
    const opcionenes = {
        qualiada: 50,
      };
    src('src/img/**/*.{png,jpg}')
    .pipe(cache(avif(opcionenes)))
    .pipe(dest('build/img'))
    done()
}


// cu functia asta facem imaginiile mai mici fomat png
function imagenes(done) {
  const opciones = {
    optimizationLevel: 3,
  };
  src('src/img/**/*.{png,jpg}')
    .pipe(cache(imagemin(opciones)))
    .pipe(dest('build/img'));
  done();
}

//asta automatizeaza transformarea imaginilor jpg in webp

function versionWebp(done) {
  const opcionenes = {
    qualiada: 50,
  };
  src('src/img/**/*.{png,jpg}') //asa selectionam toate imaginile din img
    .pipe(webp(opcionenes)) //asa convertim imaginile la  calitate de 50
    .pipe(dest('build/img')); //iar asa le transferam in folderu img
  done();
}

//folosim funcia asta pentr ua adauga javascript

function javascript(done){

src("src/js/**/*.js")
.pipe(dest("build/js"))
  done()
}
// function javascript() {
//   return src(paths.js)
//     .pipe(sourcemaps.init())
//     .pipe(concat('bundle.js')) // final output file name
//     .pipe(terser())
//     .pipe(sourcemaps.write('.'))
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(dest('./build/js'))
// }


function dev(done) {
  //aici punem l wacth fisierus css sa se refresuiasca automat
  watch('src/scss/**/*.scss', css);
  // watch("src/js/**/*.js",javascript);    watch( paths.scss, css );
  // watch( paths.js, javascript );
  done();
}

exports.css = css;

exports.versionWebp = versionWebp;
exports.imagenes=imagenes;
exports.versionAvif=versionAvif;
exports.javascript=javascript;

//acum cu dev putem executa ambele functi
exports.dev = parallel(versionWebp,imagenes,versionAvif,javascript, dev);
