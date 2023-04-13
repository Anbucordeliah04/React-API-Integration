import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';
import Loginscreen from './Loginscreen';


export default function Profile() {

  const navigate = useNavigate();

  // useEffect(
  //   () => {
  //     if (!!!localStorage.getItem('isAuthenticated')) {
  //       navigate('/Loginscreen');
  //     }
  //   }, [navigate]
  // );


  const logOut = () => {
    localStorage.clear();
    navigate('/Loginscreen');
  }
  const VITE_USERNAME = localStorage.getItem('username');
  const VITE_PASSWORD = localStorage.getItem('password');
  // Get
  const [tweets, setTweets] = useState([])

  const fetchPosts = () => {
    axios.get('http://172.105.58.224:3582/tweet/all', { auth: { username: `${VITE_USERNAME}`, password: `${VITE_PASSWORD}` } })
      .then(function (response) {
        console.log(response)
        setTweets(response.data)
      })

      .catch(function (error) {
        console.log(error)
      })

  }
  useEffect(() => {
    fetchPosts()
  }, []
  );

  const fetchTwits = () => {
    navigate('/Tweet');
  }

  // get only my tweets 


  // const fetchTwits = () => {
  //   axios.get('http://172.105.58.224:3582/tweet/my-all', { auth: { username: `${VITE_USERNAME}`, password: `${VITE_PASSWORD}` } })
  //     .then(function (response) {
  //       console.log(response)
  //       setTweets(response.data)
  //     })

  //     .catch(function (error) {
  //       console.log(error)
  //     })

  // }
  // useEffect(() => {
  //   fetchTwits()
  // }, []
  // );


  // post

  const [myMessage, setTweet] = useState([])
  const handleTwit = (e) => {
    setTweet(e.target.value);
  }

  const myTweet = () => {
    console.log(myMessage);
    const twePost = "http://172.105.58.224:3582/tweet/new";
    axios
      .post(
        twePost,
        {
          tweet: myMessage,
        },
        {
          auth: { username: `${VITE_USERNAME}`, password: `${VITE_PASSWORD}` },
        }
      )
      .then((response) => {
        console.log(response);
        fetchPosts();
        window.location.reload();
      });
  };
  return (
    <div>
    {
      localStorage.getItem("username")&& localStorage.getItem("password")?(
    <div className='Profile'>

      <div className='side'>

        <img src='https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png' alt="profile" className='profile-icon' /><h5 style={{ marginTop: '85px' }}>Profile</h5>
        <img src='https://th.bing.com/th/id/R.f0676c89abdeab6d74de6443541e401c?rik=larpi0v%2bt3lWZA&riu=http%3a%2f%2ficons.iconarchive.com%2ficons%2fgraphicloads%2f100-flat%2f128%2fhome-icon.png&ehk=DQK2WwY%2bP1uwYmUi%2f9zMYK8VDD0sIuyE%2fJ9AxNBU4VY%3d&risl=&pid=ImgRaw&r=0' alt='home' className='home' /><h5 style={{ marginTop: '80px' }}>Home</h5>
        <img src='https://cdn2.iconfinder.com/data/icons/business-icons-27/744/people_talking_speech_bubble_men_conversation_chatting_speaking-512.png' alt='twit' className='twit' onClick={fetchPosts} /><h5 style={{ marginTop: '100px' }}>All Tweet</h5>
        <img src='https://www.pngmart.com/files/16/Speech-Chat-Icon-Transparent-PNG.png' alt='mytwit' className='mytwit' onClick={fetchTwits} /><h5 style={{ marginTop: '70px' }} >My Tweet</h5>
        <img src='https://th.bing.com/th/id/OIP.wh35QkaphBMCWdSvS2E6GwAAAA?pid=ImgDet&w=252&h=252&rs=1' alt='settings' className='setting' /><h5 style={{ marginTop: '90px' }}>Settings</h5>
        <img src='https://th.bing.com/th/id/OIP.9QonGlOqVklYrY7SYX1hogAAAA?pid=ImgDet&w=380&h=360&rs=1' alt='logout' className='logout' onClick={logOut} /><h5 style={{ marginTop: '90px' }}>Logout</h5>
      </div>
      <div className='top'>
        <img src='https://clipground.com/images/twitter-logo-font-6.png' alt='top-img' style={{
          width: '17rem',
          marginTop: '-73px',
          marginLeft: '33rem'
        }} />


        <div className='content'>
          {tweets.map((_tweet) => {
            return (
              <div key={_tweet.id} className='twit-id'>
                <p className='user1'>{_tweet.author.username}</p>
                <p className='user-twit'>{_tweet.tweet}</p>
              </div>
            )
          })}

        </div>
        <input type='text' placeholder='Send a Twit....' className='snd' value={myMessage} onChange={handleTwit} /> <img src='https://th.bing.com/th/id/OIP.W02hpiRAP7NQSSmpnozFWgHaHa?pid=ImgDet&rs=1' alt='send' style={{ width: '30px', height: '30px', position: 'absolute', top: '597px', left: '1000px' }} onClick={myTweet} />
      </div>

    </div>
  ):(<Loginscreen />)
        }
        </div>
  )

}