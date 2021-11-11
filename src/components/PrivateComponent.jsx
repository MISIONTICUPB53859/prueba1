import React,{useContext} from 'react'
import { UserContext } from '../context/UserContext';

const PrivateComponent = ({roleList,statusList, children}) => {
  
  const {userData} = useContext(UserContext);
  

  if(roleList.includes(userData.rol) && statusList.includes(userData.status)){
    return children;
  }

  return <></>;

}

export default PrivateComponent
