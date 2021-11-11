import React, { useContext } from "react";
import ReactDom from "react-dom";
import './ModalDelete.css'
import { SkynetContext } from "../../context/SkynetContext";
import logo from '../../assets/icons/logo2 1.svg'

const ModalDelete = ({ children, p_id, idBD, deleteProduct }) => {

    const { isOpenDeleteModal, setIsOpenDeleteModal } = useContext(SkynetContext);

    if (!isOpenDeleteModal) return null

    return ReactDom.createPortal(
        <div>
            <div className="overlay"></div>
            <div className="modal-delete">
                <div className="modal--header">
                    <div className="modal--header__logo">
                        <img src={logo} alt="logo de Skynet" />
                        <h4>Skynet Store</h4>
                    </div>

                    <button onClick={() => setIsOpenDeleteModal(false)}>
                    </button>
                </div>

                <h2>¿Está Seguro de eliminar {children} {p_id}?</h2>

                <form >
                    <div className="buttons--container">
                        <button type="button" className="button__delete" onClick={() => setIsOpenDeleteModal(false)}>Cancelar</button>
                        <button type="button" className="button__save" onClick={() => 
                            { 
                            deleteProduct(idBD)
                            setIsOpenDeleteModal(false)}
                            }>Aceptar</button>
                    </div>
                </form>
            </div>
        </div>,
        document.getElementById('portal')
    )
}


export default ModalDelete;