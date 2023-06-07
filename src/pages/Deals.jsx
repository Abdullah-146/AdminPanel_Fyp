import React, { useState } from "react";
import Layout from "../Layout/Layout.jsx";
import style from "../assets/css/users.module.css";
import data from "../utils/Userdata.js";
import Table from "../component/Table.jsx";
import { getUsers } from "../api/services/user.service.js";
import DealTable from "../component/DealTable.jsx";
import { deleteDeal, getDeals } from "../api/services/deal.service.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Deals() {
  const [search, setSearch] = useState("");
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const callApi = async () => {
      const response = await getDeals({});
      setDeals(response.data);
      setLoading(false);
    };
    if (!loading) {
      setLoading(true);
      callApi();
    }
  }, []);

  //===================================================================================================

  const handleSearch = (search) => {
    return deals.filter(
      (deal) =>
        deal?.title.toLowerCase().includes(search.toLowerCase()) ||
        deal?._id.toLowerCase().includes(search.toLowerCase())
    );
  };

  //Search Display is the data that is displayed on the table when search is not empty
  const searchDisplay = handleSearch(search);

  //===================================================================================================

  const handleTableClick = async (action, item) => {
    try {
      if (action === "view") {
        navigate(`/Deal/${item._id}`);
      } else if (action === "edit") {
        navigate(`/editDeal/${item._id}`);
      } else if (action === "delete") {
        const res = await deleteDeal(item._id);
        if (res.status === "OK") {
          setDeals(deals.filter((deal) => deal._id !== item._id));
          toast.success("Deal Deleted Successfully");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  //===================================================================================================

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
          Dashboard
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
            placeholder="Search Deals"
          ></input>
          <button
            onClick={() => navigate("/createdeal")}
            className={style.button}
          >
            Create Deal
          </button>
        </div>
      </div>
      <DealTable
        loading={loading}
        data={searchDisplay}
        handleClick={handleTableClick}
      />
    </Layout>
  );
}

export default Deals;
