import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import moment from 'moment';
import UserCircle from "./UserCircle";


export default function MessageBox({messages,image, imageState}) {
    useEffect(() => {
        document.querySelector('.messages-box').scrollTop = document.querySelector('.messages-box').scrollHeight
    }, [messages]);


    return (
        <>  
          
        {imageState && <img className="w-space-image" alt="workspace" src={image.split('?')[0]} />}
        {
        messages.length === 0 ? 
        <div className={`${imageState ? 'msg-box-state': '' } messages-box messages-placeholder justify-content-center w-100 d-flex align-items-center`}>
            <div className="hold"><span className="me-5">No Messages</span><FontAwesomeIcon  icon={faCommentDots} /></div>
        </div>
        :
        <div className={`messages-box ${imageState ? messages.length < 4 ? 'd-flex justify-content-end flex-column': '' : messages.length < 6 ? 'd-flex justify-content-end flex-column': ''} ${imageState ? 'image-state': ''}`}>
          
            {messages.map((message) => (
           
                <div key={message.id} className="message-view">
                    <div className="user-name-chat d-flex">
                        <div className="col-3">
                        <UserCircle letter={message.user.username[0]} />
                        </div>
                        <div className="col-9">
                            <h3 className="mb-3 font-weight-bold message-user">{message.user.username}  <span className="message-time">{moment.utc(message.created).fromNow()}</span></h3>
                        </div>
                    </div>
                    
                    <p className="">{message.text}</p>
                    
                </div>
            ))}

        </div>
        }
        </>
    )
};