
const gulp = require('gulp');
const concat = require('gulp-concat');
const uglifycss = require('gulp-uglifycss');
const dartSass = require('sass');
const gulpSass = require('gulp-sass'); 
const sass = gulpSass( dartSass );

var config = {
    css: {
        from: "./front-end/scss/**/*.scss",
        to:"./client/assets/src/css"
    }  
}


gulp.task( "stylesheets.min", () => {

    return gulp.src( config.css.from )
        .pipe( sass({ outputStyle: 'expanded' }) )
        .pipe(uglifycss({
            "maxLineLen": 0,
            "uglyComments": true
        }))
        .pipe( concat( 'main.min.css' ) )
        .pipe(gulp.dest(config.css.to));
        
});



gulp.task( "watch",  () => {
      
    gulp.watch( config.css.from, gulp.parallel( "stylesheets.min" ) ); 

});
