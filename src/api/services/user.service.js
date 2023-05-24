import axios from "../axios";
import { errorHandler } from "./erroHanlder";

const getAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
  // return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDNlNWYwNTA5MGEwY2VlMzg4NzQ5OTciLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE2ODQ2ODU0NTR9.cT5rCgW_QOv88jw50gEPQBjoOAS7ABUOsJDkoJ4TvEQ"
};

export const getUsers = async (body) => {
  try {
    let config = {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };
    const resp = await axios.post("/admin/users", {...body}, config);
    return resp.data;
  } catch (err) {
    let error = errorHandler(err);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    let config = {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };

    const resp = await axios.post(
      `/admin/users/user`,
      {
        userId: id,
      },
      config
    );

    return resp.data;
  } catch (err) {
    let error = errorHandler(err);
    return error;
  }
};

export const deleteUser = async (id) => {
  try {
    let config = {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };

    const resp = await axios.delete(
      `/admin/users/user`,
      {
        userId: id,
      },
      config
    );
    return resp.data;
  } catch (err) {
    let error = errorHandler(err);
    return error;
  }
};
