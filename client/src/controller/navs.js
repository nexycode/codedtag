// Should include all components here 

var Navs = (props) => {

      {     

            // Start Classes 
            var classes = "";
            
            if( props.position && props.position != '' ) {
                  classes += " " + `offset-${props.position}`;
            } 
            
            if( props.outerSpaceLeft && props.outerSpaceLeft != '' ) {
                  classes += " " + `${props.outerSpaceLeft}`;
            }  

            if( props.outerSpaceRight && props.outerSpaceRight != '' ) {
                  classes += " " + `${props.outerSpaceRight}`;
            }  

            if( props.outerSpaceBoth && props.outerSpaceBoth != '' ) {
                  classes += " " + `${props.outerSpaceBoth}`;
            }  

            if( props.innerSpaceLeft && props.innerSpaceLeft != '' ) {
                  classes += " " + `${props.innerSpaceLeft}`;
            }  

            if( props.innerSpaceRight && props.innerSpaceRight != '' ) {
                  classes += " " + `${props.innerSpaceRight}`;
            } 

            if( props.innerSpaceBoth && props.innerSpaceBoth != '' ) {
                  classes += " " + `${props.innerSpaceBoth}`;
            }
            
            if( props.navName && props.navName != '' ) {
                  classes += " " + `${props.innerSpaceBoth}`;
            }

            if( props.navClasses && props.navClasses != '' ) {
                  classes += " " + `${props.navClasses}`;
            }

            classes = classes.trim(); 


            // Start nav Items  { ++++++++++++++++++++++Consider NAV NAME ALSO +++++++++++++++++++++++++++++}
            /* 
                  id 
                  name 
                  items []
            */
            var items = [ // use <Link to=... +/> tag
                  {
                        type: 'item', 
                        link: '#',
                        text: '',
                        classes: '',                    
                        svg: '',    
                        router: false,
                        path: '',    
                        component: 'home',     // page - tutorial - 
                        subitem: [ // default => empty []
                              {
                                    type: 'item', 
                                    link: '#',
                                    text: '',
                                    classes: '',                    
                                    svg: '',    
                                    router: false,
                                    path: '',    
                                    component: '',
                              }
                        ]
                  }
            ];

      }

      
      

      return (
            <b></b>
      );
}


export {Navs};