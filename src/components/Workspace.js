import LayoutOne from './LayoutOne';
import WorkDashBar from './WorkDashBar';
import './Workspace.css';
import Workview from './Workview';
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { act } from 'react-dom/test-utils';
import { convertToTimestamp } from '../helpers';


export default function Workspace() {
    
    const {userState} = useContext(UserContext);
    const [workspace, setWorkSpace] = userState.workspace;
 
    const mainChannel = workspace.channels.find(channel => channel.name === 'Main');

    const [activeChannel, setActiveChannel] = useState(mainChannel.id);
 
    const [error, setError] = userState.error;
    const [user, setUser] = userState.user;
   
   
    return (
        <LayoutOne 
        styleName="layout-2"
        style={{
            backgroundColor:'#E4EDF1',
        }}
        > 
        <div className="workspace d-flex">
         
            <WorkDashBar active={activeChannel} workspace={workspace} userState={userState} />
            
            <Workview active={activeChannel} setError={setError} />

        </div>
        </LayoutOne>
    );


}