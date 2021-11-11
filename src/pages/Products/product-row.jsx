import React from "react";
import PrivateComponent from "../../components/PrivateComponent";

const ProductRow = ({
  productData,
  setIsOpenEditModal,
  FillModalEditProductDB,
}) => {
  return (
    <tr className="table-row" key={productData._id}>
      <td>{productData.product_id}</td>
      <td>{productData.description}</td>
      <td>{productData.unit_price}</td>
      <td>{productData.product_status}</td>
      <td>
        <PrivateComponent roleList={["Administrador", "Vendedor"]} statusList={["Autorizado"]}>
          <button
            className="button-p"
            type="button"
            onClick={() => {
              setIsOpenEditModal(true);
              FillModalEditProductDB(productData._id);
            }}
          >
            Editar
          </button>
        </PrivateComponent>
      </td>
    </tr>
  );
};

export default ProductRow;
