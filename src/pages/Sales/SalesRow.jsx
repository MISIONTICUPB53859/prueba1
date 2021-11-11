import StatusSale from "./StatusSale";
import React, { useState } from "react";


const SalesRow = (props) => {

    const [state, setState] = useState(true);

    const salesRowBtnClick = () => {
        setState(!state);
    }

    const getFormatDate = (date) => {
        date = new Date(date);
        return date.toISOString().split('T')[0]
    }

    const getSellerData = () => {
        //return props?.element?.sellerData?[0]?.name || '';
        return (
          (props.element &&
            props.element.sellerData &&
            props.element.sellerData[0] &&
            props.element.sellerData[0].name) ||
          ''
        );
    };


    return (
        <>
            <tr className="sales-tr-btn">
                <td>
                    <span>ID Venta: {props.element.sales_id}</span> | 
                    <span>Total Venta: {props.element.total}</span>&nbsp;
                    <button onClick={salesRowBtnClick}>{state?'↓':'↑'}</button>
                </td>
            </tr>    
            
                <tr className={state?'sale-description sales-tr-hide':'sale-description sales-tr-show'}>
                    <td data-label="ID Venta">{props.element.sales_id}</td>
                    <td data-label="Total Venta">{props.element.total}</td>
                    <td data-label="ID Producto">{props.element.product_id}</td>
                    <td data-label="Cantidad Producto">{props.element.quantity}</td>
                    <td data-label="Precio Unitario">{props.element.unit_price}</td>
                    <td data-label="Fecha Venta">{getFormatDate(props.element.sales_date)}</td>
                    <td data-label="Identificación Cliente">{props.element.client_id}</td>
                    <td data-label="Nombre Cliente">{props.element.client_name}</td>

                    {props.element.sellerData.length > 0 &&
                        <td data-label="Vendedor">{props.element.sellerData[0].name}</td>
                    }
                    {props.element.sellerData.length <= 0 &&
                        <td data-label="Vendedor"></td>
                    }

                    <StatusSale status={props.element.sales_status}/>
                    <td data-label="Acciones"  className="sales-actions">
                        <button className="sales-edit-button" onClick={(() => props.openEditModal(props.element))}><a href="#">Editar</a></button>
                    </td>
                </tr>
            
        </>
    )
}

export default SalesRow;