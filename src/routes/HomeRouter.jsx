import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserProfile } from '../components';
import Pins from '../container/Pins';

const HomeRouter = ({ user }) => {
  return (
    <Routes>
      <Route path='user-profile/:userId' element={<UserProfile />} />
      <Route path='/*' element={<Pins user={user && user} />} />
    </Routes>
  );
};

export default HomeRouter;
