import React, { useContext, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import {
  BrowserRouter as Router,
  Switch,
  Route, 
  Redirect
} from "react-router-dom";

import './Layout.css'

import Header from './Header'
import Sidebar from './Sidebar'
import Users from '../../pages/Users/Users'
import Sales from '../../pages/Sales/Sales'
import Products from '../../pages/Products/Products'
import Home from '../../pages/Home/Home'
import Error from '../../pages/Error/Error'

import { SkynetContext } from '../../context/SkynetContext';
import { UserContext } from '../../context/UserContext';
import { browserHistory } from 'react-router'

const Layout = () => {

  const { user } = useAuth0();
  const {getActualUser} = useContext(UserContext)

  useEffect(()=>{

      getActualUser(user)
  }, [] )

  const { actualSection, setActualSection, closeDropdown } = useContext(SkynetContext);
  
  useEffect(() => {
    let title = window.location.pathname;
    switch (title) {
      case "/users":
        setActualSection("Usuarios");
        break;
      case "/sales":
        setActualSection("Ventas");
        break;
      case "/products":
        setActualSection("Productos");
        break;
      case "/":
        setActualSection("Inicio");
        break;
      default:
        setActualSection("Error");
    }


  })


  if(user != null && actualSection == "Error"){
    return (
      <Error />
    )
  }

  return (
    <div className="layout-container" onClick={closeDropdown}>

      <Router>
        <Sidebar />
        <Header section={actualSection} />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/sales" component={Sales} />
          <Route exact path="/products" component={Products} />
 
        </Switch>
      </Router>
    </div>
  )
}


export default Layout