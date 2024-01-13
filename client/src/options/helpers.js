 
Array.prototype.existsPath = function(dir) {
    
    var filter = this.filter((arrFields) => dir.indexOf(arrFields) !== -1 );
    if( filter.length ) {
        return true
    }

    return false;
    
}

 