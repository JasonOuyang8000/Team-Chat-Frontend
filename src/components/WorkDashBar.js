
import WorkChannels from "./WorkChannels";
import WorkControls from "./WorkControls";



export default function WorkDashBar({userState,workspace, active ,setActiveChannel, socket, alerts,setAlerts,setIsImage, isImage }) {



    return (
        
        <div className="dash-bar work-bar-color p-3 col-3">
            <div className=" mb-5 d-flex justify-content-center align-items-center">
                <span className="workspace-title me-3 line-clamp">{workspace.name}</span>
            </div>
           

            <WorkChannels 
            alerts={alerts}
             setAlerts={setAlerts} 
             socket={socket} 
             setActive={setActiveChannel} 
             workspace={workspace} 
             active={active} 
             />
            <WorkControls 
            socket={socket} 
            userState={userState} 
            active={active}
            setIsImage={setIsImage}
            isImage={isImage}
            />

        </div>
    )
};