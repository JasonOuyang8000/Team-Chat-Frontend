import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import { bgSwitch, isUser, userAuth } from "../helpers";
import Loading from "../pages/Loading";
import LayoutOne from "./LayoutOne";
import IconSwitcher from "./IconSwitcher";





export default function Workspaces({active,setError}) {





    const [user,setUser] = useContext(UserContext).userState.user;

    const [workspaces, setWorkspaces] = useState([]);
    const [loaded, setLoaded] = useState(true);
    const [workspace,setWorkSpace] = useContext(UserContext).userState.workspace;


    const getAllWorkSpaces = () => {
        axios.get(`${process.env.REACT_APP_URL}/workspace`,{ headers: {
            authorization: 'Bearer ' + localStorage.getItem('usertoken')
          }})
        .then(response => {
            setLoaded(true);
        
            setWorkspaces(response.data.workspaces);
            

        })
        .catch(error => {
        
            setLoaded(true);
    
            if (error.response) {
                setError(error.response.data.message);
            }
            else {
                setError(error.message);
            }
    
        });
   
    }

    const getYourWorkSpaces = () => {
     
        axios.get(`${process.env.REACT_APP_URL}/workspace/user`,{ headers: {
            authorization: 'Bearer ' + localStorage.getItem('usertoken')
            }})
        .then(response => {
            setLoaded(true);
        
            setWorkspaces(response.data.workspaces);
            

        })
        .catch(error => {
        
            setLoaded(true);
    
            if (error.response) {
                setError(error.response.data.message);
            }
            else {
                setError(error.message);
            }
    
        });
    
    
        
    }
    

    useEffect(() => {
        console.log(active)
        setLoaded(false);
        if (active === 'All Workspaces') {
            getAllWorkSpaces();
        }

        else if (active === 'Your Workspaces') {
            getYourWorkSpaces();
        }
       
     
   
   
     
        
     
    }, [ active ]);


    return (
     
       loaded ?

        <div className="ml-4 workspaces-container col-10 ">
            <h1 className="active-name text-center">{active}</h1>
            <div className="row">
                {
                    workspaces.map(workspace => (
                        <div key={workspace.id} className="col-12 col-lg-6 col-xl-3  w-block">
                           
                            <div className={`workspace-block shadow-lg ${bgSwitch({workspace,user})}`}>
                                <img className="workspace-image mb-2" alt={workspace.name} src={workspace.image} />
                                <div className="name-wrap px-4 my-3 ">
                                    <h3 className="workspace-name line-clamp">{workspace.name === '' ? 'Blank Name': workspace.name}</h3>
                                </div>

                                <IconSwitcher 
                                type={{workspace,user}}
                                setLoaded={setLoaded}
                                setError={setError}
                                id={workspace.id}
                                setWorkSpace={setWorkSpace}
                                />


                            
                              
                         
                                
                             
                            </div>
                        </div>
                    ))
                }
            </div>
       
        </div> 

        :

        <LayoutOne 
        styleName="layout-3 v-center"
        style={{
            backgroundColor:'#E4EDF1',
        }}>
            <Loading/>
        </LayoutOne>
   
       
    );
  
} 