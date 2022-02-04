import { useState, useEffect, useCallback } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../client';
import MasonryLayout from './MasonryLayout';
import { pinDetailQuery, pinDetailMorePinQuery } from '../utils/data';
import Spinner from './Spinner';

const PinDetail = ({ user }) => {
  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetails] = useState(null);
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);
  const { pinId } = useParams();

  const fetchPinDetails = useCallback(() => {
    let query = pinDetailQuery(pinId);
    if (query) {
      client.fetch(query).then((data) => {
        setPinDetails(data[0]);
        if (data[0]) {
          query = pinDetailMorePinQuery(data[0]);
          client.fetch(query).then((res) => setPins(res));
        }
      });
    }
  }, [pinId]);

  const addComment = () => {
    if (comment) {
      setAddingComment(true);
      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [
          {
            comment,
            _key: uuidv4(),
            postedBy: {
              _type: 'postedBy',
              _ref: user._id,
            },
          },
        ])
        .commit()
        .then(() => {
          fetchPinDetails();
          setAddingComment(false);
          setComment('');
        });
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinDetail, fetchPinDetails]);

  if (!pinDetail) return <Spinner message='Loading pin...' />;

  return (
    <>
      <div
        className='flex xl:flex-row flex-col m-auto xl:bg-white items-center'
        style={{ maxWidth: '1500px' }}
      >
        <div className='flex justify-center items-center md:items-start flex-initial'>
          <img
            src={pinDetail?.image && urlFor(pinDetail.image).url()}
            alt='user-post'
            className='w-full rounded-t-2xl shadow-lg xl:rounded-none  object-cover'
          />
        </div>
        <div className='w-full p-5 xl:min-w-[450px] bg-white rounded-b-2xl xl:rounded-bl-none xl:rounded-tr-2xl'>
          <div className='flex items-center justify-between '>
            <div className='flex gap-2 items-center'>
              <a
                href={`${pinDetail?.asset?.url}?dl=`}
                download
                onClick={(e) => e.stopPropagation()}
                className='bg-gray-400 w-9 h-9 rounded-full flex items-center justify-center text-black text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
              >
                <MdDownloadForOffline />
              </a>
            </div>
            <a
              href={pinDetail.destination}
              target='_blank'
              rel='noopener noreferrer'
            >
              {pinDetail.destination}
            </a>
          </div>
          <div>
            <h1 className='text-2xl font-bold break-words mt-3 text-center'>
              {pinDetail.title}
            </h1>
            <p className='mt-3 mb-2'>{pinDetail.about}</p>
          </div>
          <Link
            to={`/user-profile/${pinDetail.postedBy?._id}`}
            replace='true'
            className='flex gap-2 mt-3 items-center'
          >
            <img
              src={pinDetail.postedBy?.image}
              alt='user-profile'
              className='w-8 h-8 rounded-full border-2 border-white object-cover'
            />
            <p className='text-black font-semibold capitalize'>
              {pinDetail.postedBy?.name}
            </p>
          </Link>
          <h2 className='mt-5 text-xl'>Comments:</h2>
          <div className='max-h-[350px] overflow-y-auto'>
            {pinDetail?.comments?.map((comment, i) => (
              <div
                className='flex gap-2 mt-5 items-center bg-white rounded-md'
                key={`${Math.floor(Math.random() * 1000)} - ${i}`}
              >
                <img
                  src={comment.postedBy.image}
                  alt='user-profile'
                  className='w-10 h-10 rounded-full object-cover'
                />
                <div className='flex flex-col'>
                  <p className='font-bold'>{comment.postedBy.name}</p>
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <div className='flex flex-wrap mt-6 gap-3'>
            <Link
              to={`/user-profile/${pinDetail.postedBy?._id}`}
              replace='true'
              className='flex gap-2 items-center'
            >
              <img
                src={pinDetail.postedBy?.image}
                alt='user-profile'
                className='w-8 h-8 rounded-full border-2 border-white object-cover'
              />
            </Link>
            <input
              type='text'
              className='flex-1 text-sm border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-500'
              placeholder='Add a comment...'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className='bg-[#f04] text-white rounded-2xl px-4 font-semibold text-sm outline-none'
              onClick={addComment}
            >
              {addingComment ? 'Adding...' : 'Add'}
            </button>
          </div>
        </div>
      </div>
      {pins?.length > 0 && (
        <>
          <h2 className='text-center font-bold text-xl text-white mt-8 mb-4'>
            More like this
          </h2>
          <MasonryLayout pins={pins} />
        </>
      )}
    </>
  );
};

export default PinDetail;
