import React from "react";
import Layout from "../Layout/Layout";
import SelectSearch from "react-select-search";
import { getProductsList } from "../api/services/product.service";
import style from "../assets/css/users.module.css";
import DealProductTable from "../component/DealProductTable";
import { createDeal } from "../api/services/deal.service";
import { uploadImage } from "../api/services/upload.service";
import { toast } from "react-toastify";

function CreateDeal() {
  const [options, setOptions] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [selectedProducts, setSelectedProducts] = React.useState([]);
  const [data, setData] = React.useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  const [calculation, setCalculation] = React.useState({
    price: 0,
    deliveryCharge: 0,
    discount: 0,
  });

  React.useEffect(() => {
    const callApi = async () => {
      try {
        const res = await getProductsList();
        setOptions(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    callApi();
  }, []);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async() => {
    try{

        let imageUrl = null;
        if(data.image){
            const formData = new FormData();
            formData.append("file", data.image);
            const fileData = await uploadImage(formData);
            imageUrl = fileData.data.url;
        }

    
        const res = await createDeal({...data,image:imageUrl,products:selectedProducts});
        if(res.status === "OK"){
            toast.success("Deal Created Successfully");
            setData({
                title: "",
                description: "",
                price: "",
                image: "",
              });
              setSelectedProducts([]);
              setCalculation({
                price: 0,
                deliveryCharge: 0,
                discount: 0,
              });
        }

    }catch(err){
        console.log(err);
    }
    
  };

  const findIndexOfObjectsId = (arr, obj) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].product.toString() === obj._id.toString()) {
        return i;
      }
    }
    return -1;
  };

  const handleClick = (item) => {
    let index = findIndexOfObjectsId(selectedProducts, item);
    console.log(index);
    if (index === -1) {
      setSelectedProducts([
        ...selectedProducts,
        {
          product: item._id,
          quantity: 1,
        },
      ]);
      setCalculation({
        price: calculation.price + item.price,
        deliveryCharge: calculation.deliveryCharge + 0,
        discount: calculation.discount + item.discount,
      });
    } else {
      let quantity = selectedProducts[index].quantity;
      let temp = selectedProducts.splice(index, 1);
      setSelectedProducts([...temp]);
      setCalculation({
        price: calculation.price - item.price * quantity,
        deliveryCharge: calculation.deliveryCharge + 0,
        discount: calculation.discount - item.discount * quantity,
      });
    }
  };

  const handleQuantity = (item, action) => {
    let index = findIndexOfObjectsId(selectedProducts, item);
    if (index !== -1) {
      if (action === "plus") {
        // selectedProducts[index].quantity++;
        setSelectedProducts(
          selectedProducts.map((product) => {
            if (product.product === item._id) {
              return {
                ...product,
                quantity: product.quantity + 1,
              };
            }
            return product;
          })
        );
        setCalculation({
          price: calculation.price + item.price,
          deliveryCharge: calculation.deliveryCharge + 0,
          discount: calculation.discount + item.discount,
        });
      } else if (action === "minus") {
        if (selectedProducts[index].quantity > 1) {
          //   selectedProducts[index].quantity--;
          setSelectedProducts(
            selectedProducts.map((product) => {
              if (product.product === item._id) {
                return {
                  ...product,
                  quantity: product.quantity - 1,
                };
              }
              return product;
            })
          );

          setCalculation({
            price: calculation.price - item.price,
            deliveryCharge: calculation.deliveryCharge + 0,
            discount: calculation.discount - item.discount,
          });
        }
      }
    }
  };

  const handleSearch = (search) => {
    if (search === "") {
      return options;
    } else {
      return options.filter(
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
          flexDirection: "row",
          width: "100%",
          marginBottom: 20,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
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
              Create Deal
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p style={{ width: 100, fontSize: 24 }}>Products: </p>
            <input type="search" style={{
                width: 500,
                height: 40,
                
            }} placeholder="Search Products" onChange={(e) => setSearch(e.target.value)} />
            <DealProductTable
              selected={selectedProducts}
              data={displayProducts}
              handleClick={handleClick}
              handleQuantity={handleQuantity}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <p style={{ width: 100 }}>Title: </p>
            <input
              value={data.title}
              onChange={handleChange}
              style={{
                width: 500,
                height: 40,
                borderRadius: 5,
                border: "none",
                padding: 10,
                outline: "none",
                backgroundColor: "#1F1F1F",
              }}
              name="title"
              type="text"
              placeholder="Enter Title"
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <p style={{ width: 100 }}>Image: </p>
            <input
              onChange={(e) => setData({ ...data, image: e.target.files[0] })}
              type="file"
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <p style={{ width: 100 }}>Description: </p>
            <textarea
              style={{
                maxWidth: 500,
                minWidth: 500,
                height: 100,
                borderRadius: 5,
                border: "none",
                padding: 10,
                outline: "none",
                backgroundColor: "#1F1F1F",
              }}
              value={data.description}
              name="description"
              onChange={handleChange}
              type="text"
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <p style={{ width: 100 }}>Price: </p>
            <input
              style={{
                width: 500,
                height: 40,
                borderRadius: 5,
                border: "none",
                padding: 10,
                outline: "none",
                backgroundColor: "#1F1F1F",
              }}
              value={data.price}
              name="price"
              onChange={handleChange}
              type="number"
              min={1}
              placeholder="Enter Price"
            />
          </div>

          <button
            onClick={handleCreate}
            style={{ width: 100, marginTop: 20 }}
            className="button"
          >
            Create
          </button>
        </div>
        
      </div>
    </Layout>
  );
}

export default CreateDeal;
