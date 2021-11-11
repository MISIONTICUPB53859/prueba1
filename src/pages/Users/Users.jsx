import React, {useContext, useEffect} from 'react';
import PrivateComponent from '../../components/PrivateComponent';
import UserTable from './UserTable';
import { useAuth0 } from "@auth0/auth0-react";
import {getUserData} from '../Users/UserServices'
import { UserContext} from "../../context/UserContext";


const Users = () => {

  const {userData} = useContext(UserContext);


  return (
    <>
      {userData && 
        <PrivateComponent roleList={["Administrador", "Vendedor"]} statusList={["Autorizado"]}>
        <div className="content">
          <UserTable/>
        </div>
      </PrivateComponent>
      }
    </>
  )


};

export default Users;
