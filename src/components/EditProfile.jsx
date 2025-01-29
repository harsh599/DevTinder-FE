import { useState } from "react";
import UserCard from "./userCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({user}) => {
        const [firstName, setFirstName] = useState(user?.firstName || "");
        const [lastName, setLastName] = useState(user?.lastName|| "");
        const [gender, setGender] = useState(user?.gender|| "");
        const [age, setAge] = useState(user?.age|| "");
        const [about, setAbout] = useState(user?.about|| "");
        const [photoUrl, setPhotoUrl] = useState(user?.photoUrl|| "");
        const [error, setError] = useState("");
        const [showToast, setShowToast] = useState(false);

        const dispatch = useDispatch();
        const saveProfile = async() => {
            setError("");
            try{
                const res = await axios.patch(BASE_URL + "/profile/edit",{firstName, lastName,gender, photoUrl, age, about},{
                    withCredentials: true,
                });
                console.log();
                dispatch(addUser(res?.data?.data));
                setShowToast(true);
                const i = setTimeout(() => {
                    setShowToast(false);
                },3000);

            }catch(e){
                setError(e?.response?.data);
            }
        }
  return (
    <>
    <div className = "flex justify-center">
        <div className="flex justify-center my-10 mx-10">
            <div className="card card-border bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">Edit Profile</h2>
                    <div className = "">
                        <label htmlFor="" className="py-4">
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">First Name</legend>
                                <input type="text" className="input" placeholder="Type here"  value = {firstName} onChange = {(e)=> setFirstName(e.target.value)}/>
                            </fieldset>
                        </label>

                        <label htmlFor="" className="py-2">
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Last Name</legend>
                                <input type="text" className="input" placeholder="Type here" value = {lastName} onChange = {(e)=> setLastName(e.target.value)}/>
                            </fieldset>
                        </label>

                        <label htmlFor="" className="py-4">
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Age</legend>
                                <input type="text" className="input" placeholder="Type here"  value = {age} onChange = {(e)=> setAge(e.target.value)}/>
                            </fieldset>
                        </label>

                        <label htmlFor="" className="py-4">
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Gender</legend>
                                <input type="text" className="input" placeholder="Type here"  value = {gender} onChange = {(e)=> setGender(e.target.value)}/>
                            </fieldset>
                        </label>

                        <label htmlFor="" className="py-4">
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">About</legend>
                                <input type="text" className="input" placeholder="Type here"  value = {about} onChange = {(e)=> setAbout(e.target.value)}/>
                            </fieldset>
                        </label>

                         <label htmlFor="" className="py-4">
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Photo Url</legend>
                                <input type="text" className="input" placeholder="Type here"  value = {photoUrl} onChange = {(e)=> setPhotoUrl(e.target.value)}/>
                            </fieldset>
                        </label>

                    </div>
                    <div className="card-actions justify-center m-2">
                        <button className="btn btn-primary" onClick = {() => saveProfile()}>Save Profile</button>
                        <p className = "text-color-red">{error}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className = "my-10">
            <UserCard user = {{firstName, lastName,gender, photoUrl, age, about}}/>
        </div>
    </div>
             {showToast && <div className="toast toast-top toast-center">
          
                <div className="alert alert-success">
                    <span>Profile Updated successfully.</span>
                </div>
            </div>}
            </>
  )
}

export default EditProfile