import React, { useContext, useState } from "react";
import ReactDom from "react-dom";
import "./ProductsModal.css";
import logo from "../../assets/icons/logo2 1.svg";

import { SkynetContext } from "../../context/SkynetContext";

const ProductModalEdit = ({
  editDB,
  handleChange,
  p_id,
  p_des,
  p_up,
  p_st
}) => {
  const { isOpenEditModal, setIsOpenEditModal, setIsOpenDeleteModal } =
    useContext(SkynetContext);

  

  if (!isOpenEditModal) return null;

  return ReactDom.createPortal(
    <div>
      <div className="overlay"></div>
      <div className="modal">
        <div className="modal--header">
          <div className="modal--header__logo">
            <img src={logo} alt="logo de Skynet" />
            <h4>Skynet Store</h4>
          </div>
          <button onClick={() => setIsOpenEditModal(false)}></button>
        </div>

        <h2>Editar Producto</h2>

        <form id="">
          <div className="form--field">
            <label htmlFor="">ID</label>
            <input
              type="text"
              name="product_id"
              value={p_id}
              onChange={(e) =>
                handleChange(e)
              }
              readonly="readonly"
            />
          </div>

          <div className="form--field">
            <label htmlFor="">Descripción</label>
            <input
              type="text"
              name="description"
              value={p_des}
              onChange={(e) =>
                handleChange(e)
              }
              required
            />
          </div>

          <div className="form--field">
            <label htmlFor="">Valor Unitario</label>
            <input
              type="text"
              name="unit_price"
              value={p_up}
              onChange={(e) =>
                handleChange(e)
              }
              required
            />
          </div>

          <div className="form--field">
            <label htmlFor="">Estado</label>
            <input
              type="text"
              name="product_status"
              value={p_st}
              onChange={(e) =>
                handleChange(e)
              }
              required
            />
          </div>

          <div className="buttons--container">
            <button
              type="button"
              className="button__delete"
              onClick={() => {
                setIsOpenEditModal(false);
                setIsOpenDeleteModal(true);
              }}
            >
              Eliminar producto
            </button>
            <button
              type="button"
              className="button__save"
              onClick={(e) => editDB(e)}
            >
              Aceptar
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default ProductModalEdit;
