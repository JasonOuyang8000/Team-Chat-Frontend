
import WorkChannels from "./WorkChannels";
import WorkControls from "./WorkControls";



export default function WorkDashBar({userState,workspace, active}) {



    return (
        
        <div className="dash-bar p-3 shadow col-2">
            <div className=" mb-5 d-flex justify-content-center align-items-center">
                <span className="logo-title me-3 ">{workspace.name}</span>
            </div>
           

            <WorkChannels workspace={workspace} active={active} />
            <WorkControls  userState={userState} />

        </div>
    )
};