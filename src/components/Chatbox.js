import { useState } from "react";

export default function Chatbox({socket,active}) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit('send message', {'message': text, 'channel': active});
        setText('');
        
    }

    return (
        <div  className="chat-box">
            <form onSubmit={handleSubmit} className="chat-form">
                <input onChange={(e) => setText(e.target.value)} value={text} className="col-9 shadow" type="text" placeholder="Enter a Message..."/>
                <input className="col-2 shadow" type="submit" value="Send Message" />
            </form>
           
        </div>
    )
}