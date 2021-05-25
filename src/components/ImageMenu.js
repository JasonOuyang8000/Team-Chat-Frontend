import { faSyncAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Modal from "react-modal";
import SearchImage from "./SearchImage";

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      transform             : 'translate(-50%, -50%)',
      minHeight: '700',
      overflow: 'none'
    }
}


export default function ImageMenu({currentImage, handleImageChange}) {
    const [modalOpen,setModalOpen] = useState(false);
    


    return (
        <div className="image-menu mb-5 d-flex align-items-center flex-column">
            <div className="image-bg w-100 mb-5">
                <img className="image-menu-img " src={currentImage} alt='current-work' />
                <div onClick={() => setModalOpen(true)} className="shield p-abs">
                    <FontAwesomeIcon icon={faSyncAlt} size="2x" />

                    
                </div>
            </div>
          
            {/* <span onClick={() => setModalOpen(true)} className="btn-image-menu text-center w-100">Choose Image</span> */}
            <Modal 
            ariaHideApp={false}
            isOpen={modalOpen}
            style={customStyles}
            onRequestClose={() => setModalOpen(false)}
            >   <FontAwesomeIcon onClick={() => setModalOpen(false)} className="p-font" icon={faTimes} size='3x' />
                <SearchImage currentImage={currentImage} setModalOpen={setModalOpen} handleImageChange={handleImageChange} />
            </Modal>
         
       
        </div>
    );
} 