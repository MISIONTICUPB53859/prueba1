import React from "react";
import "./Header.css"
// import userPic from '../../assets/images/userpic.png'
import { useAuth0 } from "@auth0/auth0-react"; 

const Header = ({section}) => {
     const { user } = useAuth0();
    return (
        <div className="header-container">
            <header>
                <h1>{section}</h1>
                    <div className="user">
                        <p>{user.name}</p>
                        <img src={user.picture} alt="foto del usuario"/>
                    </div>
            </header>
        </div>
    )
}

export default Header;