import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Chatbox({socket,active, imageState}) {
    const [text, setText] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit('send message', {'message': text, 'channel': active, usertoken: localStorage.getItem('usertoken')});
        setText('');
        setBtnDisabled(true);
        
    }

    const handleChange= (e) => {
        setText(e.target.value);

        if (e.target.value === '') {
            if (!btnDisabled) {
                setBtnDisabled(true);
            }
        }

        else {
            if (btnDisabled) {
                setBtnDisabled(false);
            }
        }


    }

    return (
        <div  className="chat-box">
            <form onSubmit={handleSubmit} className="chat-form mx-auto">
                <input onChange={handleChange} value={text} className={`col-10  ${imageState ? 'shadow-lg': ''}`} type="text" placeholder="Enter a Message..."/>
                <button className={` ${imageState ? 'shadow-lg': ''}`} type="submit" disabled={btnDisabled}><FontAwesomeIcon icon={faPaperPlane} /> </button>
            </form>
           
        </div>
    )
}