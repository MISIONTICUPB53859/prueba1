const VALOR = {
  API: process.env.REACT_APP_SERVER_URL + '/api/users',
  ESTADO: {
    AUTORIZADO: 'Autorizado',
    NO_AUTORIZADO: 'No autorizado',
    PENDIENTE: 'Pendiente',
  },
  ROLES: {
    NINGUNO: '-',
    ADMIN: 'Administrador',
    VENDEDOR: 'Vendedor',
  },
};

export default VALOR;
