import FixedDashBar from "./FixedDashBar";
import LayoutOne from "./LayoutOne";

import './Dashboard.css';
import Dashview from "./Dashview";

export default function Dashboard() {
    
    return (
        <LayoutOne  
        styleName="layout-2"
        style={{
            backgroundColor:'#cfc4c4',
            backgroundImage: 'linear-gradient(19deg, #cfc4c4 0%, #e7e5fb 100%)'
        }}>
        
        <FixedDashBar />
        
        <Dashview />

        </LayoutOne>
    );


}
