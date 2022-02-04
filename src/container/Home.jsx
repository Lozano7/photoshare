import { useEffect, useRef, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { HiMenu } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { client } from '../client';
import { Sidebar } from '../components';
import HomeRouter from '../routes/HomeRouter';
import { userQuery } from '../utils/data';
import { fetchUser } from '../utils/fetchUser';
const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);

  const userInfo = fetchUser();

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userInfo]);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className='flex bg-[#21232a] md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
      <div className='hidden md:flex h-screen flex-initial'>
        <Sidebar user={user && user} />
      </div>
      <div className='flex md:hidden flex-row'>
        <div className='p-2 w-full flex flex-row justify-between items-center shadow-lg'>
          <HiMenu
            fontSize={40}
            className='cursor-pointer text-white'
            onClick={() => setToggleSidebar(true)}
          />
          <Link to='/'>
            <div className='flex items-center h-[40px]'>
              <h1 className='text-[#f04] text-3xl font-bold px-2 font-[Lobster]'>
                PhotoShare
              </h1>
            </div>
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img
              src={user?.image}
              alt='user-profile'
              width='50px'
              className='rounded-full border-2 border-white'
            />
          </Link>
        </div>
        {toggleSidebar && (
          <div className='fixed w-4/5 bg-gradient-to-r from-[#2b3142] to-[#21232a] h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
            <div className='absolute w-full flex justify-end items-center p-1'>
              <AiFillCloseCircle
                fontSize={30}
                color='white'
                className='cursor-pointer'
                onClick={() => {
                  setToggleSidebar(false);
                }}
              />
            </div>
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>

      <div className='pb-2 flex-1 h-screen overflow-y-auto' ref={scrollRef}>
        <HomeRouter user={user} />
      </div>
    </div>
  );
};

export default Home;
