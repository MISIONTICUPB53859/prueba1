const url = process.env.REACT_APP_SERVER_URL +'/api';

const getAll = async (token) => {

    return await fetch(url + '/products', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    .then((res) => res.json())
    .then((data) => {
        return data;
      });
  };


  export default  {
      getAll,
  }

