# Pasos para agregar nuevos modales

1. Clonar uno de los modales, por ejemplo ProductsModalAdd.
2. Modificar los campos del return del componente para que cuadren con los campos deseados.
3. En el componente donde se va a lanzar el modal hacer lo siguiente:
  - import React, { useContext } from "react";
  - import { SkynetContext } from '../../context/SkynetContext' -> (cuidado ruta relativa)
  - const { isOpenAddModal, setIsOpenAddModal, isOpenEditModal, setIsOpenEditModal } = useContext(SkynetContext); -> dentro de la función, antes del return(), revisar las funciones y varibales necesarias para cada modal en cada caso.

4. En el botón desde donde se quiera lanzar el modal hacer un onClick(() => {setIsOpenAddModal(true)})   

# Aclaraciones importantes !!!

1. La lógica más compleja o donde el código se pone más rudo es en el modal de edit, porque hay que pasarle las props de lo que se quiere ver en los inputs, estas props deben guardarse en estados para despues con el evento onChange ser modificadas en tiempo real por el usuario. (Soy conciente que esto suena tenaz, pero es una cagada que tienen los formularios de react, si conocen una mejor forma de hacerlo es bienvenida, igual no se compliquen con eso ya la lógica está escrita solo deben reemplazar los valores).

2. El modal delete si es posible hacerlo generico, no deben clonarlo, solo llamarlo dentro del mismo componente donde lanzan el modal edit y dentro pasarle el children, por ejemplo:
<ModalDelete> el producto </ModalDelete>, el children en este caso sería las palabras que están dentro de los tags, ya está construido eso para que el mensaje que se muestre sea "Está seguro de borrar el producto?"