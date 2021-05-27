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
    const [isImage, setIsImage] = useState(false);




    

   


    useEffect(() => {
        const alertsCopy = [...alerts];

        if (!alertsCopy[0].read) {
            socket.emit('channel alert', {'channel': activeChannel, usertoken: localStorage.getItem('usertoken')});
            alertsCopy[0].read = true;
            setAlerts(alertsCopy);
        }

        if (localStorage.getItem('setImage')) {
            setIsImage(true);
        }


    },[]);


    useEffect(() => {
        
        if (activeChannel && socket)  {
            socket.emit('join',{channel:activeChannel, usertoken: localStorage.getItem('usertoken')});
        }


     

      
    }, [ activeChannel ]);


    console.log(workspace);


   
    return (
       
            <LayoutOne 
            styleName="layout-2"
            style={{
                background:'rgba(255, 255, 255, 0.1)',
            }}
            > 
          

            <div className="workspace d-flex">
            
                <WorkDashBar 
                alerts={alerts} 
                setAlerts={setAlerts} 
                socket={socket} 
                setActiveChannel={setActiveChannel}
                active={activeChannel} 
                workspace={workspace} 
                userState={userState} 
                setIsImage={setIsImage}
                isImage={isImage}
                />
                
                <Workview 
                active={activeChannel} 
                setError={setError} 
                socket={socket}
                image={workspace.image} 
                imageState={isImage}
                 />

            </div>
            </LayoutOne>
       
    );


}