import { createContext, useContext, useState, useEffect } from "react";
import { useAuth0} from "@auth0/auth0-react";
import { getUserByEmail } from '../pages/Users/UserServices' 
export const UserContext = createContext(null);

const UserContextProvider = (props) => {
  const [userData, setUserData] = useState();

  const {user} = useAuth0()
  const { getAccessTokenSilently } = useAuth0();
  
  const getActualUser = async (usuario) => {
    const token = await getAccessTokenSilently();
    const actualUser = getUserByEmail(usuario.email, token)
    setUserData(await actualUser)
    
  }



  return (<UserContext.Provider value={{userData, setUserData, getActualUser}}>
    {props.children}
  </UserContext.Provider>)
}

export default UserContextProvider;