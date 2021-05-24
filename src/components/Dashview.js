import Workspaces from "./Workspaces";

export default function Dashview ({active,setError}) {
    

    switch(active) {
        case 'All Workspaces':
            return <Workspaces active={active} setError={setError} />
        default:
            return <Workspaces active={active} />
    }
}