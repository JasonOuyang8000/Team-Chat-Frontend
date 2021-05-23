import { faSignInAlt, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function WorkControls() {
    return (
        <>
            <div className="dash-bar-section ">
                <div className="col-2 text-center">
                    <FontAwesomeIcon icon={faSignInAlt} size="lg" />
                 </div>
                <div className="col-10">
                    Logout
                </div>
               
            </div>
            <div className="dash-bar-section ">
                <div className="col-2 text-center">
                    <FontAwesomeIcon icon={faUndo} />
                 </div>
                <div className="col-10">
                    Go Back
                </div>
               
            </div>
        </>
    )
}