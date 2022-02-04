import React from 'react';
import GoogleLogin from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/camera.svg';
import photoVideo from '../assets/photoVideo.mp4';
import { client } from '../client';
const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    localStorage.setItem('userInfo', JSON.stringify(response.profileObj));
    const { name, googleId, imageUrl } = response.profileObj;
    const doc = {
      _id: googleId,
      _type: 'user',
      name,
      image: imageUrl,
    };
    try {
      client.createIfNotExists(doc);
      navigate('/', {
        replace: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='flex justify-start items flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video
          src={photoVideo}
          type='video/mp4'
          loop
          autoPlay
          muted
          controls={false}
          className='w-full h-full object-cover object-center'
        />
        <div className='absolute flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 bg-blackOverlay '>
          <div className='p-6 flex items-center'>
            <img src={logo} alt='log' width='40px' />
            <h1 className='text-[#f04] text-3xl font-bold px-2 font-[Lobster]'>
              PhotoShare
            </h1>
          </div>
          <div className='shadow-2xl'>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={(renderProps) => (
                <button
                  type='button'
                  className='bg-mainColor flex justify-center items-center p-2 rounded-lg cursor-pointer outline-none'
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className='mr-3 text-xl' />
                  Sign in with Google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy='single_host_origin'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
