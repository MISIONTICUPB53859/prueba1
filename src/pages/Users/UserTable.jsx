import React from 'react';
import { Flip, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalDelete from '../../components/Modals/ModalDelete';
import UserModalEdit from '../../components/Modals/UserModalEdit';
import { SkynetContext } from '../../context/SkynetContext';
import UserRow from './UserRow';
import './Users.css';
import { deleteUser, getUsers, getUserData } from './UserServices';
import { useAuth0 } from "@auth0/auth0-react";
import PrivateComponent from '../../components/PrivateComponent';




const UserTable = () => {
  const { setIsOpenEditModal, isOpenEditModal, isOpenDeleteModal } =
    React.useContext(SkynetContext);
  const [searchItem, setSearchItem] = React.useState("");
  const [editData, setEditData] = React.useState();
  const [deleteData, setDeleteData] = React.useState();
  const [data, setData] = React.useState([]);

  //Autorización de acceso por token
  const { getAccessTokenSilently } = useAuth0();

  const onError = (e, msg) => {
    console.log(msg, e);
    toast(msg, {
      className: "user-error-toast",
      progressClassName: "user-progress-bar",
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const initData = async () => {
    const token = await getAccessTokenSilently();
    const users = await getUsers(token).catch((e) =>
      onError(e, "Se presento un error al cargar los datos de usuarios")
    );
    users && setData(users);

  };



  React.useEffect(() => {
    void initData(); 
  }, []);

  const deleteUserAndRefresh = async (idDB, id) => {
    const token = await getAccessTokenSilently();
    await deleteUser(idDB, token)
      .then(() =>
        toast("Usuario Eliminado", {
          className: "user-success-toast",
          progressClassName: "user-progress-bar",
          position: toast.POSITION.TOP_CENTER,
        })
      )
      .then(async () => await initData())
      .catch((e) =>
        onError(e, `Se presento un error al eliminar el usuario: ${id}`)
      );
  };

  return (
    <section className="user-table-container">
      <ToastContainer
        draggable={false}
        transition={Flip}
        autoClose={2000}
        closeButton={false}
      />
      <div className="user-add-search-container">
        <input
          className="user-search-i"
          type="search"
          id="search-i"
          placeholder="Buscar..."
          onChange={(event) => setSearchItem(event.target.value)}
        />
      </div>
      {isOpenEditModal && (
        <UserModalEdit
          userData={editData}
          reloadFunct={initData}
          toast={toast}
          setDeleteData={setDeleteData}
        />
      )}
      {isOpenDeleteModal && deleteData && (
        <ModalDelete
          idBD={deleteData._id}
          p_id={deleteData.employee_id}
          deleteProduct={deleteUserAndRefresh}
        >
          el usuario
        </ModalDelete>
      )}
      <table className="user-table-p">
        <thead>
          <tr className="user-table-header">
            <th>ID</th>
            <th>Avatar</th>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Rol</th>
            <PrivateComponent roleList={["Administrador"]} statusList={["Autorizado"]}>
              <th>Acciones</th>
            </PrivateComponent>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((user) => {
              if (
                searchItem === "" ||
                String(user.employee_id)
                  .toLowerCase()
                  .includes(searchItem.toLowerCase()) ||
                user.name.toLowerCase().includes(searchItem.toLowerCase()) ||
                user.status.toLowerCase().includes(searchItem.toLowerCase()) ||
                user.rol.toLowerCase().includes(searchItem.toLowerCase())
              ) {
                return user;
              }
              return undefined;
            })
            .map((user) => {
              return (
                <UserRow
                  key={user._id}
                  userData={user}
                  setIsOpenEditModal={setIsOpenEditModal}
                  setEditData={setEditData}
                />
              );
            })}
        </tbody>
      </table>
    </section>
  );
};

export default UserTable;
