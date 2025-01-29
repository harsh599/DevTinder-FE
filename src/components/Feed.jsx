import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { addFeed } from '../utils/feedSlice';
import { useEffect } from 'react';
import UserCard from './userCard';

const Feed = () => {
    const feed = useSelector((store) => store.feed);
    console.log("FEED.JSXß");
    console.log(feed);
    const dispatch = useDispatch();
    const getFeed = async() =>{
        try{
            if(feed) return;
            const res = await axios.get(BASE_URL + "/user/feed", {withCredentials: true});
            console.log("Get Feed response", res);
            console.log(res?.data);
            dispatch(addFeed(res?.data));
        }catch(e){
            console.log(e.message);
        }
    }

    useEffect(()=>{
        getFeed();
    },[]);
    if(feed.length <= 0) return <h1 className = "flex justify-center my-10">No New Users Found!!</h1>
  return (
   feed && <div className = "flex justify-center">
       {feed.map((user, index) => <UserCard key = {user._id} user = {user}/>)} 
    </div>
  )
}

export default Feed