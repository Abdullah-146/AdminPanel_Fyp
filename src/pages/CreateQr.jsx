import React, { useState } from "react";
import QRCode from "qrcode.react";
import Layout from "../Layout/Layout";
import TableBarIcon from "@mui/icons-material/TableBar";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import { Link } from "react-router-dom";
import "../assets/css/login.css";
import Table from "../component/Table";

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
          <div>
            <p
              style={{
                color: "#64748B",
                fontSize: 24,
                fontFamily: "Nunito Sans",
              }}
            >
              Tables
            </p>
            <div
              style={{
                display: "flex",
                backgroundColor: "#334155",
                borderRadius: 20,
                padding: "5px 8px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TableBarIcon />
              <input
                type="text"
                value={tableNumber}
                onChange={handleTableNumberChange}
                placeholder="Table Label"
                style={{
                  backgroundColor: "#334155",
                  borderRadius: "12px",
                  color: "#fff",
                  padding: "5px  8px",
                  border: "none",
                  outline: "none",
                }}
                placeholderTextColor="#94A3B8"
              />
            </div>
            <div
              style={{
                display: "flex",
                backgroundColor: "#334155",
                borderRadius: 20,
                padding: "5px 8px",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <ImportContactsIcon />
              <input
                type="text"
                value={tableNumber}
                onChange={handleTableNumberChange}
                placeholder="Table Number"
                style={{
                  backgroundColor: "#334155",
                  borderRadius: "12px",
                  color: "#fff",
                  padding: "5px  8px",
                  border: "none",
                  outline: "none",
                }}
                placeholderTextColor="#94A3B8"
              />
            </div>
          </div>
          <button
            style={{
              background: "#0EA5E9",
              padding: "8px 16px",
              color: "#0F172A",
              height: 40,
              borderRadius: 12,
              cursor: "pointer",
            }}
            onClick={handleGenerateQR}
          >
            Create Table
          </button>
        </div>
        {/* 
        <div>
          <QRCode value={qrData} />
        </div> */}
        <div style={{ marginTop: 20 }}>
          <Table />
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
    // alignItems: "center",
    // justifyContent: "center",
    height: "100vh",
    backgroundColor: "#1e293b",
    padding: "20px 40px",
  },
  alignSelf: {
    display: "flex",
    justifyContent: "space-between",
  },
};
