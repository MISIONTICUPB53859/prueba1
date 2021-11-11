import React, { useContext, useState } from 'react';
import '../../components/Modals/ProductsModal.css';
import { SkynetContext } from '../../context/SkynetContext';
import VALOR from '../../pages/Users/UserConstants';
import '../../pages/Users/Users.css';
import { editUser } from '../../pages/Users/UserServices';
import ModalHeader from './ModalHeader';
import { useAuth0 } from "@auth0/auth0-react";


const UserModalEdit = ({ userData, reloadFunct, toast, setDeleteData }) => {
  const { isOpenEditModal, setIsOpenEditModal, setIsOpenDeleteModal } =
    useContext(SkynetContext);
  const [rol, setRol] = useState(userData.rol);
  const [status, setStatus] = useState(userData.status);

  //Autorización de acceso por token
  const { getAccessTokenSilently } = useAuth0();

  const onError = (e) => {
    console.log(`Error en el update de users con id: ${userData._id}`, e);
    toast(`Se presento un error al editar el usuario ${userData.employee_id}`, {
      className: "user-error-toast",
      progressClassName: "user-progress-bar",
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const onEdit = async () => {
  const token = await getAccessTokenSilently();

    const user = {
      employee_id: userData.employee_id,
      name: userData.name,
      rol: rol,
      status: status,
    };
    await editUser(userData._id, user, token)
      .then(() =>
        toast("Usuario Editado", {
          className: "user-success-toast",
          progressClassName: "user-progress-bar",
          position: toast.POSITION.TOP_CENTER,
        })
      )
      .then(async () => await reloadFunct())
      .catch((e) => onError(e));
    setIsOpenEditModal(false);
  };

  const onDelete = () => {
    setDeleteData(userData);
    setIsOpenEditModal(false);
    setIsOpenDeleteModal(true);
  };

  if (!isOpenEditModal) return null;

  return (
    <div>
      <div className="overlay"></div>
      <div className="modal">
        <ModalHeader setIsOpen={setIsOpenEditModal} />

        <h2>Editar Usuario</h2>

        <form>
          <div className="form--field">
            <label htmlFor="">ID</label>
            <input type="text" value={userData.employee_id} />
          </div>

          <div className="form--field">
            <label htmlFor="">Nombre</label>
            <input
              type="text"
              value={userData.name}
            />
          </div>

          <div className="form--field">
            <label htmlFor="">Rol</label>
            <select value={rol} onChange={(e) => setRol(e.target.value)}>
              {Object.entries(VALOR.ROLES).map((option) => (
                <option value={option[1]}>{option[1]}</option>
              ))}
            </select>
          </div>

          <div className="form--field">
            <label htmlFor="">Estado</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              {Object.entries(VALOR.ESTADO).map((option) => (
                <option value={option[1]}>{option[1]}</option>
              ))}
            </select>
          </div>

          <div className="buttons--container">
            <button type="button" className="button__delete" onClick={onDelete}>
              Eliminar
            </button>
            <button type="button" className="button__save" onClick={onEdit}>
              Aceptar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModalEdit;
