import axios from "../axios";
import { errorHandler } from "./erroHanlder";

const getAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
};

export const getCategories = async () => {
  try {
    let config = {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };

    const resp = await axios.get("/admin/categories", config);
    return resp.data;
  } catch (err) {
    let error = errorHandler(err);
    throw error;
  }
};

export const getCategoryById = async (categoryId) => {
  try {
    let config = {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };

    const resp = await axios.post(
      `/admin/categories/category`,
      { categoryId },
      config
    );
    return resp.data;
  } catch (err) {
    let error = errorHandler(err);
    throw error;
  }
};

export const createCategory = async (category) => {
  try {
    let config = {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };

    const resp = await axios.post(
      "/admin/categories",
      {
        ...category,
      },
      config
    );
    return resp.data;
  } catch (err) {
    let error = errorHandler(err);
    throw error;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    let config = {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };

    const resp = await axios.delete(
      "/admin/categories/category",{
      config,
      data:{
        categoryId,
      },}
    );
    return resp.data;
  } catch (err) {
    let error = errorHandler(err);
    throw error;
  }
};
