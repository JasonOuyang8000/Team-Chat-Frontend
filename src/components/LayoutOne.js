import './Layout.css';

const LayoutOne = ({children, style}) => (
    <div style={style} className="layout-1">
        {children} <p id="loading-text">Getting things ready...</p>
    </div>
)

export default LayoutOne;