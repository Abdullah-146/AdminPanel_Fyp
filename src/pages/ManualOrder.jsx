import React, { useEffect, useState } from "react";
import "../assets/css/login.css";
import { Link } from "react-router-dom";
import Layout from "../Layout/Layout";
import style from "../assets/css/users.module.css";
import ManualOrderTable from "../component/ManualOrderTable";
import BillBox from "../component/BillBox";
import { getProductsList } from "../api/services/product.service";
import { createOrder } from "../api/services/order.service";
import { toast } from "react-toastify";

let selectedProducts = [];

function ManualOrder() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const callApi = async () => {
        try{
          const res = await getProductsList();
          setProducts(res.data);
        }catch(err){
            console.log(err);
        }
    }
    callApi();
  }, []);

  const getFileteredData = (data, search) => {
    if (search === "") {
      return data;
    } else {
      let filteredData = data.filter((item) => {
        return item.title.toLowerCase().includes(search.toLowerCase());
      });
      return filteredData;
    }
  }

  const data = getFileteredData(products, search);

  const [calculation, setCalculation] = useState({
    price: 0,
    deliveryCharge: 0,
    discount: 0,
  });

  const findIndexOfObjectsId = (arr, obj) => {
    
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].product === obj._id) {
        return i;
      }
    }
    return -1;
  };

  const handleClick = (item) => {
    let index = findIndexOfObjectsId(selectedProducts, item);
    if (index === -1) {
      selectedProducts.push({
        productType: "Product",
        product: item._id,
        quantity: 1,
      });
      setCalculation({
        price: calculation.price + item.price,
        deliveryCharge: calculation.deliveryCharge + 0,
        discount: calculation.discount + item.discount,
      });
    }
    else{
      let quantity = selectedProducts[index].quantity;
      selectedProducts.splice(index, 1);
      setCalculation({
        price: calculation.price - (item.price * quantity),
        deliveryCharge: calculation.deliveryCharge + 0,
        discount: calculation.discount - (item.discount * quantity),
      });
    }
  };

  const handleQuantity = (item, action) => {
    let index = findIndexOfObjectsId(selectedProducts, item);
    if (index !== -1) {
      if (action === "plus") {
        selectedProducts[index].quantity++;
        setCalculation({
          price: calculation.price + item.price,
          deliveryCharge: calculation.deliveryCharge + 0,
          discount: calculation.discount + item.discount,
        });
      } else if (action === "minus") {
        if (selectedProducts[index].quantity > 1) {
          selectedProducts[index].quantity--;
          setCalculation({
            price: calculation.price - item.price,
            deliveryCharge: calculation.deliveryCharge + 0,
            discount: calculation.discount - item.discount,
          });
        }
      }
    }
  };

  const handleOrder = async() => {
    try{

      let data = {
        products: selectedProducts,
        subTotal: calculation.price,
        deliveryCharge: calculation.deliveryCharge,
        discount: ( calculation.discount ? calculation.discount : 0),
        total: calculation.price + calculation.deliveryCharge - (calculation.discount ? calculation.discount : 0),
      }
  
      const res  = await createOrder(data);
      if(res.status === "OK"){
        toast.success("Order Created Successfully");

        // Resetting the state
        setCalculation({
          price: 0,
          deliveryCharge: 0,
          discount: 0,
        });
        selectedProducts = [];
      }
      
      else{
        toast.error("Something Went Wrong");
      }

    }catch(err){
      console.log(err);
    }
    
    
  };

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
          Manual Order
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
          }}
        >
          <input
            style={{ margin: 0, maxWidth: "30%", padding: 10 }}
            type="search"
            id="input"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Products"
          ></input>
        </div>
      </div>
      <ManualOrderTable
        data={data}
        handleClick={handleClick}
        handleQuantity={handleQuantity}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 30,
        }}
      >
        <BillBox
          price={calculation.price}
          discount={calculation.discount}
          deliveryCharge={calculation.deliveryCharge}
          handleOrder={handleOrder}
        />
      </div>
    </Layout>
  );
}

export default ManualOrder;
// <div className="login-box">

{
  /* <h2>Manual Order</h2>
      <form>
        <div className="user-box">
          <input type="text" name required />
          <label>Product Name</label>
        </div>

        <div className="user-box">
          <input type="text" name />
          <label>Other Product (optional)</label>
        </div>

        <div className="user-box">
          <input type="text" name />
          <label>Other Product (optional)</label>
        </div>
        <div className="user-box">
          <input type="number" name required />
          <label>Total Price</label>
        </div>
        <Link to={"/"}>
          <span />
          <span />
          <span />
          <span />
          Confirm Order
        </Link>
      </form> */
}
// </div>
