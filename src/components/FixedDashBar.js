import { faGlobeAmericas, faKey, faPeopleCarry, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FixedDashBar () {


    return (
        <div className="dash-bar p-3 shadow">
            <div className="brand-logo-dash mb-5 d-flex justify-content-center align-items-center">
                <span className="logo-title me-3 ">Team Chat</span>
                <FontAwesomeIcon className="logo-img" icon={faPeopleCarry} size='3x' />
            </div>

            <div className="dash-bar-section active textleft">
                <div className="col-2">
                <FontAwesomeIcon className="fa-img" icon={faGlobeAmericas} size='lg' />
                </div>
                <div className="col-10">
                    All WorkSpaces
                </div>
            </div>
    
            <div className="dash-bar-section ">
                <div className="col-2">
                    <FontAwesomeIcon className="fa-img" icon={faKey} size='lg' />
                 </div>
                <div className="col-10">
                        Your WorkSpaces
                </div>
               
            </div>
            <div className="dash-bar-section ">
                <div className="col-2">
                    <FontAwesomeIcon className="fa-img" icon={faSignOutAlt} size='lg' />
                 </div>
                <div className="col-10">
                        Logout
                </div>
               
            </div>
            
        
    



        </div>
    )

}