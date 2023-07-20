// dupa ce am instalat gulp  cu npm i -G gulp trebuie creat fiseru gulp
//trebuie sa mai instalam si gulp-sass

//asa extragem src din gulp cea ce na ajuta sa indetificam unde se afla arhivele,
//iar cu dest unde o sa salvam 
//cu paralele specificam ca dorim sa execute maimulte functi 
const {src,dest,watch,parallel}= require ("gulp");
const sass= require("gulp-sass")(require("sass"));
//folosim plumber ca sa nu ne mai arate mereu eroare de compilare
const plumber = require("gulp-plumber");

//Imagini 
const webp = require("gulp-webp");

//asta este o functie care avizeaza a gulp
function css (done){
//identificam toate arhivele sass cu **
src("src/scss/**/*.scss")
.pipe(plumber())
.pipe(sass())//compilam
.pipe(dest("build/css"))//salvam in hard disk

 //iar dua cu pipe executa continutul
    done();
}

//asta automatizeaza transformarea imaginilor jpg in webp

function versionWebp(done){

    const opcionenes={
        qualiada:50
    }
src("src/img/**/*.{png,jpg}")//asa selectionam toate imaginile din img
   .pipe(webp(opcionenes))//asa convertim imaginile la  calitate de 50
    .pipe(dest("build/img")) //iar asa le transferam in folderu img
   done()
}


function dev(done){
    //aici punem l wacth fisierus css sa se refresuiasca automat
watch("src/scss/**/*.scss",css)
    done()
}


exports.css =css

exports.versionWebp=versionWebp

//acum cu dev putem executa ambele functi
exports.dev =parallel(versionWebp,dev)
