import { useState } from 'react';
import { Navbar } from '../components';
import PinsRoute from '../routes/PinsRoute';
const Pins = ({ user }) => {
  const [search, setSearch] = useState('');
  return (
    <div className='px-2 md:px-5'>
      <div>
        <Navbar user={user} searchTerm={search} setSearchTerm={setSearch} />
      </div>
      <div>
        <PinsRoute user={user} searchTerm={search} setSearchTerm={setSearch} />
      </div>
    </div>
  );
};

export default Pins;
