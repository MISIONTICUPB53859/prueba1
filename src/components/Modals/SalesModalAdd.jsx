import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

import './SalesModal.css';
import logo from '../../assets/icons/logo2 1.svg';

import { dataSalesEmpty } from "../../pages/Sales/sales-data";
import ProductsApi from '../../api/products';
import UsersApi from '../../api/users';
import SalesApi from '../../api/sales';


import { SkynetContext } from "../../context/SkynetContext";
import PrivateComponent from "../PrivateComponent";

const SalesModalAdd = (props) => {

    const { getAccessTokenSilently } = useAuth0();

    const { setIsOpenAddModal, isOpenAddModal } = useContext(SkynetContext);
    const [currentElement, setCurrentElement] = useState(dataSalesEmpty);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [gUnitPrice, setGUnitPrice] = useState('');
    const [gTotal, setGTotal] = useState('');

    useEffect(async () => {
        const token = await getAccessTokenSilently();
        setProducts(await ProductsApi.getAll(token));  
        setUsers(await UsersApi.getAll(token));
    }, [])

    const handleChange = (event) => {
       setField(event.target.name, event.target.value);
    }

    const setField = (name, value) => {
        let element = currentElement;
        element[name] = value;
        setCurrentElement(element);
    }

    const handleChangeProduct = (event) => {
        handleChange(event)
        let price = 0
        for (let index = 0; index < products.length; index++) {
           const element = products[index];
           if(element.product_id == event.target.value){
               price = element.unit_price
           } 
        }
        setGUnitPrice(price)
        setField('unit_price', price);
        if(price != '' && currentElement.quantity >= 0){
            setGTotal(price * currentElement.quantity)
            setField('total', (price * currentElement.quantity).toFixed(2));
        }
    }

    const handleChangeQuantity = (event) => {
        handleChange(event)
        if(gUnitPrice != '' && currentElement.quantity >= 0){
            setGTotal(gUnitPrice * currentElement.quantity)
            setField('total', (gUnitPrice * currentElement.quantity).toFixed(2));
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        //  console.log(JSON.stringify(currentElement))
        const token = await getAccessTokenSilently();
        let result = await SalesApi.create(currentElement, token)
        props.showToast(result.message, result.code)
        if(result.code){
            props.setIsOpenAddModal(false)
            props.setDataSales(await SalesApi.getAll(token));  
        }
        
        return false
      }


    if (!isOpenAddModal) return null

    return (
        <div>
            <div className="overlay"></div>
            <div className="modal-sales">
                <div className="modal--header">
                    <div className="modal--header__logo">
                        <img src={logo} alt="logo de Skynet" />
                        <h4>Skynet Store</h4>
                    </div>

                    <button onClick={() => setIsOpenAddModal(false)}>
                    </button>
                </div>

                <h2>Agregar Venta</h2>

                <form onSubmit={(event) => handleSubmit(event)}>

                    <div className="sales-form--field">
                        <label htmlFor="">Producto</label>
                        <select className="sales-status-select" required name="product_id" onChange={(e) => handleChangeProduct(e)}  >
                            <option value="">Seleccione un Producto</option>
                            {
                                products.map(product=>{
                                    return (
                                        <option value={product.product_id} >{product.product_id} - {product.description} - {product.unit_price} </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="sales-form--field">
                        <label htmlFor="">Precio Unitario</label>
                        <input type="number" name="unit_price" value = {gUnitPrice} required readOnly />
                    </div>
                    <div className="sales-form--field">
                        <label htmlFor="">Cantidad Producto</label>
                        <input type="number" name="quantity"  min="1" required onChange={(e) => handleChangeQuantity(e)} />
                    </div>
                    <div className="sales-form--field">
                        <label htmlFor="">Total Venta</label>
                        <input type="number" name="total" value = {gTotal} required readOnly />
                    </div>
                    <div className="sales-form--field">
                        <label htmlFor="">Fecha Venta</label>
                        <input type="date" name="sales_date" required onChange={(e) => handleChange(e)} />
                    </div>
                    <div className="sales-form--field">
                        <label htmlFor="">ID Cliente</label>
                        <input type="number" name="client_id" required onChange={(e) => handleChange(e)}/>
                    </div>
                    <div className="sales-form--field">
                        <label htmlFor="">Nombre Cliente</label>
                        <input type="text" name="client_name" required onChange={(e) => handleChange(e)}/>
                    </div>
                    <div className="sales-form--field">
                        <label htmlFor="">Vendedor</label>
                        <select className="sales-status-select" required name="seller_id" onChange={(e) => handleChange(e)} >
                            <option value="">Seleccione un vendedor</option>
                            {
                                users.map(user =>{
                                    if(user.status == "Autorizado"){
                                        return (
                                            <option value={user.employee_id}>{user.name}</option>
                                            )
                                    }
                                })
                            }
                        </select>
                    </div>
                    <div className="sales-form--field">
                        <label htmlFor="">Estado Venta</label>                    
                        <select className="sales-status-select" name="sales_status" required onChange={(e) => handleChange(e)}>
                            <option value="">Seleccionar Estado:</option>
                            <option value="En Proceso">En Proceso </option>
                            <option value="Entregada">Entregada </option>
                            <option value="Cancelada">Cancelada </option>
                        </select> 
                    </div>

                    <div className="sales-buttons--container">
                        <button type="button" className="button__delete" onClick={() => setIsOpenAddModal(false)}>Cancelar</button>
                        <button type="submit" className="button__save" >Aceptar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SalesModalAdd;