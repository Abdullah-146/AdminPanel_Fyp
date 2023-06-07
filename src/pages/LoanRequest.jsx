import React from "react";
import Layout from "../Layout/Layout";
import style from "../assets/css/loanrequest.module.css";
import data from "../utils/Userdata";
import "../assets/css/loanrequest.module.css";
import { Link } from "react-router-dom";
import { loanRequests, updateLoanRequest } from "../api/services/loan.service";
import { toast } from "react-toastify";
function LoanRequest() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const callApi = async () => {
      try {
        const res = await loanRequests("Pending");
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    callApi();
  }, []);

  const handleUpdate = async (id, status) => {
    try {
      console.log(id, status);
      const res = await updateLoanRequest(id, status);
      if (res.status === "OK") {
        toast.success("Loan Request Updated Successfully");
        setData(data.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <table>
        <caption>Loan Requests</caption>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr>
                <td scope="row">{item.user.name}</td>
                <td>{item.user.email}</td>
                <td>{item.amount}</td>
                <button
                  onClick={() => handleUpdate(item._id, "Rejected")}
                  className={style.btn_cancel}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdate(item._id, "Approved")}
                  className={style.btn_ok}
                >
                  Accept
                </button>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Layout>
  );
}

export default LoanRequest;
