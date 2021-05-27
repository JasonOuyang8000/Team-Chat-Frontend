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



export const isUser = (users,id) => {
    for (let i = 0; i < users.length; i++) {
       if (users[i].id === id) return true;
    }

    return false;
}

export const bgSwitch = (config) => {
  if (config.workspace.owner.id === config.user.id) {
      return 'Owner';
  }
  
  if (isUser(config.workspace.users, config.user.id)) {
      return 'User';
  }

  if (config.workspace.protected) {
      return 'Protected';
  }
  else {
      return 'Free'
  }
}


export const passPage = (arr,page) => {
    const items = 9 * page;

    
    if (items > arr.length) {
        return arr.slice(items,arr.length); //Remaining
    }

    return arr.slice(items - 9, items );
  


}