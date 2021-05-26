import { faCrown, faLock, faSmileWink, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import { bgSwitch, userAuth } from "../helpers"

export default function IconSwitcher({type,setError,setLoaded, id, setWorkSpace}) {

    const handleSubmit = async(e) => {
        try {
            e.preventDefault();

            if (e.target.elements.length === 2) {
                
                if (e.target.elements[0].value === '') {
                    setError('Password Cannot be Blank');
                    return;
                }
                setLoaded(false);
                const response = await axios.post(`${process.env.REACT_APP_URL}/workspace/${id}/join`,{
                    protected: true,
                    password: e.target.elements[0].value
                },{ headers: {
                authorization: 'Bearer ' + localStorage.getItem('usertoken')
                }});
               
                setLoaded(true);
                localStorage.setItem('wstoken',response.data.worktoken);
                setWorkSpace(response.data.workspace);
               

            }
            else {
                setLoaded(false);
                const response = await axios.post(`${process.env.REACT_APP_URL}/workspace/${id}/join`,{},{ headers: {
                authorization: 'Bearer ' + localStorage.getItem('usertoken')
                }});
                setLoaded(true);
                // const sortedChannels = response.data.workspace.channels.sort((a,b) => r
                localStorage.setItem('wstoken',response.data.worktoken);
                setWorkSpace(response.data.workspace);
            }
        }
        catch(error) {
            setLoaded(true);
            if (error.response) {
                setError(error.response.data.message);
            }
            else {
                setError(error.message);
            }
        }
  
        


    }



    switch(bgSwitch(type)) {
        case 'Protected':
            return(
            <>
                <form onSubmit={handleSubmit} className="form-space form-protected">
                    <input type="password" placeholder="Enter Code" />
                    <input type="submit" value="Join" />
                </form>
                <FontAwesomeIcon  className="end-left workspace-icon" icon={faLock} />
            </>
            );
        case 'User':
            return(
                <>
                    <form onSubmit={handleSubmit} className="form-space form-owner form-no">
                        <input type="submit" value="Enter" />
                    </form>
                    <FontAwesomeIcon  className="end-left workspace-icon" icon={faUser} />
                </>
                );
        case 'Owner': 
            return(
                <>
                    <form onSubmit={handleSubmit} className="form-space form-owner">
                        <input type="submit" value="Enter" />
                    </form>
                    <FontAwesomeIcon  className="end-left workspace-icon" icon={faCrown} />
                </>
            );
        case 'Free':
            return(
                <>
                    <form onSubmit={handleSubmit} className="form-space  form-owner form-no">
                        <input type="submit" value="Join" />
                    </form>
                    <FontAwesomeIcon  className="end-left workspace-icon" icon={faSmileWink} />
                </>
            );
        default: 
            return(
                <>
                    <form onSubmit={handleSubmit} className="form-space form-no">
                        <input type="submit" value="Join" />
                    </form>
                    <FontAwesomeIcon  className="end-left workspace-icon" icon={faSmileWink} />
                </>
            );
    }
        
 
}