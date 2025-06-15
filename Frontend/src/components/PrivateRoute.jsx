import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../services/tokenService";
import NavigationBar from "./Navbar/NavigationBar";
import Footer from "./Footer/Footer";
export function PrivateRoute(){
    // every component either it is class or function, it should return UI element 
    const token = getToken();
    if(token){
        // rende the child component
        return (
            <Outlet></Outlet>
        )
    }
    else{
        return (
            <Navigate to={"/"}></Navigate>
        )
    }
}