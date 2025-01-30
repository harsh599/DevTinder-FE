import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';
import { BASE_URL } from '../utils/constants';

const Requests = () => {
     const requests = useSelector((store) => store.requests);
     console.log("Store Requests");
     console.log(requests);
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

    const reviewRequest = async (status, _id) => {
        try{
            const res = await axios.post(BASE_URL + "/request/review/"+ status +"/"+_id , {}, {withCredentials:true});
            dispatch(removeRequest(_id));
        }catch(e){
            console.log(e);
        }
    };

  if(!requests) return;

    if(requests.length === 0) return <h1 className = "flex justify-center">No requests Found!!</h1>


  return (
    <div className = "text-center my-10">
        <h1 className = "text-bold text-4xl">My Requests</h1>

        {requests.map(request => {
              const {firstName, lastName, photoUrl, age, gender, about, _id} = request.fromUserId;

            return(
                  <div key = {_id} className = "flex justify-between items-center m-4 p-4 border rounded-lg bg-base-200 w-2/3 mx-auto">
                    <div>
                        <img alt = "photo" className = "w-20 h-20 rounded-full" src = {photoUrl} />
                    </div>
                    <div className = "text-left mx-4">
                        <h2 className = "font-bold text-xl">{firstName + " " + lastName}</h2>
                        {age && gender && <p>{age + ", " + gender}</p>}
                        <p>{about}</p>

                    </div>
                    <button className="btn btn-primary mx-2" onClick = {() => reviewRequest("rejected", request._id)}>Reject</button>
                    <button className="btn btn-secondary mx-2" onClick = {() => reviewRequest("accepted", request._id)}>Accept</button>
                  </div>
            );
          
}
)}
    </div>
  )
}

export default Requests