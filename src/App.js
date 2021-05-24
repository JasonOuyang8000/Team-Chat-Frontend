import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { UserContext } from './context/UserContext';

import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Loading from './pages/Loading';


import Error from './components/Error';
import axios from 'axios';
import { userAuth, workAuth } from './helpers';
import LayoutOne from './components/LayoutOne';
import { socket, SocketContext } from './context/SocketContext';
function App() {
  const [user,setUser] = useState(null);
  const [workspace,setWorkSpace] = useState(null);
  const [loaded,setLoaded] = useState(true);
  const [error, setError] = useState('');

  const verify = async() => {

    try {
      if (localStorage.getItem('usertoken') && localStorage.getItem('wstoken')) {
        setLoaded(false);
        const response = await axios.get(`${process.env.REACT_APP_URL}/workspace/verify`,workAuth)
     
        setLoaded(true);
        setUser(response.data.user);
        setWorkSpace(response.data.workspace);
    
      }
  
      else if (localStorage.getItem('usertoken')) {
        setLoaded(false);
  
        const response = await axios.get(`${process.env.REACT_APP_URL}/user/verify`, userAuth);
        setUser(response.data.user);
        setLoaded(true);
      }
    }
  
    catch(error) {
      setLoaded(true);
      localStorage.clearItem('usertoken');
      localStorage.clearItem('wstoken');
      if (error.response) {
        setError(error.response.data.message);
      }

    else {
        setError(error.message);
     }
    }
  }


  const userState = {
    user: [user,setUser],
    workspace: [workspace,setWorkSpace],
    loading : [loaded,setLoaded],
    error: [error, setError], 
    verify
  }

  
  useEffect(() => {
    verify();



    return () => {
       
      if(socket) socket.disconnect()
    };
  }, [])

 

  return (
    <SocketContext.Provider value={socket}>
    <UserContext.Provider value={{userState}}>
      {error !== '' && <Error error={error} setError={setError} /> }
      {
        loaded ? 
        <Home/>
        :
        
        <LayoutOne 
        styleName="layout-1"
        style={{
        backgroundColor:'#f9f9f9',
        backgroundImage: 'linear-gradient(0deg, #f9f9f9 0%, #B5FFFC 100%)'
        }}>
        <Loading />
        </LayoutOne>
      }
    </UserContext.Provider>
    </SocketContext.Provider>
  
  );
}

export default App;
