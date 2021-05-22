import axios from 'axios';


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