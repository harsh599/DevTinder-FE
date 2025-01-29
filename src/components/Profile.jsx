import { useSelector } from "react-redux";
import EditProfile from "./EditProfile"

const Profile = () => {
    const user = useSelector((store) => store.user);
    console.log("Profile jsx: " + user);
  return (
    <div>
      {user && <EditProfile user= {user}/> } 
    </div>
  )
}

export default Profile