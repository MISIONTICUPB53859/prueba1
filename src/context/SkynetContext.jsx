import React, { createContext, useState, useEffect } from "react";
import { useCookies } from 'react-cookie';

export const SkynetContext = createContext();

const SkynetContextProvider = (props) => {
  const [actualSection, setActualSection] = useState("Inicio");

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [user, setUserState] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);


  const setUser = (newUser) => {
    setCookie('user', newUser);
    setUserState(cookies.user)
  }

  const getUser = () => {
    if(cookies.user){
      return cookies.user
    }
    return false
  }

  const logoutF = () => {
    removeCookie('user');
      setUserState(null);
  }


  const toogleDropdown = () =>
    isDropdownOpen ? setIsDropdownOpen(false) : setIsDropdownOpen(true);

  const closeDropdown = () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if(cookies.user){
      setUserState(cookies.user)
    }
  })

  return (
    <SkynetContext.Provider
      value={{
        actualSection,
        setActualSection,
        isOpenAddModal,
        setIsOpenAddModal,
        isOpenEditModal,
        setIsOpenEditModal,
        isOpenDeleteModal,
        setIsOpenDeleteModal,
        isDropdownOpen,
        closeDropdown,
        toogleDropdown,
        user,
        setUser,
        getUser,
        logoutF,
      }}
    >
      {props.children}
    </SkynetContext.Provider>
  );
};

export default SkynetContextProvider;
