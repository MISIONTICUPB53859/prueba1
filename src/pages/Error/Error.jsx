import React, { useContext, useEffect } from "react";
import "./Error.css";
import { NavLink } from "react-router-dom";
import { SkynetContext } from "../../context/SkynetContext";

import { useHistory } from "react-router-dom";


  
  
  const Error = () => {

    let history = useHistory();
    

    const {getUser} = useContext(SkynetContext); 
    console.log('user en error' + getUser());
    if(!getUser()){
        history.push('/')
    }

      return (
       <>
        <div className= "error">
            <h1>404 Página Error</h1>
            <p>Lo sentimos, Esta página no existe =&#40;</p>
            <a href="/">Regresar ← </a>
        </div>
       </>
   );
}

export default Error;
