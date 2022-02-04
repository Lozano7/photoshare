import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CreatePin, Feed, PinDetail, Search } from '../components';
const PinsRoute = ({ user, searchTerm, setSearchTerm }) => {
  return (
    <Routes>
      <Route path='/' element={<Feed />} />
      <Route path='/category/:categoryId' element={<Feed />} />
      <Route path='/pin-detail/:pinId' element={<PinDetail user={user} />} />
      <Route path='/create-pin' element={<CreatePin user={user} />} />
      <Route
        path='/search'
        element={<Search search={searchTerm} setSearch={setSearchTerm} />}
      />
    </Routes>
  );
};

export default PinsRoute;
