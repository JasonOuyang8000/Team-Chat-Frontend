import axios from 'axios';
import moment from 'moment';


export const verifyUser = async(link) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/${link}`)
        
        return response;
    }
    catch (error) {
       console.log(error);
       return false;
    }
}


export const userAuth = {
    headers: {
      authorization: 'Bearer ' + localStorage.getItem('usertoken')
    }
};

export const workAuth = {
    headers: {
        authorization: 'Bearer ' + localStorage.getItem('usertoken'),
        wstoken: localStorage.getItem('wstoken')
    }
};

export const convertToTimestamp = (date) => {
    return moment(date).unix(); 
}

// export const loginUser = async (formParams) => {
//     try {
//         const response = await axios.post(`${process.env.REACT_APP_URL}/user/login`,formParams);

        
//         return response;
//     }
//     catch (error) {
//        console.log(error);
//        return false;
//     }
// }