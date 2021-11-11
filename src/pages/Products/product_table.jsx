import React from "react";
import ModalDelete from "../../components/Modals/ModalDelete";
import { SkynetContext } from "../../context/SkynetContext";
import "./productTable.css";
import ProductRow from "./product-row";
import ProductsModalAdd from "../../components/Modals/ProductsModalAdd";
import ProductsModalEdit from "../../components/Modals/ProductsModalEdit";
import { ToastContainer, toast, Zoom, Bounce, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth0 } from "@auth0/auth0-react";


const ProductTable = () => {
  const { setIsOpenEditModal, isOpenEditModal, setIsOpenAddModal } =
  React.useContext(SkynetContext);
  const [searchItem, setSearchItem] = React.useState("");

 

// Constante para acceder al servidor
const URL = process.env.REACT_APP_SERVER_URL + '/api/products';
//Autorización de acceso por token
const { getAccessTokenSilently } = useAuth0();

//Variables de estado para almacenar los productos de la bd
 const [idDB, setIdDB] = React.useState('') /* Este es el id de mongo, no el id de producto que se ve en la GUI*/
 const [product_id, setProduct_id] = React.useState('');
 const [description, setDescription] = React.useState('');
 const [unit_price, setUnit_price] = React.useState('');
 const [product_status, setProduct_status] = React.useState('');
 const [productsDB, setProductsDB] = React.useState([])


//Para actualizar la tabla de datos y que refleje los cambios en la base de datos en mongo
React.useEffect(() => {
  fetchProducts();
}, []);

//Función para obtener los registros (documentos en mongo)
const fetchProducts = async () => {
const token = await getAccessTokenSilently();
console.log("Autorización " + token)

  await fetch(URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .then((data) => {
      setProductsDB([...data]);
      // console.log(productsDB);
    });
};

  //Función para recuperar los datos de los formularios de agregar y editar producto y guardarlos en variables de estado
let handleChange = (e) => {
  const { name, value } = e.target;
  if (name == "product_id") {
     if (value==="") {
      setProduct_id("")
    }else {
    setProduct_id(parseFloat(value));
    }
  } else if (name == "description") {
    setDescription(value);
  } else if (name == "unit_price") {
    if (value==="") {
      setUnit_price("")
    }else {
      setUnit_price(parseFloat(value));
    }
  } else if (name == "product_status") {
    setProduct_status(value);
};
}

//Función para agregar productos a la bd y renderizarlos en la tabla
let addProduct = async (e) => {
const token = await getAccessTokenSilently();
// console.log("Autorización " + token);
  await fetch(URL, {
       method: "POST",
       body: JSON.stringify({
         product_id,
         description,
         unit_price,
         product_status,
       }),
       headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
       },
     })
       .then((res) => res.json())
       .then((data) => {
         console.log("Producto agregado");
         toast("Producto Agregado", {
           className: "success-toast",
           progressClassName: "progress-bar",
           position: toast.POSITION.TOP_CENTER,
         });
         setProduct_id("");
         setDescription("");
         setUnit_price("");
         setProduct_status(0);
         fetchProducts();
       })
       .catch((err) => console.error(err));
       
      
     setIsOpenAddModal(false);
     e.preventDefault();
   };


//Función para rellenar el modal de edición con los datos en BD del producto a editar
   const FillModalEditProductDB = async (id)=>{
      const token = await getAccessTokenSilently();

      await fetch(`${URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setProduct_id(data.product_id);
          setDescription(data.description);
          setUnit_price(data.unit_price);
          setProduct_status(data.product_status);
          setIdDB(data._id);
        });
   }

   //Función para editar la base de datos una vez se editan los campos del modal de edición
   let editDB = async (e) =>{
     const token = await getAccessTokenSilently();
      // console.log(e);
    await fetch(`${URL}/${idDB}`, {
        method: "PUT",
        body: JSON.stringify({
          product_id,
          description,
          unit_price,
          product_status,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Producto editado");
          toast("Producto Editado", {
            className: "success-toast",
            progressClassName: "progress-bar",
            position: toast.POSITION.TOP_CENTER,
          });
          setIdDB("");
          setProduct_id("");
          setDescription("");
          setUnit_price("");
          setProduct_status("");
          fetchProducts();
        });

         setIsOpenEditModal(false);
         e.preventDefault();
   }

//Función para borrar producto de la base de datos
let deleteProduct = async (id) => {
     const token = await getAccessTokenSilently();

    // console.log("Eliminando producto " + product_id);
     toast("Eliminando producto " + product_id, {
       className: "success-toast",
       progressClassName: "progress-bar",
       position: toast.POSITION.TOP_CENTER,
     });
   await fetch(`${URL}/${id}`, {
     method: "DELETE",
     headers: {
       Accept: "application/json",
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`,
     },
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data);
       fetchProducts();
     });
  
};

  return (
    <>
      <section className="table-container">
        <ToastContainer
          draggable={false}
          transition={Flip}
          autoClose={2000}
          closeButton={false}
        />
        <div className="add-search-container">
          <button
            type="button"
            className="button-p"
            onClick={() => {
              setIsOpenAddModal(true);
            }}
          >
            Agregar Producto
          </button>
          <ProductsModalAdd
            addProduct={addProduct}
            handleChange={handleChange}
            field1="ID"
            field2="Descripción"
            field3="Valor Unitario"
            field4="Estado"
          ></ProductsModalAdd>
          <input
            className="search-i"
            type="search"
            id="search-i"
            placeholder="Buscar..."
            onChange={(event) => setSearchItem(event.target.value)}
          />
        </div>
        {isOpenEditModal && (
          <ProductsModalEdit
            handleChange={handleChange}
            editDB={editDB}
            p_id={product_id}
            p_des={description}
            p_up={unit_price}
            p_st={product_status}
          />
        )}
        <ModalDelete
          idBD={idDB}
          deleteProduct={deleteProduct}
          p_id={product_id}
        >
          el producto{" "}
        </ModalDelete>

        <table className="table-p">
          <thead>
            <tr className="table-header">
              <th>ID Producto</th>
              <th>Descripción</th>
              <th>Valor Unitario</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {productsDB
              .filter((product) => {
                if (searchItem === "") {
                  return product;
                } else if (
                  product.product_id.toString().includes(searchItem) ||
                  product.description
                    .toLowerCase()
                    .includes(searchItem.toLowerCase()) ||
                  product.product_status
                    .toLowerCase()
                    .includes(searchItem.toLowerCase()) ||
                  product.unit_price
                    .toString()
                    .includes(searchItem.toLowerCase())
                ) {
                  return product;
                }
              })
              .map((product) => {
                return (
                  <ProductRow
                    key={product._id}
                    productData={product}
                    setIsOpenEditModal={setIsOpenEditModal}
                    idDB={product._id}
                    FillModalEditProductDB={FillModalEditProductDB}
                  />
                );
              })}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default ProductTable;
