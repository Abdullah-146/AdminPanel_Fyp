import axios from "../axios";
import { errorHandler } from "./erroHanlder";

const getAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
};


export const sendNotificationToAll = async (message) => {

    try{

        let config = {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            },
        }

        const response = await axios.post('/notification/send', {message}, config);
        return response.data;


    }catch(err){
        let error = errorHandler(err);
        return error;
    }

};