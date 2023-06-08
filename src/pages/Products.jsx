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
  const [loading, setLoading] = useState(false);
  const [resNext, setResNext] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  //=========================================================================================

  React.useEffect(() => {
    const callApi = async () => {
      const response = await getProducts({ limit: 20 });
      setProducts(response.data);
      setData(response.data.slice(0, 10));
      setHasNextPage(response.hasNextPage);
      setResNext(response.hasNextPage);
      setLoading(false);
    };
    if (!loading) {
      setLoading(true);
      callApi();
    }
  }, []);

  //===================================================================================================
  // Handling All Functionalities of Pagination for unFiltered Data

  const handleNext = async () => {
    try {
      if (hasNextPage) {
        let index = products.findIndex(
          (product) => product._id === data[data.length - 1]._id
        );
        if (products[index + 1]) {
          let res = products.slice(index + 1, index + 11);
          if (
            res[res.length - 1]._id === products[products.length - 1]._id &&
            !resNext
          ) {
            setHasNextPage(false);
          }
          setData([...res]);
          setHasPreviousPage(true);
        } else {
          setLoading(true);
          let res = await getProducts({
            filter: search !== "" ? {} : {},
            cursor: products[products.length - 1]._id,
            limit: 10,
          });
          setProducts([...products, ...res.data]);
          setHasNextPage(res.hasNextPage);
          setResNext(res.hasNextPage);
          setHasPreviousPage(true);
          setData([...res.data]);
          setLoading(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePrevious = async () => {
    const index = products.findIndex((user) => user._id === data[0]._id);
    if (index === -1) {
      return;
    }
    const res = products.slice(index - 10, index);
    setData([...res]);
    setHasNextPage(true);
    if (index - 10 === 0) {
      setHasPreviousPage(false);
    }
  };

  //===================================================================================================
  // Handling All Functionalities of Search and Load More for Search

  //handleLoadMore loads more data when user yped in less words and wanting to see data in the table
  const handleLoadMore = async () => {
    try {
      if (resNext) {
        setLoading(true);
        let res = await getProducts({
          cursor: products[products.length - 1]._id,
          limit: 10,
        });
        setProducts([...products, ...res.data]);
        setResNext(res.hasNextPage);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (search) => {
    return products.filter(
      (product) =>
        product?.title.toLowerCase().includes(search.toLowerCase()) ||
        product?.price.toString().includes(search.toLowerCase()) ||
        product?._id.toLowerCase().includes(search.toLowerCase())
    );
  };

  //Search Display is the data that is displayed on the table when search is not empty
  const searchDisplay = handleSearch(search);

  /*Use Effect for Search thata runs when searchDisplay changes and 
  loads more data if searchDisplay is less than 20 until 
  resNext is false or length of searchDisplay is 20*/
  React.useEffect(() => {
    const callApi = async () => {
      const response = await getProducts({
        cursor: products[products.length - 1]._id,
      });
      setProducts([...products, ...response.data]);
      setResNext(response.hasNextPage);
      setLoading(false);
    };
    if (!loading && resNext && search !== "" && searchDisplay.length < 20) {
      setLoading(true);
      callApi();
    }
  }, [searchDisplay]);

  //===================================================================================================

  //=========================================================================================

  const handleClick = async (action, id) => {
    if (action === "edit") {
      navigate(`/editProduct/${id}`);
    } else if (action === "delete") {
      try {
        const response = await deleteProduct(id);
        if (response.status === "OK") {
          toast.success(response.data.msg);
          setProducts(products.filter((product) => product._id !== id));
          setData(data.filter((product) => product._id !== id));
        }
      } catch (err) {
        console.log(err);
      }
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
            padding: 5,
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
        loading={loading}
        data={search === "" ? data : searchDisplay}
        search={search !== "" ? true : false}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        loadMore={resNext}
        handleLoadMore={handleLoadMore}
        handleClick={handleClick}
      />
    </Layout>
  );
}

export default Products;
