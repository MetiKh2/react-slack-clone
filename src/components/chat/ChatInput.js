import React, {useState} from 'react';
import '../../pages/chat/Chat.css'
import {Button} from "@mui/material";
import {db} from "../../firebase";
import {addDoc, collection, doc, serverTimestamp, setDoc} from "firebase/firestore";
import {useStateValue} from "../../context/StateContext";
const ChatInput = ({channelName,channelId}) => {
    const [input,setInput]=useState()
    const [{user},dispatch]=useStateValue()
    console.warn(channelId,channelName)
    const handleSubmit =async (e) => {
      e.preventDefault()
        if(channelId){
            try{
                await addDoc(collection(db, "messages"), {
                    message:input,
                    roomId:channelId,
                    timeStamp:serverTimestamp(),
                    username:user.displayName,
                    userImage:user.photoURL
                });
            }
            catch(err){
                console.log(err);
            }
            setInput('')
        }
    }
    return (
        <div className={'chat-input'}>
            <form onSubmit={handleSubmit}>
                <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder={`Message #${channelName}`}/>
                <Button type={"submit"}>Send</Button>
            </form>
        </div>
    );
};

export default ChatInput;