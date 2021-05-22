import axios from "axios";
import { useState, useContext  } from "react";
import { UserContext } from "../context/UserContext";


export default function Signup({currentForm, setCurrentForm}) {
    
    const {userState} = useContext(UserContext);

    const [error, setError] = userState.error;

    const [formParams, setFormParams] = useState({username:'', password:'', confirmPassword:''});

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormParams({
            ...formParams,
            [name]: value
        });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            if (formParams.username === '' || formParams.password === '' || formParams.confirmPassword === '') {
                setError('Field Cannot be Blank.')
                return;
            }
    
            if (formParams.password !== formParams.confirmPassword) {
                setError('Passwords and Confirm Password must match')
                return;
            }
            
            const response = await axios.post(`${process.env.REACT_APP_URL}/user/signup`,{username:formParams.username, password:formParams.password});
            
            

        }
        catch(error) {
            if (error.response) {
                setError(error.response.data.message);
            }

            else {
                setError(error.message);
            }
        }
        

    }

    return (
        <form 
        onSubmit={handleSubmit}
        onClick={() => currentForm !== 'signup' && setCurrentForm('signup')}
        className={`form signup py-4 px-5 d-flex flex-column h-50 justify-content-center ${currentForm !== 'signup'? 'blur-effect' : ''}`} 
        >   
            <h1 className="mb-4" id="form-title">Signup</h1>
            <input onChange={handleChange} name="username" className="mb-4 input-sign" type="text" placeholder="Username" value={formParams.username} />
            <input onChange={handleChange} name="password" className="mb-4 input-sign" type="password" placeholder="Password" value={formParams.password} />
            <input onChange={handleChange} name="confirmPassword" className="mb-4 input-sign" type="password" placeholder="Confirm Password"  value={formParams.confirmPassword}/>
            <input className="mb-4" type="submit" value="Signup"/>
        </form>
    )
}