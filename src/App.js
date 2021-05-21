import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { UserContext } from './context/UserContext';

import { useState } from 'react';
import Home from './pages/Home';
import Loading from './pages/Loading';

function App() {
  const [user,setUser] = useState(null);
  const [workspace,setWorkSpace] = useState(null);
  const [loaded,setLoaded] = useState(false);
  const userState = {
    user: [user,setUser],
    workspace: [workspace,setWorkSpace],
    loading : [loaded,setLoaded]
  }

 

  return (
    <UserContext.Provider value={{userState}}>
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
