import axios from 'axios'
import { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();
    const fetchConnections = async() =>  {
        try{
            const res = await axios.get(BASE_URL + '/user/connections', {
                withCredentials: true
            });
            dispatch(addConnection(res?.data?.data));
            console.log("COnnectionss");
            console.log(res.data.data);
        }catch(e){
            console.log(e.message);
        }
    }

    useEffect(()=>{
        fetchConnections();
    }, []);

    if(!connections) return;

    if(connections.length === 0) return <h1>No Connections Found!!</h1>


  return (
    <div className = "text-center my-10">
        <h1 className = "text-bold text-4xl">Connections</h1>

        {connections.map(connection => {
              const {firstName, lastName, photoUrl, age, gender, about} = connection;

            return(
                  <div key = {connection.id} className = "flex m-4 p-4 border rounded-lg bg-base-200 w-1/2 mx-auto">
                    <div>
                        <img alt = "photo" className = "w-20 h-20 rounded-full" src = {connection.photoUrl} />
                    </div>
                    <div className = "text-left mx-4">
                        <h2 className = "font-bold text-xl">{firstName + " " + lastName}</h2>
                        <p>{about}</p>
                        {age && gender && <p>{age + ", " + gender}</p>}
                        <p>{about}</p>

                    </div>
                  </div>
            );
          
}
)}
    </div>
  )
}

export default Connections