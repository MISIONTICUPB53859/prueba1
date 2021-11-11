import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import home from '../../assets/icons/home.svg'
import users from '../../assets/icons/users.svg'
import sales from '../../assets/icons/sales.svg'
import products from '../../assets/icons/products.svg'
import logoutF from '../../assets/icons/doorway.svg'
import { useAuth0 } from "@auth0/auth0-react";

import { SkynetContext } from '../../context/SkynetContext';
import { UserContext} from '../../context/UserContext'
import PrivateComponent from '../PrivateComponent'
import './Dropdown.css'

const Dropdown = () => {

  const { setUser } = useContext(SkynetContext);
  const { logout } = useAuth0();
  const { userData} = useContext(UserContext)

  const items = [
    {
      img: home,
      label: "Inicio",
      route: "/",
    },
    {
      img: users,
      label: "Usuarios",
      route: "/users",
    },
    {
      img: sales,
      label: "Ventas",
      route: "/sales",
    },
    {
      img: products,
      label: "Productos",
      route: "/products",
    },
    // {
    //   img: logoutF,
    //   label: "Salir",
    //   route: "/",
    //   function: setUser,
    //   functionAuth : logout
    // },
  ]


  return (

    <>
      {userData && 
      
        <div className="dropdown--container">
          <PrivateComponent statusList={["Autorizado"]} roleList={["Administrador", "Vendedor"]}>
            {items.map((item) => {
                  return (
                    <Link to={item.route} className="dropdown--item" onClick={() => { item.function && item.function('')}} >
                      <img src={item.img} alt={`imagen de ${item.label}`} className={item.label} />
                      <p>{item.label}</p>
                    </Link>
                  )
                })
              }
          </PrivateComponent>

          <div className="dropdown--item" onClick={()=>logout()}>
              <img src={logoutF} alt="icono de cerrar sesión" className="salir"/>
              <p>Salir</p>

          </div>
        </div>
      
      }
    </>

  )
}

export default Dropdown