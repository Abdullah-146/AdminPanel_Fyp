import React, { useState } from "react";
import Layout from "../Layout/Layout";
import style from "../assets/css/users.module.css";

function OrderDetails() {
  const [search, setSearch] = useState("");
  const [details, setDetails] = useState({
    Avatar: "Hello",
    Name: "Abdullah",
    Phone: "0514585774",
    Address: "B-386 lalarukh colony",
    TotalBill: "400$",
    PaymentMethod: "Wallet",
    OrderStatus: "Paid",
    OrderDate: "22-5-2021",
    Shared: "yes",
    SharedUsers: "Suleman and Rehan",
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

            border: "1px solid ",
            marginTop: 20,
            display: "flex",
            paddingBottom: 200,
          }}
        >
          {/* render all keys of details */}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {Object.keys(details).map((key) => {
              return (
                <div
                  style={{
                    display: "flex",

                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 10,
                    borderBottom: "1px solid #334155",
                    paddingRight: 300,
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <p>{key}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {Object.keys(details).map((key) => {
              return (
                <div
                  style={{
                    display: "flex",

                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 10,
                    borderBottom: "1px solid #334155",
                    width: "200%",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <p>{details[key]}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default OrderDetails;
