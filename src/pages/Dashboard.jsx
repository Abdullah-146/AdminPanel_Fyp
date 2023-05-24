import React from "react";
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
Chart.register(CategoryScale);

function Dashboard() {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const callApi = async () => {
      const response = await getOrders({filter:search?{title:{$regex:search,options:'i'}}:{}});
      console.log(response.data);
      setOrders(response.data);
    };
    callApi();
  }, [search]);


  const handleCreateOrder = () => {
    navigate("/order");
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
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Orders"
          ></input>
          <button onClick={handleCreateOrder} className={style.button}>Create Order</button>
        </div>
      </div>
      <Table2 data={orders} />
    </Layout>
  // const [chartData, setChartData] = useState({
  //   labels: Data.map((data) => data.year),
  //   datasets: [
  //     {
  //       label: "Users Gained ",
  //       data: Data.map((data) => data.userGain),
  //       backgroundColor: [
  //         "rgba(75,192,192,1)",
  //         "#50AF95",
  //         "#f3ba2f",
  //         "#2a71d0",
  //       ],
  //       borderColor: "black",
  //       borderWidth: 2,
  //     },
  //   ],
  // });
  // return (
  //   <Layout>
  //     <article>
  //       <section>
  //         <header>Total Sales</header>
  //         <div className={style.inlineChart}>
  //           <div className={style.info}>
  //             <div className={style.value}>$36,146</div>
  //             <div className={style.title}>Credit sales</div>
  //           </div>
  //         </div>
  //         <div className={style.inlineChart}>
  //           <div className={style.info}>
  //             <div className={style.value}>$24,734</div>
  //             <div className={style.title}>Channel Sales</div>
  //           </div>
  //         </div>
  //         <div className={style.inlineChart}>
  //           <div className={style.info}>
  //             <div className={style.value}>$15,650</div>
  //             <div className={style.title}>Direct Sales</div>
  //           </div>
  //         </div>
  //       </section>

  //       <section>
  //         <div className={style.chart}>
  //           {/* <PieChart chartData={chartData} /> */}
  //           <BarChart chartData={chartData} />
  //           <LineChart chartData={chartData} />
  //         </div>
  //       </section>
  //       <section>
  //         <table>
  //           <thead>
  //             <tr>
  //               <th>November Sales</th>
  //               <th>Quantity</th>
  //               <th>Total</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {saleData.map((item) => {
  //               return (
  //                 <tr>
  //                   <td>{item.product}</td>
  //                   <td>{item.quantity}</td>
  //                   <td>{item.sale}</td>
  //                 </tr>
  //               );
  //             })}
  //           </tbody>
  //         </table>
  //       </section>
  //     </article>
  //   </Layout>
  );
}

export default Dashboard;
