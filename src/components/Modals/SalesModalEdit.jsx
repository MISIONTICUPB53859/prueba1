import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

import './SalesModal.css';
import logo from '../../assets/icons/logo2 1.svg';

import ProductsApi from '../../api/products';
import UsersApi from '../../api/users';
import SalesApi from '../../api/sales';


import { SkynetContext } from "../../context/SkynetContext";


const SalesModalEdit = (props) => { 

    const { getAccessTokenSilently } = useAuth0();
    
    const { setIsOpenEditModal, isOpenEditModal } = useContext(SkynetContext);

    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);

    const [gId, setGId] = useState(props.element._id);
    const [gSalesId, setGSalesId] = useState(props.element.sales_id);
    const [gTotal, setGTotal] = useState(props.element.total);
    const [gQuantity, setGQuantity] = useState(props.element.quantity);
    const [gUnitPrice, setGUnitPrice] = useState(props.element.unit_price);
    const [gSalesDate, setGSalesDate] = useState(props.element.sales_date);
    const [gClientId, setGClientId] = useState(props.element.client_id);
    const [gClientName, setGClientName] = useState(props.element.client_name);
    const [gProduct, setGProduct] = useState(props.element.product_id);
    const [gUser, setGUser] = useState(props.element.seller_id);
    const [gState, setGState] = useState(props.element.sales_status);



    useEffect(async () => { 
        const token = await getAccessTokenSilently();
        setProducts(await ProductsApi.getAll(token));  
        setUsers(await UsersApi.getAll(token));
    },[])

    const handleChangeProduct = (productId) => {
        setGProduct(productId)
        let price = 0
        for (let index = 0; index < products.length; index++) {
           const element = products[index];
           if(element.product_id == productId){
               price = element.unit_price
           } 
        }
        setGUnitPrice(price)
        if(price != '' && gQuantity >= 0){
            setGTotal(price * gQuantity)
        }
    }

    const handleChangeQuantity = (quantity) => {
        setGQuantity(quantity)
        if(gUnitPrice != '' && quantity >= 0){
            setGTotal(gUnitPrice * quantity)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        let element = {
            sales_id: gSalesId,
            total: gTotal,
            quantity: gQuantity,
            unit_price: gUnitPrice,
            sales_date: gSalesDate,
            client_id: gClientId,
            client_name: gClientName,
            product_id: gProduct,
            seller_id: gUser,
            sales_status: gState
        }
        
        const token = await getAccessTokenSilently();
        let result = await SalesApi.update(gId, element, token)
        props.showToast(result.message, result.code)
        if(result.code){
            props.setIsOpenEditModal(false)
            props.setDataSales(await SalesApi.getAll(token));  
        }
        
        return false
      }

      const handleDelete = async () => {

        const token = await getAccessTokenSilently();
        let result = await SalesApi.drop(gId , token)
        props.showToast(result.message, result.code)
        if(result.code){
            props.setIsOpenEditModal(false)
            props.setDataSales(await SalesApi.getAll(token));  
        }
        
        return false
      }

      const getFormatDate = (date) => {
      
        if(date) {
            date = new Date(date);
            return date.toISOString().split('T')[0]
        }
    }

      const status = [
          "En Proceso",
          "Entregada",
          "Cancelada"
      ]

    if (!isOpenEditModal) return null

    return (
        <div>
            <div className="overlay"></div>
            <div className="modal-sales">
                <div className="modal--header">
                    <div className="modal--header__logo">
                        <img src={logo} alt="logo de Skynet" />
                        <h4>Skynet Store</h4>
                    </div>
                    
                    <button onClick={() => setIsOpenEditModal(false)}>
                    </button>
                </div>

                <h2>Editar Venta {gSalesId}</h2>

                <form onSubmit={(event) => handleSubmit(event)}>

                    <div className="sales-form--field">
                        <label htmlFor="">ID Venta</label>
                        <input 
                            type="number" 
                            name="sales_id" 
                            value = {gSalesId} 
                            required 
                            readOnly 
                        />
                    </div>
                    <div className="sales-form--field">
                        <label htmlFor="">Producto</label>
                        <select className="sales-status-select" required name="product_id" onChange={(e) => handleChangeProduct(e.target.value)} >
                            <option value="">Seleccione un Producto</option>
                            {
                                
                                products.map(product=>{
                                    if(product.product_id == gProduct){
                                        return (
                                            <option selected value={product.product_id}>{product.product_id} - {product.description} - {product.unit_price}</option>
                                        )
                                    } else {
                                        return (
                                            <option value={product.product_id}>{product.product_id} - {product.description} - {product.unit_price}</option>
                                        )
                                    }
                                })
                            }
                        </select>
                    </div>
                    <div className="sales-form--field">
                        <label htmlFor="">Precio Unitario</label>
                        <input 
                            type="number" 
                            name="unit_price" 
                            required 
                            readOnly
                            min="1"                            
                            value = {gUnitPrice}
                        />
                    </div>
                    <div className="sales-form--field">
                        <label htmlFor="">Cantidad Producto</label>
                        <input 
                            type="number" 
                            name="quantity" 
                            required 
                            min = '1'
                            value = {gQuantity}
                            onChange={(e) => handleChangeQuantity(e.target.value)}
                        />
                    </div>                    
                    <div className="sales-form--field">
                        <label htmlFor="">Total Venta</label>
                        <input 
                            type="number" 
                            id="total" 
                            name="total" 
                            required 
                            readOnly
                            value = {gTotal}
                          />
                    </div>
                    <div className="sales-form--field">
                        <label htmlFor="">Fecha Venta</label>
                        <input 
                            type="date" 
                            name="sales_date" 
                            required 
                            value = {getFormatDate(gSalesDate)}
                            onChange={(e) => setGSalesDate(e.target.value)}
                        />
                    </div>
                    <div className="sales-form--field">
                        <label htmlFor="">ID Cliente</label>
                        <input 
                            type="number" 
                            name="client_id" 
                            required 
                            value = {gClientId}
                            onChange={(e) => setGClientId(e.target.value)} 
                        />
                    </div>
                    <div className="sales-form--field">
                        <label htmlFor="">Nombre Cliente</label>
                        <input 
                            type="text" 
                            name="client_name" 
                            required 
                            value = {gClientName}
                            onChange={(e) => setGClientName(e.target.value)}
                        />
                    </div>
                    <div className="sales-form--field">
                        <label htmlFor="">Vendedor</label>
                        <select className="sales-status-select" required name="seller_id" onChange={(e) => setGUser(e.target.value)} >
                            <option value="">Seleccione un vendedor</option>
                            {
                                users.map(user =>{
                                    if(user.status == "Autorizado"){
                                        if(user.employee_id == gUser){
                                            return (
                                                <option selected value={user.employee_id}>{user.name}</option>
                                            )
                                        } else {
                                            return (
                                                <option value={user.employee_id}>{user.name}</option>
                                            )
                                        }
                                    }
                                })
                            }
                        </select>
                    </div>
                    <div className="sales-form--field">
                        <label htmlFor="">Estado Venta</label>                    
                        <select className="sales-status-select" name="sales_status" required onChange={(e) => setGState(e.target.value)}>
                            {
                                status.map(state =>{
                                    if(state == gState){
                                        return (
                                            <option selected value={state}>{state}</option>
                                        )
                                    } else {
                                        return (
                                            <option  value={state}>{state}</option>
                                        )
                                    }
                                })
                            }
                        </select> 
                    </div>

                    <div className="sales-buttons--container">
                        <button type="button" className="button__delete" onClick={() => handleDelete()}>Eliminar</button>
                        <button type="submit" className="button__save" >Aceptar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SalesModalEdit;