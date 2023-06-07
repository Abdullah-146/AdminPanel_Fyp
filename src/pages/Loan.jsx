import React, { useState } from "react";
import Layout from "../Layout/Layout";
import style from "../assets/css/users.module.css";
import data from "../utils/Userdata";
import { loanRequests } from "../api/services/loan.service";
function Loan() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  React.useEffect(() => {
    const callApi = async () => {
      try {
        const res = await loanRequests("Approved");
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    callApi();
  }, []);

  return (
    <Layout>
      <input
        type="search"
        id="input"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Loan Takers"
      ></input>
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.Name.toLowerCase().includes(search.toLowerCase());
            })
            .map((item) => {
              return (
                <tr>
                  <td scope="row">{item.user.name}</td>
                  <td>{item.user.email}</td>
                  <td>{item.amount}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Layout>
  );
}

export default Loan;
