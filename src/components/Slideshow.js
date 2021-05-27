import { faPeopleCarry } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Slideshow.css';

export default function Slideshow ({images,currentImageIndex}){

  
    return (
        <div className="slideshow">
            <img src={images[currentImageIndex]}  alt={'image-' + currentImageIndex} />
            <div className="logo-brand-container ">
                <span className="logo-title">Team Chat</span><FontAwesomeIcon className="logo-img" icon={faPeopleCarry} size='3x' />
            </div>

        </div>
    );
}