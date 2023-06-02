import React, { useState } from "react";
import Layout from "../Layout/Layout";
import style from "../assets/css/users.module.css";

function OrderDetails() {
  const [search, setSearch] = useState("");
  const [details, setDetails] = useState({
    Avatar: "Hello",
    Name: "",
    Phone: "",
    Address: "",
    TotalBill: "",
    PaymentMethod: "",
    OrderStatus: "",
    OrderDate: "",
    Shared: "",
    SharedUsers: "",
  }); //[{}
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginBottom: 20,
          padding: 10,
        }}
      >
        <p
          style={{
            color: "#94A3B8",
            marginBottom: 2,
            fontSize: 30,
            fontWeight: "normal",
          }}
        >
          Order Details
        </p>
        {/* Details Table In  */}
        <div
          style={{
            width: "100%",
            backgroundColor: "#1E293B",
            height: "100%",
            minHeight: "100vh",
            border: "1px solid ",
            marginTop: 20,
          }}
        >
          {/* render all keys of details */}
          {Object.keys(details).map((key) => {
            return (
              <div>
                <p>{key}</p>
                <p>{details[key]}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export default OrderDetails;
