import React from 'react';
import logo from '../../assets/icons/logo2 1.svg';
import '../../components/Modals/ProductsModal.css';

// podria servir para simplificar una porcion de codigo e imports, en los
// modales incluido su respectiva parte en los css que se encuentra duplicada
// en el estilo del modal de delete y el general
const ModalHeader = ({ setIsOpen }) => {
  return (
    <div className="modal--header">
      <div className="modal--header__logo">
        <img src={logo} alt="logo de Skynet" />
        <h4>Skynet Store</h4>
      </div>

      <button onClick={() => setIsOpen(false)}></button>
    </div>
  );
};

export default ModalHeader;
