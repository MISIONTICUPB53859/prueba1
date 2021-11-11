const url = process.env.REACT_APP_SERVER_URL + '/api';


const getAll = async (token) => {

    return await fetch(url + '/sales', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => res.json())
    .then((data) => {
        return data;
      });
  };

  const create = async ( sale, token) => {

    return await fetch(url + '/sales', {
        method: "POST",
        body: JSON.stringify(sale),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      .then(async res=> {
        return {
          code: res.ok,
          message: await res.json()
        }
       
      });
     
        
  };

  const update = async (id, sale, token) => {

    return await fetch(url + '/sales/' + id, {
        method: "PUT",
        body: JSON.stringify(sale),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      .then(async res=> {
        return {
          code: res.ok,
          message: await res.json()
        }
       
      });     
        
  };

  const drop = async (id, token) => {

    return await fetch(url + '/sales/' + id, {
        method: "delete",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      .then(async res=> {
        return {
          code: res.ok,
          message: await res.json()
        }
       
      });     
        
  };


  export default  {
      getAll,
      create,
      update,
      drop
  }

