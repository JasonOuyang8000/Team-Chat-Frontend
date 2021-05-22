import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { UserContext } from './context/UserContext';

import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Loading from './pages/Loading';

import { verifyUser } from './helpers';
import Error from './components/Error';

function App() {
  const [user,setUser] = useState(null);
  const [workspace,setWorkSpace] = useState(null);
  const [loaded,setLoaded] = useState(true);
  const [error, setError] = useState('');

  const userState = {
    user: [user,setUser],
    workspace: [workspace,setWorkSpace],
    loading : [loaded,setLoaded],
    error: [error, setError]
  }

  const verify = async() => {
    if (localStorage.getItem('userToken') && localStorage.getItem('wstoken')) {
      setLoaded(false);
      const res = await verifyUser('workspace/verify');
      setLoaded(true);
      
    }

    else if (localStorage.getItem('userToken')) {
      setLoaded(false);
      const res = await verifyUser('user/verify')
      setLoaded(true);
    }
  }

  useEffect(() => {
  

  }, [])

 

  return (
    <UserContext.Provider value={{userState}}>
      {error !== '' && <Error error={error} setError={setError} /> }
      {
        loaded ? 
        <Home/>
        :
        <Loading />
      }
    </UserContext.Provider>
  
  );
}

export default App;
