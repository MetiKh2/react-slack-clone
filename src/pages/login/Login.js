import React from 'react';
import './Login.css'
import {Button} from "@mui/material";
import {auth, authProvider} from "../../firebase";
import {signInWithPopup} from 'firebase/auth'
import {useStateValue} from "../../context/StateContext";
import {actionTypes} from "../../context/StateReducer";
const Login = () => {
    const [state,dispatch]=useStateValue()
    const signIn = (e) => {
            signInWithPopup(auth,authProvider)
            .then(res=>{
                dispatch({
                    type:actionTypes.SET_USER,
                    payload:res.user
                })
            }).catch(err=>{
            alert(err.message)
                //todo here 3.14.27
        })
    }
    return (
        <div className={'login'}>
            <div className={'login-container'}>
                <img src={'https://th.bing.com/th/id/R.30d4081a44330f2f53da759391cd714d?rik=F%2bfAtWl3AiIP9w&pid=ImgRaw&r=0'}/>
                <h1>Sign In To Meti Channels</h1>
                <p>Meti.slack.com</p>
                <Button onClick={signIn}>Sign In With Google</Button>
            </div>
        </div>
    );
};

export default Login;