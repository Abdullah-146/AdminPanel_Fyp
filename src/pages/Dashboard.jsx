import React, { useEffect } from "react";
import style from "../assets/css/dashboard.module.css";
import Layout from "../Layout/Layout";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { Data } from "../utils/Chartdata";
import { BarChart } from "../component/BarChart";
import LineChart from "../component/LineChart";
import { saleData } from "../utils/Saledata";
import { getOrders } from "../api/services/order.service";
import Table2 from "../component/Table2";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { socket } from "../App";
Chart.register(CategoryScale);

var sound = new Audio("/sounds/notification.wav");

function Dashboard() {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [resNext, setResNext] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  //===================================================================================================
  // Socket IO
  useEffect(() => {
    socket.on("disconnect", () => {
      console.log("Connected: ", socket.connected); // false
    });

    socket.on("connect_error", (err) => {
      console.log(err instanceof Error); // true
      console.log(err.message); // not authorized
      console.log(err.data); // { content: "Please retry later" }
    });

    socket.on("order", (data) => {
      toast.success("An order has been placed");
      sound.play();
      console.log(data);
    });
  }, [socket]);

  //===================================================================================================

  React.useEffect(() => {
    const callApi = async () => {
      const response = await getOrders({ limit: 20 });
      setOrders(response.data);
      setData(response.data.slice(0, 10));
      setHasNextPage(response.hasNextPage);
      setResNext(response.hasNextPage);
      setLoading(false);
    };
    if (!loading) {
      setLoading(true);
      callApi();
    }
  }, []);

  //===================================================================================================
  // Handling All Functionalities of Pagination for unFiltered Data

  const handleNext = async () => {
    try {
      if (hasNextPage) {
        let index = orders.findIndex(
          (user) => user._id === data[data.length - 1]._id
        );
        if (orders[index + 1]) {
          let res = orders.slice(index + 1, index + 11);
          if (
            res[res.length - 1]._id === orders[orders.length - 1]._id &&
            !resNext
          ) {
            setHasNextPage(false);
          }
          setData([...res]);
          setHasPreviousPage(true);
        } else {
          setLoading(true);
          let res = await getOrders({
            filter: search !== "" ? {} : {},
            cursor: orders[orders.length - 1]._id,
            limit: 10,
          });
          setOrders([...orders, ...res.data]);
          setHasNextPage(res.hasNextPage);
          setResNext(res.hasNextPage);
          setHasPreviousPage(true);
          setData([...res.data]);
          setLoading(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePrevious = async () => {
    const index = orders.findIndex((user) => user._id === data[0]._id);
    if (index === -1) {
      return;
    }
    const res = orders.slice(index - 10, index);
    setData([...res]);
    setHasNextPage(true);
    if (index - 10 === 0) {
      setHasPreviousPage(false);
    }
  };

  //===================================================================================================
  // Handling All Functionalities of Search and Load More for Search

  //handleLoadMore loads more data when user yped in less words and wanting to see data in the table
  const handleLoadMore = async () => {
    try {
      if (resNext) {
        setLoading(true);
        let res = await getOrders({
          cursor: orders[orders.length - 1]._id,
          limit: 10,
        });
        setOrders([...orders, ...res.data]);
        setResNext(res.hasNextPage);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (search) => {
    return orders.filter(
      (order) =>
        order?.userId?.name.toLowerCase().includes(search.toLowerCase()) ||
        order?.status === search ||
        order?.total.toString().includes(search.toLowerCase()) ||
        order._id.toLowerCase().includes(search.toLowerCase())
    );
  };

  //Search Display is the data that is displayed on the table when search is not empty
  const searchDisplay = handleSearch(search);

  /*Use Effect for Search thata runs when searchDisplay changes and 
  loads more data if searchDisplay is less than 20 until 
  resNext is false or length of searchDisplay is 20*/
  React.useEffect(() => {
    const callApi = async () => {
      const response = await getOrders({
        cursor: orders[orders.length - 1]._id,
      });
      setOrders([...orders, ...response.data]);
      setResNext(response.hasNextPage);
      setLoading(false);
    };
    if (!loading && resNext && search !== "" && searchDisplay.length < 20) {
      setLoading(true);
      callApi();
    }
  }, [searchDisplay]);

  //===================================================================================================

  const handleCreateOrder = () => {
    navigate("/order");
  };

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
          Orders
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Orders"
          ></input>
          <button onClick={handleCreateOrder} className={style.button}>
            Create Order
          </button>
        </div>
      </div>
      <Table2
        loading={loading}
        data={search === "" ? data : searchDisplay}
        search={search !== "" ? true : false}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        loadMore={resNext}
        handleLoadMore={handleLoadMore}
      />
    </Layout>
  );
}

export default Dashboard;
