import React, { useContext } from "react";
import ReactDom from "react-dom";
import './ProductsModal.css'
import logo from '../../assets/icons/logo2 1.svg'
import { SkynetContext } from "../../context/SkynetContext";

//las funciones handleChange y addProduct se agregan como props o argumentos del modal, pero se definen
//en el componente padre product_table, para actualizar, desde allí, la tabla de productos.
const ModalAdd = ({ field1, field2, field3, field4, handleChange, addProduct }) => {



    const { setIsOpenAddModal, isOpenAddModal } = useContext(SkynetContext);
  

    if (!isOpenAddModal) return null

    return ReactDom.createPortal(
      <div>
        <div className="overlay"></div>
        <div className="modal">
          <div className="modal--header">
            <div className="modal--header__logo">
              <img src={logo} alt="logo de Skynet" />
              <h4>Skynet Store</h4>
            </div>

            <button onClick={() => setIsOpenAddModal(false)}></button>
          </div>
          <h2>Agregar Producto</h2>
          {/*  field3="Valor Unitario"
          field4="Estado" */}
          <form >
            <div className="form--field">
              <label htmlFor="">{field1}</label>
              <input
                type="text"
                name="product_id"
              
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form--field">
              <label htmlFor="">{field2}</label>
              <input
                type="text"
                name="description"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form--field">
              <label htmlFor="">{field3}</label>
              <input
                type="text"
                name="unit_price"
              
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form--field">
              <label htmlFor="">{field4}</label>
              <input
                type="text"
                name="product_status"
              
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="buttons--container">
              <button
                type="button"
                className="button__delete"
                onClick={() => setIsOpenAddModal(false)}
              >
                Cancelar
              </button>
              <button onClick={(e)=>addProduct(e)} className="button__save">
                Aceptar
              </button>
            </div>
          </form>
        </div>
      </div>,
      document.getElementById("portal")
    );
}

export default ModalAdd;