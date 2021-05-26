import { faCircle, faComment, faComments, faHome } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { convertToTimestamp } from "../helpers";

export default function WorkChannels({workspace,alerts, active, setActive, socket, setAlerts}) {
    const handleActive = (e,id,index) => {
        
        if (id !== active) {
            socket.emit('leave',{channel:active});
            const alertsCopy = [...alerts];
            if (!alertsCopy[index].read) {
               
                socket.emit('channel alert', {'channel': id, usertoken: localStorage.getItem('usertoken')});
                alertsCopy[index].read = true;
                
                setAlerts(alertsCopy);
            }



            

            setActive(id);
        } 
    }

    useEffect(() => {
         
        socket.on('channel alert',(data) =>{
            if (active === data.channelId) {
              
               socket.emit('channel alert', {'channel': active, usertoken: localStorage.getItem('usertoken')});
            
                
        
            }
            else {
                const alertsCopy = [...alerts];
                const alertIndex = alertsCopy.findIndex(alert => alert.channelId === data.channelId);
                if ( alertsCopy[alertIndex].read) {
                    alertsCopy[alertIndex].read = false;
                    setAlerts(alertsCopy);
                }
                
                
            }
           
        })

        return () => socket.off('channel alert'); 
    },[active]);


    return (
        <div className="channel-bar">
            <h3 className="text-center channel-text mb-3">Channels</h3>


        {   alerts.length &&
            alerts.map((alert,index) => (
                <div onClick={(e) => handleActive(e,alert.channel.id,index)} key={alert.channel.id} className={`dash-bar-section textleft ${alert.channel.id === active ? 'active' : ''}`} >
                    <div className="col-2 text-center ">
                        {alert.channel.name === 'main' ? 
                        <FontAwesomeIcon icon={faHome} size="lg" /> :
                        <FontAwesomeIcon icon={faComments} size="lg" />
                        }
                        
                    </div>
                    <div className="col-10">
                        <span>{alert.channel.name}</span>
                        {!alert.read && <FontAwesomeIcon className="ms-5 alert-circle" size="1x" icon={faCircle} />}
                    </div>
                </div>
            ))
        
        }   
    </div>
    );
}