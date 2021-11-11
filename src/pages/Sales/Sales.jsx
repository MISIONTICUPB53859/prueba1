import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useContext, useEffect } from "react";
import { ToastContainer, toast, Zoom, Bounce, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Sales.css';
import SalesRow from "./SalesRow";
import SalesModalEdit from "../../components/Modals/SalesModalEdit";
import { SkynetContext } from '../../context/SkynetContext'
import SalesModalAdd from "../../components/Modals/SalesModalAdd";
import SalesModalDelete from "../../components/Modals/SalesModalDelete";

import PrivateComponent from "../../components/PrivateComponent";

import SalesApi from "../../api/sales";
import { dataSalesEmpty } from "./sales-data";
import {UserContext} from '../../context/UserContext';

const Sales = () => {

    const {userData} = useContext(UserContext)

    const { getAccessTokenSilently } = useAuth0();

    const { setIsOpenAddModal, setIsOpenEditModal, setIsOpenDeleteModal } = useContext(SkynetContext);

    const [searchItem, setSearchItem] = useState("");

    const [currentElement, setCurrentElement] = useState(dataSalesEmpty);

    const openEditModal = (element) =>{
        setCurrentElement(element);
        setIsOpenEditModal(true);
    }

    const showToast = (message, code = true) => {
        if(code){
        toast(message.status, {
            className: "success-toast",
            progressClassName: "progress-bar",
            position: toast.POSITION.TOP_CENTER,
          });
       } else {
        toast(message.status.message, {
            className: "error-toast",
            progressClassName: "error-progress-bar",
            position: toast.POSITION.TOP_CENTER,
          });
       }
    }

    const [dataSales, setDataSales] = useState([]);

    useEffect(async () => {
        const token = await getAccessTokenSilently();
        setDataSales(await SalesApi.getAll(token));  
    }, [])

      return (

        <>
            {userData && 

                <PrivateComponent roleList={["Administrador", "Vendedor"]} statusList={["Autorizado"]}>
                    
                    <div className="content sales-container">
                        <ToastContainer draggable={false} transition ={Flip} autoClose={2000} closeButton={false} />
                        <SalesModalAdd showToast = {showToast} setIsOpenAddModal={setIsOpenAddModal} setDataSales = {setDataSales}/>
                        <SalesModalDelete>esta venta</SalesModalDelete>
                        <SalesModalEdit 
                            key = {currentElement._id}
                            element={currentElement} 
                            setCurrentElement={setCurrentElement} 
                            showToast = {showToast} 
                            setIsOpenEditModal={setIsOpenEditModal} 
                            setDataSales = {setDataSales}
                            />

                        <div className="add-search-sales">
                            <button className="sales-add-button" onClick={() => setIsOpenAddModal(true)}><a href="#">Agregar Venta</a></button> 
                            <input className="search-sales" 
                            type="search"
                            placeholder="Buscar...
                            " id="" 
                            onChange={(event) => setSearchItem(event.target.value.toLowerCase())}/>                                    
                        </div>
                        <table className="sales-table"> 
                            <thead>
                                <tr className="sales-titles">
                                    <th>ID Venta</th>
                                    <th>Total Venta</th>
                                    <th>ID Producto</th>
                                    <th>Cantidad Producto</th>
                                    <th>Precio Unitario</th>
                                    <th>Fecha Venta</th>
                                    <th>Identificación Cliente</th>
                                    <th>Nombre Cliente</th>
                                    <th>Vendedor</th>
                                    <th>Estado Venta</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                            {                                                
                                dataSales.filter((element) => {
                                    if(searchItem == ""){
                                        return element;
                                    }
                                    if(element.sales_id.toString().includes(searchItem)){
                                        return element;
                                    }
                                    if(element.product_id.toString().includes(searchItem)){
                                        return element;
                                    }
                                    if(element.client_id.toString().includes(searchItem)){
                                        return element;
                                    }
                                    if(element.sellerData[0].name.toLowerCase().includes(searchItem)){
                                        return element;
                                    }
                                    if(element.client_name.toLowerCase().includes(searchItem)){
                                        return element;
                                    }
                                }).map((element, i) => {
                                    return (             
                                            <SalesRow key={i} element={element} openEditModal={openEditModal} />
                                        )
                                })
                            
                            }
                            </tbody>
                        </table>
                    </div>
                </PrivateComponent>
            }
        </>
    )
}

export default Sales;