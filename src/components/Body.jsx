import { Navigate, Outlet, useNavigate } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"
import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useEffect } from "react"

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fetchUser = async() => {
        try{
            const res = await axios.get(BASE_URL + "/profile/view",{
                withCredentials: true
            });
            console.log("BODY", res);
            dispatch(addUser(res?.data?.data));
            console.log("Body.jsx");
            console.log(res);
        }catch(e){
            console.log(e);
            if(e.status == 401){
                navigate("/login");
            }
            console.error("Error fetching" + e.message);
        }
    }

    useEffect(()=>{
        fetchUser();
    }, []);

  return (
    <div>
        <NavBar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Body