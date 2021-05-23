
import WorkChannels from "./WorkChannels";
import WorkControls from "./WorkControls";



export default function WorkDashBar({userState,workspace, active ,setActiveChannel, socket }) {



    return (
        
        <div className="dash-bar p-3 shadow col-2">
            <div className=" mb-5 d-flex justify-content-center align-items-center">
                <span className="logo-title me-3 ">{workspace.name}</span>
            </div>
           

            <WorkChannels socket={socket} setActive={setActiveChannel} workspace={workspace} active={active} />
            <WorkControls  userState={userState} />

        </div>
    )
};