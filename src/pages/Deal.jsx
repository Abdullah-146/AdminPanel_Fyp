import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import style from "../assets/css/users.module.css";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../api/services/category.service";
import { uploadImage } from "../api/services/upload.service";
import { toast } from "react-toastify";
import { getDealById } from "../api/services/deal.service";
import { useNavigate, useParams } from "react-router";
import ImagePlaceHolder from "../assets/ImagePlaceHolder.png";

function Deal() {
  const navigate = useNavigate();
  const [data, setData] = React.useState({});
  const [image, setImage] = React.useState(null);
  const {dealId} = useParams();


  useEffect(() => {
    const callApi = async () => {
      try {
        const res = await getDealById(dealId);
        console.log(res.data);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    callApi();
  }, []);

  const dateTimeFormatter = (date) => {
    const d = new Date(date);
    return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
  }
  

  const handleEdit =  () => {
    navigate(`/editDeal/${data._id}`);
  }

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
          Deal
        </p>
        
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
                flex: 1,
                gap: 10,
              }}
            >
              <p style={{ width: 100 }}>Image: </p>
              <img src={data.image || ImagePlaceHolder} alt="" style={{ width: 300, height: 300 }} />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
                gap: 10,
              }}
            >
              <p style={{ width: 100 }}>Title: </p>
             <p>{data.title}</p>
              
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flex: 1,
                gap: 10,
              }}
            >
              <p style={{ width: 100 }}>Description: </p>
              <p>{data.description}</p>
              
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flex: 1,
                gap: 10,
              }}
            >
              <p style={{ width: 100 }}>Products: </p>
              <div style={{display:"flex",flexDirection:"column",flex:1,maxWidth:"50%",rowGap:20}}>
                {
                  data.products?.map((item) => 
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <div style={{display:"flex",alignItems:"center",gap:40}}>
                        <img src={item.product.image || ImagePlaceHolder} alt="" style={{ width: 50, height: 50 }} />
                        <p>{item.product.title}</p>
                      </div>
                      <div>
                        <p>{item.product.price} x {item.quantity}</p>
                      </div>
                    </div>
                  )
                }
              </div>

              
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flex: 1,
                gap: 10,
              }}
            >
              <p style={{ width: 100 }}>Total Price: </p>
              <p>{data.price}</p>
              
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flex: 1,
                gap: 10,
              }}
            >
              <p style={{ width: 100 }}>Status: </p>
              <p>{data.status}</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flex: 1,
                gap: 10,
              }}
            >
              <p style={{ width: 100 }}>Created On: </p>
              <p>{dateTimeFormatter(data.createdAt)}</p>
            </div>


            <div
              style={{
                marginRight: 18,
                flex: 1,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              
            </div>
          </div>
        
      </div>
    </Layout>
  );
}

export default Deal;
