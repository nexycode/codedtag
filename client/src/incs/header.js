import {Navs} from '../controller/navs';
import logo from './../assets/img/logo-3.png';
import {screens} from './../options/helpers.js'
import './../options/prototypes.js'
import { useState } from 'react';
import Icons from './../options/icons';
import {useAuth} from './../utils/auth.js'


var Header = () => {
    
    var {isAdmin} = useAuth(); 
    
    return isAdmin? <h1>Admin Header</h1>: <h1>General Header</h1>
}


export default Header;