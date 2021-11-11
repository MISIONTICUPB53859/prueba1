import React, {useContext} from "react";
import { SkynetContext } from "../context/SkynetContext";

import AuthenticatedRoutes from "./AuthenticatedRoutes";
import UnauthenticatedRoutes from "./UnauthenticatedRoutes";
import { useAuth0 } from "@auth0/auth0-react";


export default function Router(){

    const {user} = useContext(SkynetContext);
    //si el usuario no existe significa que no esta autenticado
    //si el usuario existe, no seria nulo (user = 123, o a cualquier cosa) 

    //Se agrega función de autenticación de Auth0 como condición adicional.
    const {isAuthenticated, isLoading} = useAuth0()

    if(isLoading) return <h1>Cargando ...</h1>

    if(isAuthenticated && user){
        console.log('Authenticated Routes')
       return (
            <AuthenticatedRoutes />
        );
    }else{
        console.log('UnAuthenticated Routes')
         return (
            <UnauthenticatedRoutes />
        );
        
    }
}