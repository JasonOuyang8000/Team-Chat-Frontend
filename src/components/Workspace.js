import LayoutOne from './LayoutOne';
import WorkDashBar from './WorkDashBar';
import './Workspace.css';
import Workview from './Workview';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { act } from 'react-dom/test-utils';
import { convertToTimestamp} from '../helpers';
import { SocketContext,socket } from '../context/SocketContext';



export default function Workspace() {
    
    const {userState} = useContext(UserContext);
    const [workspace, setWorkSpace] = userState.workspace;
    const mainChannel = workspace.channels.find(channel => channel.name === 'Main');
    const [activeChannel, setActiveChannel] = useState(mainChannel.id);
    const [error, setError] = userState.error;
    const [user, setUser] = userState.user;

   
    // , {query: {
    //     usertoken: localStorage.getItem('usertoken'),
    //     wstoken: localStorage.getItem('wstoken'),
    // }} 

   
    useEffect(() => {
       


        
        
        return () => {
            console.log('test')
            if(socket) socket.disconnect()
        };
    }, [])

    useEffect(() => {
       
        if (activeChannel && socket)  {
            socket.emit('join',{channel:activeChannel, username:user.username});
        }

     

      
    }, [ activeChannel ]);
    
 
   
    return (
        <SocketContext.Provider value={socket}>
            <LayoutOne 
            styleName="layout-2"
            style={{
                backgroundColor:'#E4EDF1',
            }}
            > 
            <div className="workspace d-flex">
            
                <WorkDashBar setActiveChannel={setActiveChannel} active={activeChannel} workspace={workspace} userState={userState} />
                
                <Workview active={activeChannel} setError={setError} socket={socket} />

            </div>
            </LayoutOne>
        </SocketContext.Provider>
    );


}