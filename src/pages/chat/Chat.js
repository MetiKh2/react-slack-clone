import React, {useEffect, useState} from 'react';
import './Chat.css'
import {useParams} from "react-router";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import InfoIcon from '@mui/icons-material/Info';
import {collection, doc, onSnapshot,query,orderBy,where} from "firebase/firestore";
import {db} from "../../firebase";
import Message from "../../components/message/Message";
import ChatInput from "../../components/chat/ChatInput";
const Chat = () => {
    const {roomId}=useParams()
    const [roomDetails,setRoomDetails]=useState(null)
    const [messages,setMessages]=useState([])
    useEffect(()=>{
        const fetchRoomDetails = onSnapshot(doc(db, "rooms",roomId), (snapshot) => {
            setRoomDetails({...snapshot.data(),id:roomId})
        },(err)=>{
            console.log(err);
        })
        const q = query(collection(db, "messages"),where("roomId","==",roomId));
        const fetchMessages = onSnapshot(q, (snapshot) => {
            let list=[];
            snapshot.docs.forEach(doc=>{
                list.push({id:doc.id,...doc.data()})
            })
            setMessages(list.sort((a,b)=>{return a?.timeStamp-b?.timeStamp}))
        },(err)=>{
            console.log(err);
        })
        return ()=>{
            fetchRoomDetails()
            fetchMessages()
        }
    },[roomId])
    console.log(messages)
    return (
        <div className={'chat'}>
            <div className={'chat-header'}>
                <div className={'chat-header-left'}>
                    <h4 className={'chat-channelname'}>
                        <b># {roomDetails?.name}</b>
                        <StarOutlineIcon/>
                    </h4>
                </div>
                <div className={'chat-header-right'}>
                    <p>
                        <InfoIcon/> Details
                    </p>
                </div>

            </div>
            <div className={'chat-messages'}>
                {
                    messages.map((message,i)=>{
                        return <Message message={message.message}
                                        user={message.username}
                                        timeStamp={message.timeStamp}
                                        userImage={message.userImage}/>
                    })
                }
            </div>
            <ChatInput channelId={roomDetails?.id} channelName={roomDetails?.name}/>
        </div>
    );
};

export default Chat;