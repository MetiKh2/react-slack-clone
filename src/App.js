import React, {useState} from "react";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import {Route, Routes} from 'react-router-dom';
import Chat from "./pages/chat/Chat";
import './App.css'
import Login from "./pages/login/Login";
import {useStateValue} from "./context/StateContext";
function App() {
    const [{user},dispatch]=useStateValue()
    console.log(user)
  return (
    <div className="App">
        {
            !user?(
                <Login/>
                ):
                (
                    <>
                       <Header/>
                       <div className={'app-body'}>
                           <Sidebar/>
                           <Routes>
                               <Route path={'/room/:roomId'} element={<Chat/>}/>
                               <Route path={'/'} element={<h1>WellCome</h1>}/>
                           </Routes>
                       </div>
                   </>
                )
        }
    </div>
  );
}

export default App;
