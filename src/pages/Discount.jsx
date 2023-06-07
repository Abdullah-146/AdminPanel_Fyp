import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import style from "../assets/css/users.module.css";
import {
  createCategory,
  deleteCategory,
  getCategories,
} from "../api/services/category.service";
import { uploadImage } from "../api/services/upload.service";
import { toast } from "react-toastify";
import CategoryTable from "../component/CategoryTable";
import ManualOrderTable from "../component/ManualOrderTable";
import {
  getProductsList,
  updateDiscount,
} from "../api/services/product.service";
import DiscountTable from "../component/DiscountTable";

function Discount() {
  const [edit, setEdit] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState([]);
  const [discount, setDiscount] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [selected, setSelected] = React.useState({});

  useEffect(() => {
    const callApi = async () => {
      try {
        const res = await getProductsList();
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    callApi();
  }, []);

  const handleSubmit = async () => {
    try {
      let res = null;
      if(selected?._id){
        res = await updateDiscount({
          productId: selected._id,
          discount: discount,
        });
      }else{
        toast.error("Please Select a Product");
      }

      if (res) {
        if (res.status === "OK") {
          toast.success("Discount Modified Successfully");
          setData(
            data.map((item) => {
              if (item._id === selected._id) {
                return {
                  ...item,
                  discount: discount,
                };
              }
              return item;
            })
          );
          setSelected({});
          setDiscount(0);
          setTotal(0);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleTableClick = async (action, item) => {
    if (action === "edit") {
      setSelected(item);
      setDiscount(item.discount || 0);
      setTotal(item.price || 0);
    } else if (action === "delete") {
      try {
        let res = await updateDiscount({ productId: item._id });
        if (res) {
          if (res.status === "OK") {
            toast.success("Discount Removed Successfully");
            setData(
              data.map((item2) => {
                if (item2._id === item._id) {
                  return {
                    ...item2,
                    discount: res.data.discount,
                  };
                }
                return item2;
              })
            );
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSearch = (search) => {
    if (search === "") {
      return data;
    } else {
      return data.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.category.includes(search.toLowerCase()) ||
          item.price.toString().includes(search.toLowerCase())
      );
    }
  };

  const displayProducts = handleSearch(search);

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginBottom: 20,
          padding: 20,
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
          Discount
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            // alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap-reverse",
            marginTop: 30,
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                // flex: 1,
                gap: 10,
              }}
            >
              <p style={{ width: 100 }}>Id: </p>
              <p>{selected._id}</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                // flex: 1,
                gap: 10,
              }}
            >
              <p style={{ width: 100 }}>Title: </p>
              <p>{selected.title}</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                // flex: 1,
                gap: 10,
              }}
            >
              <p style={{ width: 100 }}>Discount: </p>
              <input
                style={{
                  margin: 0,
                  maxWidth: "30%",
                  padding: 10,
                  backgroundColor: "#0F172A",
                  outline: "none",
                  border: "none",
                  color: "white",
                  borderRadius: "5px",
                }}
                disabled={!selected?._id}
                min={0}
                max={100}
                type="number"
                id="input"
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="Discount"
                value={discount}
              ></input>
              <p>%</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                // flex: 1,
                gap: 10,
              }}
            >
              <p style={{ width: 100 }}>Price: </p>
              <p>{total}</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                // flex: 1,
                gap: 10,
              }}
            >
              <p style={{ width: 100 }}>Total: </p>
              <p>{total - (total * (discount ? discount : 0)) / 100}</p>
            </div>
            <div
              style={{
                marginRight: 18,
                // flex: 1,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              {selected?._id && <>
                <button onClick={handleSubmit}>Discount</button>
                <button onClick={()=>{
                  setSelected({});
                  setDiscount(0);
                  setTotal(0);
                }}>Cancel</button>

              </>}
            </div>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <input
                style={{ margin: 0, maxWidth: "70%", padding: 10 }}
                type="search"
                id="input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Products"
              ></input>
            </div>
            <DiscountTable
              selected={selected}
              data={displayProducts}
              handleClick={handleTableClick}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Discount;
