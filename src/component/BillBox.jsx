import React, { useEffect } from "react";
import BackOrderSvg from "./BackOrderSvg";

function BillBox(props) {
  const handleOrder = () => {
    console.log("Ad");
    props.handleOrder();
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        maxWidth: "70%",
        position: "relative",
        // border: "1px solid red",
        borderRadius: 10,
        paddingTop: 40,
        paddingBottom: 40,
        backgroundColor: "#1e1e1ec8",
      }}
    >
      {/* //TODO: Fix this svg */}
      <BackOrderSvg
        style={{ position: "absolute", bottom: 0, right: 0, width: "100%" }}
      />
      <div style={{ padding: 20 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: 10,
          }}
        >
          <p style={{ fontWeight: "bold", color: "white" }}>Sub-Total</p>
          <p style={{ color: "white" }}>Rs. {props.price || 0}</p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: 10,
          }}
        >
          <p style={{ fontWeight: "bold", color: "white" }}>Delivery Charge</p>
          <p style={{ color: "white" }}>Rs. {props.deliveryCharge || 0}</p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: 10,
          }}
        >
          <p style={{ fontWeight: "bold", color: "white" }}>Disocunt</p>
          <p style={{ color: "white" }}>Rs. {props.discount || 0}</p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: 10,
            marginTop: 40,
          }}
        >
          <p style={{ fontWeight: "bold", color: "white", fontSize: 20 }}>
            Total
          </p>
          <p style={{ color: "white", fontSize: 20 }}>
            Rs. {props.price + props.deliveryCharge - (props.discount ? props.discount : 0) || 0}
          </p>
        </div>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: 15,
              borderRadius: 5,
              boxShadow: "0px 4px 4px 0px #00000040",
              cursor: "pointer",
              zIndex: 1,
            }}
            onClick={handleOrder}
          >
            <p style={{ color: "black", fontSize: 17 }}>Place Order</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillBox;
