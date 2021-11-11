import React from 'react';
import VALOR from './UserConstants';

const UserRolBadge = ({ rol }) => {
  const getRolClassName = () => {
    let rowClassName;
    switch (rol) {
      case VALOR.ROLES.ADMIN:
        rowClassName = 'user-rol-admin';
        break;
      case VALOR.ROLES.VENDEDOR:
        rowClassName = 'user-rol-vendedor';
        break;
      case VALOR.ROLES.NINGUNO:
      default:
        rowClassName = 'user-rol-ninguno';
        break;
    }
    return rowClassName;
  };

  return (
    <>
      <td>
        <span className={getRolClassName()}>{rol}</span>
      </td>
    </>
  );
};

export default UserRolBadge;
