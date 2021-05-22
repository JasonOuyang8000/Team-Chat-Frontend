import axios from "axios";
import { useState, useContext  } from "react";
import { UserContext } from "../context/UserContext";



export default function Login({currentForm, setCurrentForm}) {
    
    const {userState} = useContext(UserContext);

    const [error, setError] = userState.error;
    const [loaded, setLoaded] = userState.loading;
    const [user, setUser] = userState.user;

    const [formParams, setFormParams] = useState({username:'', password:''});

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormParams({
            ...formParams,
            [name]: value
        });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (formParams.username === '' || formParams.password === '') {
            setError('Field Cannot be Blank.')
            return;
        }

        try {
            setLoaded(false);
            const response = await axios.post(`${process.env.REACT_APP_URL}/user/login`,formParams);
            setLoaded(true);
            localStorage.setItem('usertoken',response.data.usertoken);
            setUser(response.data.user);

        }
        catch (error) {
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
        <form  
        onSubmit={handleSubmit}
        onClick={() => currentForm !== 'login' && setCurrentForm('login')} 
        className={`form py-4 px-5 d-flex flex-column h-50 justify-content-center ${currentForm !== 'login'? 'blur-effect' : ''}`}>  
            <h1 className="mb-4" id="form-title">Login</h1>
            <input onChange={handleChange} name="username" className="mb-4 input-sign" type="text" placeholder="Username" value={formParams.username} />
            <input onChange={handleChange} name="password" className="mb-4 input-sign" type="password" placeholder="Password" value={formParams.password} />
            <input className="mb-4" type="submit" value="Login"/>
        </form>
    )
}