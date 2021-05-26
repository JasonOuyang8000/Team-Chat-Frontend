import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios";
import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext";
import Loading from "../pages/Loading";
import LayoutOne from "./LayoutOne";



export default function SearchImage({currentImage,setModalOpen, handleImageChange}) {
    const [imagePlace, setImagePlace] = useState(currentImage);
    const [loaded,setLoaded] = useState(true);
    const [text, setText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [error,setError] = useContext(UserContext).userState.error;

    const handleSearch = async() => {
        try {
            if (text === '') {
                setError('Text cannot be Blank.');
                return;
            }
            setLoaded(false);
            const response = await axios.get(`${process.env.REACT_APP_URL}/image?q=${text}`);
            setLoaded(true);
            if (response.data.result.photos.length) {
              
                setSearchResults(response.data.result.photos);
            }
            else {
                setError('No results')
                return;
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

    const updateImage = () => {
        handleImageChange(imagePlace);
        setModalOpen(false);
    }

    return (
        <>
         
            <div className="search-container d-flex">
                <div className="image-search d-flex flex-column justify-content-evenly col-5">
                    <img className="image-enlarge mb-4" src={imagePlace} alt='current-work' /> 

                    <input onChange={(e) => {setText(e.target.value)}} className="mb-4 input-search" type="text" placeholder="Search Here" value={text} />
                    <span onClick={handleSearch} className="w-100 search-btn text-center">Search</span>
                    

                </div>
                <div className="search-results d-flex flex-column justify-content-evenly col-7">
                    <div className="image-results">
                        {loaded ? 
                            searchResults.length > 0
                            && 
                            <div className="row">
                                {searchResults.map(result => (
                                    <div key={result.id} className="col-4 mb-5">
                                        <img onClick={() => setImagePlace(result.src.large)} src={result.src.medium} className="result-img shadow" alt={result.photographer} />
                                    </div>
                                ))}
                            </div>
                            :
                            <LayoutOne 
                            styleName="layout-3"
                            style={{
                            
                            }}>
                            <Loading />
                            </LayoutOne>
                        }
                     

                    </div>
                    <div className="button-wrap w-100 d-flex justify-content-evenly">
                        <span onClick={updateImage} className="button-wrap-btn confirm-color">Confirm</span>
                        <span onClick={() => setModalOpen(false)} className="button-wrap-btn cancel-color">Cancel</span>
                    </div>
                </div>
            </div> 

        </>
    )
}