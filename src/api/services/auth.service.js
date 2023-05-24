import axios from '../axios';
import { errorHandler } from './erroHanlder';


export const login = async ({email, password}) => {
    try{

        const res = await axios.post('/auth/login', {email, password});
        return res.data;

    }catch(err){
        let error = errorHandler(err);
        return error;
    }
}


