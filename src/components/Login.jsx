import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {

    const [emailId, setEmailId] = useState("harsh@gmail.com");
    const [password, setPassword] = useState("harsh1234");
    const [firstName, setFirstName] = useState("Harsh");
    const [lastName, setLastName] = useState("Srivastava");
    const [isLoginForm, setIsLoginForm] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const handleLogin = async() => {
        try{
            const res = await axios.post(BASE_URL + "/login", {
                email:emailId,
                password:password
            },{withCredentials:true}); // to make cookies work 
            console.log(res);
            dispatch(addUser(res?.data?.data));
            navigate("/");
        }catch(e){
            console.log(e);
            setError(e?.response?.data || "Something went wrong");
            console.error("Error: " + e.message);
        }
       
    };

 const handleSignUp = async() => {
        try{
            const res = await axios.post(BASE_URL + "/signup", {
                email:emailId,
                password:password,
                firstName: firstName,
                lastName: lastName
            },{withCredentials:true}); // to make cookies work 
            console.log(res);
             dispatch(addUser(res?.data?.data));
            navigate("/profile");
        }catch(e){
            console.log(e);
            setError(e?.response?.data || "Something went wrong");
            console.error("Error: " + e.message);
        }
       
    };



  return (
   <div className="flex justify-center my-10">
    <div className="card card-border bg-base-300 w-96 shadow-xl">
        <div className="card-body">
            <h2 className="card-title justify-center">{isLoginForm ? "Login" : "Sign Up" }</h2>
            <div className = "">
                
                {!isLoginForm && <><label htmlFor="" className="py-4">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">First Name</legend>
                        <input type="text" className="input" placeholder="Type here" value = {firstName} onChange = {(e) => setFirstName(e.target.value)}/>
                    </fieldset>
                </label>

                <label htmlFor="" className="py-2">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Last Name</legend>
                        <input type="text" className="input" placeholder="Type here" value = {lastName} onChange = {(e) => setLastName(e.target.value)}/>
                    </fieldset>
                </label></>}

               <label htmlFor="" className="py-4">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Email Id</legend>
                        <input type="text" className="input" placeholder="Type here" value = {emailId} onChange = {(e) => setEmailId(e.target.value)}/>
                    </fieldset>
                </label>

                <label htmlFor="" className="py-2">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password</legend>
                        <input type="text" className="input" placeholder="Type here" value = {password} onChange = {(e) => setPassword(e.target.value)}/>
                    </fieldset>
                </label>

               

            </div>
            <p className = "text-red-500">{error}</p>
            <div className="card-actions justify-center m-2">
            <button className="btn btn-primary" onClick = {()=> isLoginForm ? handleLogin() : handleSignUp()}>{isLoginForm ? "Login" : "Sign Up"}</button>
            </div>
            <p className="m-auto py-2 cursor-pointer" onClick = {() =>setIsLoginForm(value => !value)}>{isLoginForm ? "New User ? Sign Up Here" : "Existing User? Login Here"}</p>
        </div>
    </div>
   </div>
  )
}

export default Login