import { faPeopleCarry } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Slideshow.css';

export default function Slideshow ({images,currentImageIndex}){

  
    return (
        <div className="slideshow shadow">
            <img src={images[currentImageIndex]}  alt={'image-' + currentImageIndex} />
            <div className="logo-brand-container shadow-lg">
                <span className="logo-title">Team Chat</span><FontAwesomeIcon className="logo-img" icon={faPeopleCarry} size='3x' />
            </div>

        </div>
    );
}