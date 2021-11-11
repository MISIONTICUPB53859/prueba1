import React from "react";
 

const StatusSale = (props) => {
    return (
        <>
            {
                props.status === 'Cancelada' ?
                (<td data-label="Estado Venta" className="sales-status">{props.status}<span className="sales-status-cancelled"></span></td>): ('')
            }
            {
                props.status === 'En Proceso' ?
                (<td data-label="Estado Venta" className="sales-status">{props.status}<span className="sales-status-inProcess"></span></td>): ('')
            }
            {
                props.status === 'Entregada' ?
                (<td data-label="Estado Venta" className="sales-status">{props.status}<span className="sales-status-delivered"></span></td>): ('')
            }      
        </>
    )
  }

export default StatusSale;