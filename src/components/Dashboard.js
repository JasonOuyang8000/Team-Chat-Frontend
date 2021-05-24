import FixedDashBar from "./FixedDashBar";
import LayoutOne from "./LayoutOne";
import Modal from 'react-modal';
import './Dashboard.css';
import Dashview from "./Dashview";
import { useState, useContext} from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { userAuth } from "../helpers";

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
    })

    const [modalOpen, setModalOpen] = useState(false);
    const {userState} = useContext(UserContext);
    const [active,setActive] = useState('All Workspaces');
    const [error, setError] = userState.error;
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
        console.log(name,value);
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
            console.log({
                ...formParams,protected: !passDisabled
            });
            const response = await axios.post(`${process.env.REACT_APP_URL}/workspace`, {
                ...formParams,protected: !passDisabled
            },{ headers: {
                authorization: 'Bearer ' + localStorage.getItem('usertoken')
              }});
            setLoaded(true);
            localStorage.setItem('wstoken',response.data.worktoken);
            setWorkSpace(response.data.workspace);

        }
        catch(error) {
            console.log(error);
            setLoaded(true);
            if (error.response) {
                setError(error.response.data.message);
            }

            else {
                setError(error.message);
            }
        }
    }



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
                <div className="form-check form-switch d-flex justify-content-end mb-5">
                    <input onChange={handleCheck} className="form-check-input me-3" type="checkbox" id="flexSwitchCheckChecked" checked={!passDisabled}/>
                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Protected?</label>
                </div>
                <input onChange={handleChange} name="password" value={formParams.password}  className={`input-sign mb-5 ${passDisabled ? 'input-disabled': ''}`} type="password" placeholder="Passcode" disabled={passDisabled}/>
                <input type="submit" value="Create Workspace" />
            </form>
          
        </Modal>

        <FixedDashBar setActive={setActive} setModalOpen={setModalOpen} />
        
        <Dashview active={active} setError={setError}/>

        </LayoutOne>
    );


}
