import React, { useContext } from "react";
import PrivateComponent from "../../components/PrivateComponent";
import ProductTable from "./product_table";
import {UserContext} from '../../context/UserContext'

const Products = () => {
  const {userData} = useContext(UserContext)

  

  return (
    <>
      {userData && 
        <PrivateComponent roleList={["Administrador", "Vendedor"]} statusList={["Autorizado"]}>
        <div className="content">
          <ProductTable />
        </div>
      </PrivateComponent>
      }

    </>  
  );
};

export default Products;
