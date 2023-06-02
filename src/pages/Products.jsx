import React, { useState } from "react";
import Layout from "../Layout/Layout.jsx";
import style from "../assets/css/users.module.css";
import { deleteProduct, getProducts } from "../api/services/product.service.js";
import Table3 from "../component/Table3.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Products() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const callApi = async () => {
      const response = await getProducts({
        filter: search ? { title: { $regex: search, options: "i" } } : {},
      });
      console.log(response.data);
      setProducts(response.data);
    };
    callApi();
  }, [search]);

  //=========================================================================================
  const viewProduct = (id) => {
    navigate(`/product/${id}`);
  };

  const editProduct = (id) => {
    navigate(`/product/${id}`);
  };

  const deleteProductF = async (id) => {
    try {
      const response = await deleteProduct(id);
      if (response.status === "OK") {
        toast.success(response.data.msg);
        setProducts(products.filter((product) => product._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateProduct = () => {
    navigate("/create-product");
  };

  //===================================================================================================

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginBottom: 20,
        }}
      >
        <p
          style={{
            color: "white",
            marginBottom: 2,
            fontSize: 30,
            fontWeight: "normal",
          }}
        >
          Products
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <input
            style={{ margin: 0, maxWidth: "30%", padding: 10 }}
            type="search"
            id="input"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Products"
          ></input>
          <button onClick={handleCreateProduct} className={style.button}>
            Create Product
          </button>
        </div>
      </div>
      <Table3
        data={products}
        view={viewProduct}
        edit={editProduct}
        delete={deleteProductF}
      />
      {/* <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Created</th>
            <th scope="col">Status</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.Name.toLowerCase().includes(search);
            })
            .map((item) => {
              return (
                <tr>
                  <td scope="row">{item.Name}</td>
                  <td>{item.Created}</td>
                  <td>{item.Status}</td>
                  <td>{item.Email}</td>
                </tr>
              );
            })}
        </tbody>
      </table> */}
    </Layout>
  );
}

export default Products;
