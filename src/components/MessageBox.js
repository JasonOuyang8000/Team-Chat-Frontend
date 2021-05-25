import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import moment from 'moment';

export default function MessageBox({messages}) {

    useEffect(() => {
        document.querySelector('.messages-box').scrollTop = document.querySelector('.messages-box').scrollHeight
    }, [messages])

    return (
        messages.length === 0 ? 
        <div className=" messages-box messages-placeholder justify-content-center w-100 d-flex align-items-center">
            <span className="me-5">No Messages</span><FontAwesomeIcon  icon={faCommentDots} />
        </div>
        :
        <div className="messages-box">
      
            {messages.map((message) => (
                <div key={message.id} className="message-view">
                    <h3 className="mb-3 font-weight-bold message-user">{message.user.username} <span className="message-time">{moment(message.created).fromNow()}</span></h3>
                    <p className="">{message.text}</p>
                    
                </div>
            ))}

        </div>
    )
};