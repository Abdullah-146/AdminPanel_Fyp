import React, { useState } from "react";
import Layout from "../Layout/Layout.jsx";
import style from "../assets/css/users.module.css";
import { getTables } from "../api/services/table.service.js";
import Table4 from "../component/Table4.jsx";
import { useNavigate } from "react-router-dom";

function Tables() {
  const [search, setSearch] = useState("");
  const [tables, setTables] = useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const callApi = async () => {
      const response = await getTables();
      console.log(response.data);
      setTables(response.data);
    };
    callApi();
  }, [search]);


  const viewTable = (id) => {

  }

  const editTable = (id) => {

  }

  const deleteTable = async(id) => {

  }

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
          Tables
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <input
            style={{ margin: 0, maxWidth: "30%", padding: 10 }}
            type="search"
            id="input"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Tables"
          ></input>
          <button onClick={()=>navigate("/CreateQr")} className={style.button}>Create Table</button>
        </div>
      </div>
      <Table4 data={tables} view={viewTable} edit={editTable} delete={deleteTable} />
    </Layout>
  );
}

export default Tables;
