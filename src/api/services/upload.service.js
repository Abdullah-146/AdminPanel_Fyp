import axios from "../axios";
import { errorHandler } from "./erroHanlder";

const getAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
//   return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDNlNWYwNTA5MGEwY2VlMzg4NzQ5OTciLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE2ODQ2ODU0NTR9.cT5rCgW_QOv88jw50gEPQBjoOAS7ABUOsJDkoJ4TvEQ";
};


export const uploadImage = async data => {
    try{
        let config = {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                'content-type': 'multipart/form-data'
            },
        };

        const resp = await axios.post(
            "/upload/image",
            data,
            config
        );
        return resp.data;

    }catch(err){
        let error = errorHandler(err);
        throw error;
    }
}