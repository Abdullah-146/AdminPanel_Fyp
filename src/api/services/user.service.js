import axios from "../axios";
import { errorHandler } from "./erroHanlder";

const getAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
};

export const getUsers = async () => {
  try {
    let config = {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };
    const resp = await axios.post("/admin/users", {}, config);
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
