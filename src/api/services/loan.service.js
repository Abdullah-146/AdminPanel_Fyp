import axios from "../axios";
import { errorHandler } from "./erroHanlder";

const getAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
};

export const loanRequests = async (status=null) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };

    const resp = await axios.get(`/admin/loanRequests${status?'?status='+status : ''}`, config);
    return resp.data;
  } catch (err) {
    let error = errorHandler(err);
    return error;
  }
};

export const updateLoanRequest = async (loanId, status) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };

    console.log(loanId, status);
    const resp = await axios.put(
      "/admin/loanRequests/loanRequest",
      { loanId, status },
      config
    );
    return resp.data;
  } catch (err) {
    let error = errorHandler(err);
    return error;
  }
};
