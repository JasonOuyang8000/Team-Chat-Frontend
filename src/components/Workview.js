import axios from "axios";
import { useEffect, useState } from "react";
import { workAuth } from "../helpers";
import Loading from "../pages/Loading";
import Chatbox from "./Chatbox";
import LayoutOne from "./LayoutOne";
import MessageBox from "./MessageBox";

export default function Workview ({active, setError, socket, image, imageState}) {

    const [messages, setMessages] = useState([]);
    const [loaded, setLoaded] = useState(true);
   
    useEffect(() => {
        if (active !== null) {
            getChannelMessages();
        }
      



        
    }, [ active ]);

    useEffect(() => {
        
        socket.on('channel message',(data) =>{
            
            setMessages((messages) => [...messages,data.message]);
        })

       return () => socket.off('channel message'); 
    }, []);

    


    const getChannelMessages = async() => {
        try {
            setLoaded(false);
     
            const response = await axios.get(`${process.env.REACT_APP_URL}/workspace/channel/message/${active}`,{
                headers: {
                    wstoken: localStorage.getItem('wstoken'),
                    authorization:'Bearer ' + localStorage.getItem('usertoken')
                }
            });
            setLoaded(true);

            setMessages(response.data.messages);
        }
        catch (error) {
            setLoaded(true);
            console.log(error);
            if (error.response) {
                setError(error.response.data.message);
            }
            else {
                setError(error.message);
            }
        }
    }
    
   

    return (
    
        <div className="work-view col-9">
            {loaded ? 
              <>
                <MessageBox socket={socket} messages={messages} image={image} imageState={imageState}/>
                <Chatbox imageState={imageState} socket={socket} active={active}/>
              </>
              :
              <LayoutOne 
              styleName="layout-3"
              style={{
                  backgroundColor:'#E4EDF1',
              }}>
                  <Loading/>
              </LayoutOne>
              
            }



        </div>

    );
}