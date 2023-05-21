import React, { useState } from "react";
import QRCode from "qrcode.react";
import Layout from "../Layout/Layout";

const QRGenerator = () => {
  const [tableNumber, setTableNumber] = useState("");
  const [info, setInfo] = useState("");
  const [qrData, setQRData] = useState("");

  const handleTableNumberChange = (e) => {
    setTableNumber(e.target.value);
  };

  const handleInfoChange = (e) => {
    setInfo(e.target.value);
  };

  const handleGenerateQR = () => {
    const qrString = `${tableNumber} - ${info}`;
    setQRData(qrString);
  };

  return (
    <Layout>
      <div style={styles.container}>
        <div style={styles.alignSelf}>
          <p
            style={{
              color: "#64748B",
              fontSize: 24,
              fontFamily: "Nunito Sans",
            }}
          >
            {" "}
            Tables{" "}
          </p>
          <div>
            <label>Table Number:</label>
            <input
              type="text"
              value={tableNumber}
              onChange={handleTableNumberChange}
            />
          </div>
          <div>
            <label>Info:</label>
            <input type="text" value={info} onChange={handleInfoChange} />
          </div>
        </div>
        <button onClick={handleGenerateQR}>Create QR</button>
        <div>
          <QRCode value={qrData} />
        </div>
      </div>
    </Layout>
  );
};

export default QRGenerator;

///create style sheet css

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // justifyContent: "center",
    height: "100vh",
    backgroundColor: "#1e293b",
  },
  alignSelf: {
    alignSelf: "start",
  },
};
