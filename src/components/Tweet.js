import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Mytwit.css';
import Loginscreen from './Loginscreen';

export default function Tweet() {
  const navigate = useNavigate();

  const VITE_USERNAME = localStorage.getItem("username");
  const VITE_PASSWORD = localStorage.getItem("password");
  // Get
  const [tweets, setTweets] = useState([])

  // get only my tweets 


  const fetchTwits = () => {
    axios.get('http://172.105.58.224:3582/tweet/my-all', { auth: { username: `${VITE_USERNAME}`, password: `${VITE_PASSWORD}` } })
      .then(function (response) {
        console.log(response)
        setTweets(response.data)
      })

      .catch(function (error) {
        console.log(error)
      })

  }
  useEffect(() => {
    fetchTwits()
  }, []
  );

  const toHome = () => {
    navigate('/Profile');
  }


  const delTwit = (id) => {
    axios
      .delete(`http://172.105.58.224:3582/tweet/${id}`, {
        auth: { username: `${VITE_USERNAME}`, password: `${VITE_PASSWORD}` },
      })
      .then(function (response) {
        console.log(response.data);
        fetchTwits();
      })
      .catch((err) => {
        console.error(`Deleting my tweet  failed`, err);
        alert(" failed");
      });
  };


  // useEffect(
  //   () => {
  //     if (!!!localStorage.getItem('isAuthenticated')) {
  //       navigate('/Loginscreen');
  //     }
  //   }, [navigate]
  // );


  return (
    <div>
      { localStorage.getItem("username") && localStorage.getItem("password")?(
    <div className='Profile2'>
      <div>
        <h1 className=''>TWITTER</h1>
      </div>
      <div className='content1'>
        {tweets.map((_tweet) => {
          return (
            <div key={_tweet.id} className='tweet-id'>
              <p className='user-name1'>{_tweet.author.username}</p>
              <div className='center'>
                <p className='user-tweet'>{_tweet.tweet}</p>
                <button className='del' onClick={() => delTwit(_tweet.id)}>Delete</button>
              </div>
            </div>
          )
        })}

      </div>
      <div>
        <button className='but-home' onClick={toHome}>Go To Home</button>
      </div>

    </div>
      ):(<Loginscreen />)
}
    </div>
  )
}
