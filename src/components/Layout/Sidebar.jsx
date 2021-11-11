import React, { useContext, useState } from "react";
import './Sidebar.css'

import { Link } from "react-router-dom";

import home from '../../assets/icons/home.svg'
import users from '../../assets/icons/users.svg'
import sales from '../../assets/icons/sales.svg'
import products from '../../assets/icons/products.svg'
import logoutIcon from '../../assets/icons/doorway.svg'
import logoSkynet from '../../assets/icons/logo2 1.svg'
import PrivateComponent from '../PrivateComponent'
import Dropdown from "./Dropdown";
import { SkynetContext } from "../../context/SkynetContext";
import { UserContext } from '../../context/UserContext'
import { useAuth0 } from "@auth0/auth0-react";


const Sidebar = () => {

    const { setActualSection, isDropdownOpen, toogleDropdown, logoutF } = useContext(SkynetContext);
    
    const {logout} = useAuth0()

    const {userData} =  useContext(UserContext)

    return (

        <>
            {userData && 
                <nav className="sidebar">
                    <div className="sidebar--logo">
                        <img src={logoSkynet} alt="logo skynet store" />
                        <p>Skynet Store</p>
                    </div>

                    <ul>
                        <Link to="/" className="link">
                            <li className="sidebar--item" onClick={() => setActualSection()}>
                                <img src={home} alt="icono de inicio" />
                                <p>Inicio</p>

                            </li>
                        </Link>
                    
                        <PrivateComponent statusList={["Autorizado"]} roleList={["Administrador", "Vendedor"]}>
                                
                            <Link to="/users" className="link">
                                <li className="sidebar--item" onClick={() => setActualSection()}>
                                    <img src={users} alt="icono de usuarios" />
                                    <p>Usuarios</p>

                                </li>
                            </Link>


                            <Link to="/sales" className="link">
                                <li className="sidebar--item" onClick={() => setActualSection()}>
                                    <img src={sales} alt="icono de ventas" />
                                    <p>Ventas</p>

                                </li>
                            </Link>

                            <Link to="/products" className="link">
                                <li className="sidebar--item" onClick={() => setActualSection()} >
                                    <img src={products} alt="icono de productos" />
                                    <p>Productos</p>

                                </li>
                            </Link>

                        </PrivateComponent>

                        <div className="hamburguer-menu" onClick={toogleDropdown}>
                            &#9776;
                        </div>



                    </ul>

                    <ul className="close-session--container">
                        <a className="close-session">
                            <li className="sidebar--item" onClick={() => { logout()
                            logoutF() }}>
                                <img src={logoutIcon} alt="icono de cerrar sesion" />
                                <p>Salir</p>

                            </li>
                        </a>
                    </ul>

                    {isDropdownOpen && <Dropdown />}

        </nav>
                
            }
        </>

    )
}

export default Sidebar;