import { faComment, faComments, faHome } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertToTimestamp } from "../helpers";

export default function WorkChannels({workspace, active}) {
    return (
        <div className="channel-bar">
            <h3 className="text-center channel-text mb-3">Channels</h3>


        {   
            workspace.channels.map((channel,index) => (
                <div key={channel.id} className={`dash-bar-section textleft ${channel.id === active ? 'active' : ''}`} >
                    <div className="col-2 text-center ">
                        {channel.name === 'main' ? 
                        <FontAwesomeIcon icon={faHome} size="lg" /> :
                        <FontAwesomeIcon icon={faComments} size="lg" />
                        }
                        
                    </div>
                    <div className="col-10">
                        {channel.name}
                    </div>
                </div>
            ))
        
        }   
    </div>
    );
}