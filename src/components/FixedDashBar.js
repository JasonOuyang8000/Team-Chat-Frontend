import { faEdit, faGlobeAmericas, faKey, faPeopleCarry, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContext } from "../context/UserContext";
import { useContext, useState  } from "react";

export default function FixedDashBar ({setModalOpen}) {
    const {userState} = useContext(UserContext);
    const [workspace, setWorkSpace] = userState.workspace;
    const [error, setError] = userState.error;
    const [user, setUser] = userState.user;

    const handleCreate = () => {
        if (user.limit === 0) {
            setError('Ran out of workpspaces.')
            return;
        }

        setModalOpen((prevState) => {
            if (prevState === false) {
                return true;
            }
        })
        
    }

    const logout = () => {
        localStorage.removeItem('usertoken');
        localStorage.removeItem('wstoken');
        setUser(null);
        setWorkSpace(null);
    }

    return (
        <div className="dash-bar d-flex flex-column line-clamp dash-one col-2 pt-5 px-3 shadow">
            <div className="brand-logo-dash mb-5 d-flex justify-content-center align-items-center">
                <span className="logo-title me-3 ">Team Chat</span>
                <FontAwesomeIcon className="logo-img" icon={faPeopleCarry} size='3x' />
            </div>

            
            <div onClick={handleCreate} className="dash-bar-section ">
                <div className="col-2 text-center">
                    <FontAwesomeIcon className="fa-img" icon={faEdit} size='lg' />
                 </div>
                <div className="col-10">
                    Create a WorkSpace
                </div>
               
            </div>

            <div className="dash-bar-section mt-5 active textleft">
                <div className="col-2 text-center">
                <FontAwesomeIcon className="fa-img" icon={faGlobeAmericas} size='lg' />
                </div>
                <div className="col-10">
                    All WorkSpaces
                </div>
            </div>
    
            <div className="dash-bar-section">
                <div className="col-2 text-center">
                    <FontAwesomeIcon className="fa-img" icon={faKey} size='lg' />
                 </div>
                <div className="col-10">
                    Your WorkSpaces
                </div>
               
            </div>


            <div onClick={logout} className="dash-bar-section end">
                <div className="col-2 text-center ">
                    <FontAwesomeIcon className="fa-img" icon={faSignOutAlt} size='lg' />
                 </div>
                <div className="col-10">
                     Logout
                </div>
               
            </div>
            
        
    



        </div>
    )

}