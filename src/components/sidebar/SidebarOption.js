import React from 'react';
import {useHistory, useNavigate} from "react-router";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import {db} from "../../firebase";
const SidebarOption = ({Icon,title,addChannelOption,id}) => {
    const navigate=useNavigate()
    const selectChannel = () => {
      if(id){
          navigate(`/room/${id}`)
      }
      else{
          navigate(title)
      }
    }
    const addChannel =async () => {
      const channelName=prompt('Please Enter Your Channel Name :')
    if (channelName){
        try{
            await addDoc(collection(db, "rooms"), {
                name:channelName,
                timeStamp:serverTimestamp()
            });
        }
        catch(err){
            console.log(err);
        }
    }
    }
    return (
        <div className={'sidebar-option'} onClick={addChannelOption?addChannel:selectChannel}>
            {Icon &&<Icon className={'sidebar-option-icon'}/>}
            {Icon?(
                <h3>{title}</h3>
            ):(
                <h3 className={'sidebar-option-channel'}><span className={'sidebar-option-hash'}># {title}</span></h3>
            )}
        </div>
    );
};

export default SidebarOption;