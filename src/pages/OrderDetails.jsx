import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import style from "../assets/css/users.module.css";
import { useParams } from "react-router-dom";
import { getOrderById } from "../api/services/order.service";

function OrderDetails() {
  const { id } = useParams();

  const [search, setSearch] = useState("");
  const [details, setDetails] = useState({}); //[{}

  //////////////////////////////////////
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await getOrderById(id);
        console.log(response);
        setDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, []);
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
                  {key === "Avatar" ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        minHeight: 100,
                      }}
                    >
                      {key === "products" || key === "contributors" ? null : (
                        <p>{key}</p>
                      )}
                      <p>{key}</p>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {key === "products" ||
                      key === "contributors" ||
                      key === "billingInfo" ? null : key === "userId" ? (
                        <p>Placed By</p>
                      ) : (
                        <p>{key}</p>
                      )}
                    </div>
                  )}
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
                    minHeight: key === "Avatar" ? 121 : 0,
                    maxHeight: key === "Avatar" ? 121 : null,
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {key === "userId" ? (
                      <p>{details[key].name}</p>
                    ) : key === "products" ||
                      key === "contributors" ||
                      key === "billingInfo" ? null : key === "shared" ? (
                      <p>{details[key] ? "Yes" : "No"}</p>
                    ) : key === "paid" ? (
                      <p>{details[key] ? "Yes" : "No"}</p>
                    ) : (
                      <p>{details[key]}</p>
                    )}
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
