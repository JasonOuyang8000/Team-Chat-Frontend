import './Layout.css';

const LayoutOne = ({children, style, styleName}) => (
    <div style={style} className={styleName}>
        {children}
    </div>
)

export default LayoutOne;