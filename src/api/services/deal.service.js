import axios from "../axios";
import { errorHandler } from "./erroHanlder";

const getAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
};

export const getDeals = async ({ cursor, limit, filter }) => {
  try {
    let config = {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };

    const resp = await axios.post(
      "/admin/deals",
      { cursor, limit, filter },
      config
    );
    return resp.data;
  } catch (err) {
    let error = errorHandler(err);
    throw error;
  }
};

export const createDeal = async (deal) => {
  try {
    let config = {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };

    const resp = await axios.post("/admin/deals/create", { ...deal }, config);
    return resp.data;
  } catch (err) {
    let error = errorHandler(err);
    throw error;
  }
};

export const getDealById = async (dealId) => {
  try {
    let config = {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };

    const resp = await axios.post("/admin/deals/deal", { dealId }, config);
    return resp.data;
  } catch (err) {
    let error = errorHandler(err);
    throw error;
  }
};

export const updateDeal = async ({ dealId, ...data }) => {
  try {
    let config = {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };

    const resp = await axios.put(
      "/admin/deals/deal",
      { dealId, ...data },
      config
    );
    return resp.data;
  } catch (err) {
    let error = errorHandler(err);
    throw error;
  }
};

export const deleteDeal = async (dealId) => {
  try {
    let config = {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };

    const resp = await axios.delete("/admin/deals/deal", { dealId }, config);
    return resp.data;
  } catch (err) {
    let error = errorHandler(err);
    throw error;
  }
};
