import FixedDashBar from "./FixedDashBar";
import LayoutOne from "./LayoutOne";
import Modal from 'react-modal';
import './Dashboard.css';
import Dashview from "./Dashview";
import { useState, useContext} from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { userAuth } from "../helpers";
import ImageMenu from "./ImageMenu";

export default function Dashboard() {
    
    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          width: '450px',
          transform             : 'translate(-50%, -50%)'
        }
    }

    const [formParams,setFormParams] = useState({
        name: '',
        password: '',
        image: 'https://images.pexels.com/photos/1467435/pexels-photo-1467435.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    })


    

    const [modalOpen, setModalOpen] = useState(false);
    const {userState} = useContext(UserContext);
    const [active,setActive] = useState('All Workspaces');
    const [error, setError] = userState.error;
    const [user, setUser] = userState.user;
    const [loaded, setLoaded] = userState.loading;
    const [workspace, setWorkSpace] = userState.workspace;

    const closeModal = () => {
        setModalOpen(false);
    }
   
    const [passDisabled, setpassDisabled] = useState(true);
    
   
    const handleCheck = () => {
        setpassDisabled(!passDisabled);
    }

    const handleChange = e => {
        const {name, value} = e.target;
      
        setFormParams({...formParams, [name] : value});
        

    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {

            if (!passDisabled && formParams.password === '') {
                setError('Password cannot be blank!');
                return;
            }

            setLoaded(false);
         
            const response = await axios.post(`${process.env.REACT_APP_URL}/workspace`, {
                ...formParams,protected: !passDisabled
            },{ headers: {
                authorization: 'Bearer ' + localStorage.getItem('usertoken')
              }});
            localStorage.setItem('wstoken',response.data.worktoken);
            setWorkSpace(response.data.workspace);
            setLoaded(true);
            const userLimit = response.data.workspace.users.find(u => u.id === user.id).limit;
            setUser({...user,limit: userLimit});


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

    const handleImageChange = (image) => {
      
        setFormParams({...formParams,image});
    }

    console.log(active);

    return (
        <LayoutOne  
        styleName="layout-2 d-flex"
        style={{
            backgroundColor:'#E4EDF1',
        }}>
        
        <Modal 
            ariaHideApp={false}
            isOpen={modalOpen}
            style={customStyles}
            onRequestClose={closeModal}
        >
            <form onSubmit={handleSubmit} className="form d-flex flex-column p-5">
                <input onChange={handleChange} name="name"  className="input-sign mb-5" type="text" placeholder="Name your workspace" value={formParams.name}/>
                <ImageMenu currentImage={formParams.image} handleImageChange={handleImageChange}/>
                <div className="form-check form-switch d-flex justify-content-end mb-5">
                  
                    <input onChange={handleCheck} className="form-check-input me-3" type="checkbox" id="flexSwitchCheckChecked" checked={!passDisabled}/>
                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Protected?</label>
                </div>
                <input onChange={handleChange} name="password" value={formParams.password}  className={`input-sign mb-5 ${passDisabled ? 'input-disabled': ''}`} type="password" placeholder="Passcode" disabled={passDisabled}/>
                <input type="submit" value="Create Workspace" />
            </form>
          
        </Modal>

        <FixedDashBar active={active} setActive={setActive} setModalOpen={setModalOpen} />
        
        <Dashview active={active} setError={setError}/>

        </LayoutOne>
    );


}
