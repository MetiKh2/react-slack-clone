import React, {useEffect, useState} from 'react';
import './Sidebar.css'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CreateIcon from '@mui/icons-material/Create';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import SidebarOption from "./SidebarOption";
import { collection, getDocs,deleteDoc, doc, onSnapshot  } from "firebase/firestore";
import RoomIcon from '@mui/icons-material/Room';
import { db } from "../../firebase";
import AddIcon from '@mui/icons-material/Add';
import {useStateValue} from "../../context/StateContext";
const Sidebar = () => {
    const [{user},dispatch]=useStateValue()
    const [channels,setChannels]=useState([])
    useEffect(()=>{
        const unsub = onSnapshot(collection(db, "rooms"), (snapshot) => {
            let list=[];
            snapshot.docs.forEach(doc=>{
                list.push({id:doc.id,...doc.data()})
            })
            setChannels(list)
        },(err)=>{
            console.log(err);
        })
        return ()=>{
            unsub()
        }
    },[])
    return (
        <div className={'sidebar'}>
            <div className={'sidebar-header'}>
               <div className={'sidebar-info'}>
                   <h2>Clever Programmer</h2>
                   <h3>
                       <FiberManualRecordIcon/>
                       {user?.displayName}
                   </h3>
               </div>
                <CreateIcon/>

            </div>
            <SidebarOption Icon={InsertCommentIcon} title={'Threads'}/>
            <hr/>
            <SidebarOption Icon={AddIcon} title={'Add Channel'}addChannelOption />
            <SidebarOption title={'Channels'} Icon={RoomIcon}/>
            {
                channels.map((channel,i)=>{
                    return <SidebarOption id={channel.id} key={i} title={channel.name} />
                })
            }
        </div>
    );
};

export default Sidebar;