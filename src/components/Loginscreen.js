import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import './Login.css';


export default function Loginscreen() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    
    
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (user && password) {
          localStorage.getItem("username",user)
          localStorage.getItem("password",password)
           axios.post ('http://172.105.58.224:3582/auth/login',
           {
            username: user,
            password: password
          },
          {
            headers:{
              "Content-Type": "application/json"
            }
          }
           )
           .then ((response) => {
            console.log(response.data)
            localStorage.setItem("username",user)
            localStorage.setItem("password",password)
            navigate ('/Profile')
           })
           .catch ((error) => {
            console.log(error)
            alert("Access Denied....Please Login")
           }) 
        }
        else{
            alert("Enter valid username or password");
        }
    };

   
  return (
    <div className='form' >
      <form onSubmit={(e)=> handleSubmit(e)} className='main'>
        <h2>TWITTER</h2>
        <label>USERNAME</label><br />
        <input type="text" onChange={(e) => setUser(e.target.value)} placeholder='Enter username'  className='user'/><br />
        <label style={{marginTop:'10px'}}>PASSWORD</label><br />
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' className='pass' /> <br />
        <input type="submit" style={{width:'100px'}} value="LOGIN" />
      </form>

    </div>
  )
};
