import React from 'react';
import PrivateComponent from '../../components/PrivateComponent';
import VALOR from './UserConstants';
import UserRolBadge from './UserRolBadge';

const UserRow = ({ userData, setIsOpenEditModal, setEditData }) => {
  const getAvatar = () => {
    let avatar;
    switch (userData.rol) {
      case VALOR.ROLES.ADMIN:
        avatar = 'admin';
        break;
      case VALOR.ROLES.VENDEDOR:
        avatar = 'sales';
        break;
      case VALOR.ROLES.NINGUNO:
      default:
        avatar = 'no-role';
        break;
    }
    return avatar;
  };

  return (
    <tr className="user-table-row">
      <td>{userData.employee_id}</td>
      <td>
        <img
          width="50px"
          src={`assets/images/${getAvatar()}.png`}
          className="avatar"
          alt="Avatar"
        />
      </td>
      <td>{userData.name}</td>
      <td>{userData.status}</td>
      <UserRolBadge rol={userData.rol} />
      <td>
        <PrivateComponent roleList={["Administrador"]} statusList={["Autorizado"]}>

          <button
            className="user-button-p"
            type="button"
            onClick={() => {
              setEditData(userData);
              setIsOpenEditModal(true);
            }}
          >
            Editar
          </button>
        </PrivateComponent>
      </td>
    </tr>
  );
};

export default UserRow;
