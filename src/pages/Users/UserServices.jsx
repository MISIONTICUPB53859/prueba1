import VALOR from './UserConstants';




const getUsers = async (token) => {
 
  

  const data = await fetch(VALOR.API,{
    headers: {
      Authorization: `Bearer ${token}`
    }}).then((res) => res.json());
  console.log('getUsers', data);
  return data;
};

const getUserById = async (id) => {
  const data = await fetch(`${VALOR.API}/${id}`).then((res) => res.json());
  console.log('getUsers', data);
  return data;
};

const getUserByEmail = async (email, token) => {
  const response = await fetch(`${VALOR.API}/${email}`, {
    method: 'GET',
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
  const data = await response.json()
  return data;
  
};

const getUserData = async (succesCallback, errorCallback, token) => {
  await fetch(`${VALOR.API}/self`, {
    method: 'GET',
    headers:{
      Authorization: `Bearer ${token}`
    }
  }).then((res)=> res.json())
    .catch(errorCallback)
  
}

const addUser = async (userData) => {
  await fetch(VALOR.API, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
};

const editUser = async (id, userData, token) => {
  await fetch(`${VALOR.API}/${id}`, {
    method: "PUT",
    body: JSON.stringify(userData),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

const deleteUser = async (id, token) => {
  await fetch(`${VALOR.API}/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export { getUsers, getUserById, addUser, editUser, deleteUser, getUserData, getUserByEmail };
