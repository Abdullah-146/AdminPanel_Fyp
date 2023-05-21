import axios from "../axios";
import { errorHandler } from "./erroHanlder";

const getAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
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

//TODO: update order status API to be written on Backend
export const updateOrderStatus = async ({ orderId, ...data }) => {
  try {
  } catch (err) {
    let error = errorHandler(err);
    return error;
  }
};
