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



let socket;
export const initiateSocket = (room) => {

 
  console.log(`Connecting socket...`);
  if (socket && room) socket.emit('join', room);
}
export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if(socket) socket.disconnect();
}
export const subscribeToChat = (cb) => {
  if (!socket) return(true);
  socket.on('chat', msg => {
    console.log('Websocket event received!');
    return cb(null, msg);
  });
}
export const sendMessage = (room, message) => {
  if (socket) socket.emit('chat', { message, room });
}
