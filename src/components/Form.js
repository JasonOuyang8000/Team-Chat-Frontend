
import { useState } from 'react';
import './Form.css';
import Login from './Login';
import Signup from './Signup';

export default function Form() {
    const [currentForm, setCurrentForm] = useState('login');
    
    
    return (
        <>
            <Login currentForm={currentForm} setCurrentForm={setCurrentForm}/>
            <Signup currentForm={currentForm} setCurrentForm={setCurrentForm}  />
        </>
    );


}