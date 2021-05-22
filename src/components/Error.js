import { useEffect } from "react";

const Error = ({error, setError}) => {

  
    
    useEffect(() => {
        let timer = setTimeout(()=> {
            setError('');
        },3000);

        return () => clearTimeout(timer);
    });


    return (
        <div className='error-container shadow-lg'>
            <p id="error-message">{error}</p>
        </div>
    );
 
}

export default Error;