import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addRequests } from '../utils/requestSlice';
import { BASE_URL } from '../utils/constants';

const Requests = () => {
     const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();
    const fetchReqeusts = async() =>  {
        try{
            const res = await axios.get(BASE_URL + '/user/requests/received', {
                withCredentials: true
            });
            dispatch(addRequests(res?.data?.data));
            console.log("Requests");
            console.log(res.data.data);
        }catch(e){
            console.log(e.message);
        }
    }

    useEffect(()=>{
        fetchReqeusts();
    }, []);
  if(!requests) return;

    if(requests.length === 0) return <h1>No requests Found!!</h1>


  return (
    <div className = "text-center my-10">
        <h1 className = "text-bold text-4xl">My Requests</h1>

        {requests.map(request => {
              const {firstName, lastName, photoUrl, age, gender, about} = requests.fromUserId;

            return(
                  <div key = {request._id} className = "flex justify-between items-center m-4 p-4 border rounded-lg bg-base-200 w-2/3 mx-auto">
                    <div>
                        <img alt = "photo" className = "w-20 h-20 rounded-full" src = {request?.photoUrl} />
                    </div>
                    <div className = "text-left mx-4">
                        <h2 className = "font-bold text-xl">{firstName + " " + lastName}</h2>
                        <p>{about}</p>
                        {age && gender && <p>{age + ", " + gender}</p>}
                        <p>{about}</p>

                    </div>
                    <button className="btn btn-primary mx-2">Reject</button>
                    <button className="btn btn-secondary mx-2">Accept</button>
                  </div>
            );
          
}
)}
    </div>
  )
}

export default Requests