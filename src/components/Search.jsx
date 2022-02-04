import { useState, useEffect } from 'react';

import MasonryLayout from './MasonryLayout';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import Spinner from './Spinner';
import { FcSearch } from 'react-icons/fc';

const Search = ({ search, setSearch }) => {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search) {
      setLoading(true);
      const query = searchQuery(search.toLowerCase());
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [search]);

  return (
    <div>
      {loading && <Spinner message='Searching for pins...' />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && FcSearch !== '' && !loading && (
        <div className='mt-10 text-center text-xl text-white'>
          No Pins Found!
        </div>
      )}
    </div>
  );
};

export default Search;
