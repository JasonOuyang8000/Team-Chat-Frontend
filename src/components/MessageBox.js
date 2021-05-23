export default function MessageBox({messages}) {


    return (
        messages.length === 0 ? 
        <div className="messages-placeholder justify-content-center w-100 d-flex align-items-center">
            No Messages Yet :()
        </div>
        :
        <div className="messages-box">
            {messages.map((message) => (
                <div key={message.id} className="message-view">
                    {message}

                </div>
            ))}


        </div>
    )
};