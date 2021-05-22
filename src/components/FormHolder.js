import { useState } from "react";
import { useEffect } from "react";
import Form from "./Form";
import LayoutOne from "./LayoutOne";
import Slideshow from "./Slideshow";

export default function FormHolder() {
    const [images, setImages] = useState( ['https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80','https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80','https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80','https://images.unsplash.com/photo-1552581234-26160f608093?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80','https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80']);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    let timer = null;


    const changeImageIndex = () => {
        const img = document.querySelector('.slideshow img');
        img.classList.add('fadein-image');
        timer = setTimeout(() => {
            img.classList.remove('fadein-image');
            setCurrentImageIndex(currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1);
        },4000);     
    }

    useEffect(() => {
        changeImageIndex();
        
        

        return () => clearTimeout(timer);
    }, [ currentImageIndex ]);



    return (
        <LayoutOne 
        styleName="layout-1"
        > 
            <div 
            className="bg-cover abs-image" 
            style={{
            background: `url(${images[currentImageIndex]}) no-repeat center center fixed`,
            filter: 'blur(3px)',
            }}>
                
            </div>
            <div className="form-holder d-flex shadow-lg">
                <div className="col-6">
                    <Form />

                </div>
                <div className="col-6">
                    <Slideshow currentImageIndex={currentImageIndex} images={images}/>
                </div>
        
            </div>
        </LayoutOne>
    )
}