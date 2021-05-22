import { useState, useContext } from "react"
import Dashboard from "../components/Dashboard";
import Form from "../components/Form";
import FormHolder from "../components/FormHolder";
import LayoutOne from "../components/LayoutOne";
import PictureHolder from "../components/PictureHolder";
import Slideshow from "../components/Slideshow";
import Workspace from "../components/Workspace";
import { UserContext } from "../context/UserContext"



export default function Home() {
    const {userState} = useContext(UserContext);

    const [user,setUSer] = userState.user;
    const [workspace, setWorkSpace] = userState.workspace;

    switch (true) {
        case user !== null && workspace !== null:
            return (
                <Workspace/>
            );
        case user !== null:
            return (
                <Dashboard />
            );
      
        case user === null && workspace === null:

            return (
                <FormHolder />
            );
               
        default:
            return (
                <Form />
            );
    }

};