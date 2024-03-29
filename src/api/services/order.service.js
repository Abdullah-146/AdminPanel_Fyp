import axios from "../axios";
import { errorHandler } from "./erroHanlder";

const getAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
  // return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDNlNWYwNTA5MGEwY2VlMzg4NzQ5OTciLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE2ODQ2ODU0NTR9.cT5rCgW_QOv88jw50gEPQBjoOAS7ABUOsJDkoJ4TvEQ"
};

export const createOrder = async (data) => {
  try {
    let config = {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };

    const resp = await axios.post("/admin/orders/create", data, config);
    return resp.data;
  } catch (err) {
    let error = errorHandler(err);
    return error;
  }
};

export const getOrders = async ({ cursor, limit, filter }) => {
  try {
    let config = {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };

    const resp = await axios.post(
      "/admin/orders",
      {
        cursor,
        limit,
        filter,
      },
      config
    );
    return resp.data;
  } catch (err) {
    let error = errorHandler(err);
    return error;
  }
};
//Todo : get order by id API to be written on Backend
export const getOrderById = async (orderId) => {
  try {
    let config = {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };

    const resp = await axios.post(`/admin/orders/order`, { orderId }, config);
    return resp.data;
  } catch (err) {
    let error = errorHandler(err);
    return error;
  }
};

export const updateOrderStatus = async ({ orderId, status }) => {
  try {
    let config = {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
    const res = await axios.put("/admin/orders/order/status", { orderId, status}, config);
    return res.data;
    
  } catch (err) {
    let error = errorHandler(err);
    return error;
  }
};
