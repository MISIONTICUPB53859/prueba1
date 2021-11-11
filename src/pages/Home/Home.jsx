import React, {useContext} from "react";
import './Home.css'
import logo from '../../assets/icons/logo2 1.svg'
import { useAuth0 } from "@auth0/auth0-react";
import {getUserData, getUserByEmail} from '../Users/UserServices'
import UserContextProvider, { UserContext } from "../../context/UserContext";

const Home = () => {
    const { getAccessTokenSilently, user } = useAuth0();
    const { setUserData, userData } = useContext(UserContext)

    const getData  = async () => {
        const token = await getAccessTokenSilently();
        getUserData((res)=>{
            console.log('response', res)
        },
        (err) => {
            console.log("err", err);
        },
        token)
    }

    React.useEffect(()=>{
            getData();
             //getActualUser(user)
    }, [])

        
        
    return (
        <div className="content home">
            <img src={logo} alt="" className="home--logo" />
            <h1>Skynet Store</h1>
            <p>Bienvenido a la aplicación web de
                Skynet Store, donde podrás llevar
                registro y hacer un seguimiento
                de las ventas realizadas y de los
                vendedores involucrados en cada
                una de ellas.</p>
            
        </div>
    )
}

export default Home;