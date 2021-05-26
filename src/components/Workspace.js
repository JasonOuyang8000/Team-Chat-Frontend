import LayoutOne from './LayoutOne';
import WorkDashBar from './WorkDashBar';
import './Workspace.css';
import Workview from './Workview';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { convertToTimestamp} from '../helpers';
import { SocketContext,socket } from '../context/SocketContext';



export default function Workspace() {
    
    const {userState} = useContext(UserContext);
    const [workspace, setWorkSpace] = userState.workspace;
    const [activeChannel, setActiveChannel] = useState(workspace.user_alerts.find(alert => alert.channel.name === 'Main').channel.id);
    const [alerts, setAlerts] = useState(workspace.user_alerts);
    const [error, setError] = userState.error;
    const [user, setUser] = userState.user;

   
    // , {query: {
    //     usertoken: localStorage.getItem('usertoken'),
    //     wstoken: localStorage.getItem('wstoken'),
    // }} 

    useEffect(() => {
        const alertsCopy = [...alerts];

        if (!alertsCopy[0].read) {
            socket.emit('channel alert', {'channel': activeChannel, usertoken: localStorage.getItem('usertoken')});
            alertsCopy[0].read = true;
            setAlerts(alertsCopy);
        }
    },[]);


    useEffect(() => {
        
        if (activeChannel && socket)  {
            socket.emit('join',{channel:activeChannel, usertoken: localStorage.getItem('usertoken')});
        }


     

      
    }, [ activeChannel ]);


  
    console.log(workspace.user_alerts);

   
    return (
       
            <LayoutOne 
            styleName="layout-2"
            style={{
                backgroundColor:'rgb(250, 253, 255)',
            }}
            > 
            <div className="workspace d-flex">
            
                <WorkDashBar alerts={alerts} setAlerts={setAlerts} socket={socket} setActiveChannel={setActiveChannel} active={activeChannel} workspace={workspace} userState={userState} />
                
                <Workview active={activeChannel} setError={setError} socket={socket} />

            </div>
            </LayoutOne>
       
    );


}