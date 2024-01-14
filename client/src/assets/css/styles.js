 


var appendStylesheets = () => {

    var styles = [
      "./assets/admin/vendors/feather/feather.css",
      "./assets/admin/vendors/mdi/css/materialdesignicons.min.css",
      "./assets/admin/vendors/ti-icons/css/themify-icons.css",
      "./assets/admin/vendors/typicons/typicons.css",
      "./assets/admin/vendors/simple-line-icons/css/simple-line-icons.css",
      "./assets/admin/vendors/css/vendor.bundle.base.css",
      "./assets/admin/css/vertical-layout-light/style.css"
    ];
     

    styles.forEach((item, index) => {
      console.log(item);
    })




    // Dashboard Style
    /*
    var cssTag = document.createElement("style");
    cssTag.setAttribute("id", "dashboard-styles")
    cssTag.innerHTML = styles;
    document.head.appendChild( cssTag );
    */
    
}

export {appendStylesheets};