import { RiHome2Fill } from 'react-icons/ri';
import { Link, NavLink } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';

import { categories } from '../utils/data';

const isNotActiveStyle =
  'flex items-center px-5 gap-3 text-gray-500 hover:text-grey-800  capitalize';

const isActiveStyle =
  'text-[#f04] flex items-center px-5 gap-3 font-extrabold border-r-2 border-white hover:text-grey-800  capitalize';

const Sidebar = ({ user, closeToggle }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className='flex flex-col bg-gradient-to-tr from-[#2b3142] to-[#21232a] justify-between h-full overflow-y-scroll min-w-210 hide-scrollbar'>
      <div className='flex flex-col'>
        <Link
          className='flex px-5 gap-2 my-6 pt-1 w-190 items-center'
          to='/'
          onClick={handleCloseSidebar}
        >
          <h1 className='text-[#f04] text-3xl font-bold font-[Lobster]'>
            PhotoShare
          </h1>
        </Link>
        <div className='flex flex-col gap-5 text-white'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHome2Fill color='white' />
            Home
          </NavLink>
          <h3 className='mt-2 px-5 text-base 2xl:text-xl'>
            Discover Categories
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              key={category.name}
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
            >
              <img
                src={category.image}
                alt='category'
                className='w-8 h-8 rounded-full object-cover'
              />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className='flex my-5 mb-3 gap-2 p-2 items-center rounded-lg shadow-lg mx-3'
          onClick={handleCloseSidebar}
        >
          <img
            src={user?.image}
            alt='user-profile'
            className='w-10 h-10 rounded-full border-2 border-white'
          />
          <p className='text-white'>{user.name}</p>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
