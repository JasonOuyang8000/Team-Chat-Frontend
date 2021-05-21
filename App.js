
import './App.css';
import { UserContext } from './context/userContext';

import { useState } from 'react';

function App() {
  const [user,setUser] = useState(null);

 

  return (
    <UserContext.Provider value={{user,setUser}}>
      {
      user ? 

      :
 
      }
    </UserContext.Provider>
  
  );
}

export default App;
