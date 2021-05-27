import { faSignInAlt, faToggleOff, faToggleOn, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function WorkControls({userState,socket,active,setIsImage, isImage}) {
    const [user,setUser] = userState.user;
    const [workspace, setWorkSpace] = userState.workspace;
   
    const logout = () => {
        socket.emit('leave',{channel:active});
        localStorage.removeItem('usertoken');
        localStorage.removeItem('wstoken');
        setWorkSpace(null);
        setUser(null);

    }

    const goBack = () => {
        socket.emit('leave',{channel:active});
        localStorage.removeItem('wstoken');
        setWorkSpace(null);
    }

    const handleImage = (e, op) => {
        if (op) {
            localStorage.setItem('setImage','true');
            setIsImage(true);
        }
        else {
            
            localStorage.removeItem('setImage');
            setIsImage(false);
          
        }
    }

    return (
        <>
            <div onClick={logout} className="dash-bar-section pointer">
                <div className="col-2 text-center">
                    <FontAwesomeIcon icon={faSignInAlt} size="lg" />
                 </div>
                <div className="col-10">
                    Logout
                </div>
               
            </div>
            <div onClick={goBack} className="dash-bar-section pointer">
                <div className="col-2 text-center">
                    <FontAwesomeIcon icon={faUndo} />
                 </div>
                <div className="col-10">
                    Go Back
                </div>
               
            </div>

            <div className="dash-bar-section ">
                <div className="col-2 text-center">
                    {isImage ?
                        <FontAwesomeIcon className="pointer"  onClick={(e) => handleImage(e,false)} icon={faToggleOn} size="lg" />
                        :
                        <FontAwesomeIcon className="pointer"   onClick={(e) => handleImage(e,true)} icon={faToggleOff} size="lg" />
                    }
                    
                 </div>
                <div className="col-10">
                    B-Mode (BETA)
                </div>
               
            </div>
        </>
    )
}