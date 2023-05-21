import axios from "../axios";
import { errorHandler } from "./erroHanlder";

const getAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
};

export const getTables = async () => {
    try {
        let config = {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
        };
    
        const resp = await axios.get("/admin/tables", config);
        return resp.data;
    } catch (err) {
        let error = errorHandler(err);
        throw error;
    }
}


export const createTable = async (table) => {
    try{

        let config = {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            },
        };

        const resp = await axios.post(
            "/admin/tables",
            {
                ...table,
            },
            config
        );
        return resp.data;


    }catch(err){
        let error = errorHandler(err);
        throw error;
    }
}

export const getTableById = async (tableId) => {
    try{
        let config = {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            },
        };

        const resp = await axios.post(
            `/admin/tables/table`,
            { tableId },
            config
        );
        return resp.data;
    }catch(err){
        let error = errorHandler(err);
        throw error;
    }
}

export const updateTable = async ({tableId,...data}) => {
    try{
        let config = {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            },
        };

        const resp = await axios.put(
            `/admin/tables/table`,
            { tableId,...data },
            config
        );
        return resp.data;
    }catch(err){
        let error = errorHandler(err);
        throw error;
    }
}

export const deleteTable = async (tableId) => {
    try{
        let config = {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            },
        };

        const resp = await axios.delete(
            `/admin/tables/table`,
            { tableId },
            config
        );
        return resp.data;
    }catch(err){
        let error = errorHandler(err);
        throw error;
    }
}

