import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import { useUserStore } from './hooks/UseUserStore';
import instance from './api/axios';
import useFetch from './useFetch';

const AllPlayList = () => {
  const user = useUserStore(state => state.user);
  const [allPlaylist, setAllPlaylist] = useState(null);
  useEffect(() => {
    const fetchPlayList = async () => {
      try {
        if (user?._id) {
          const { playlist } = await instance.get(`/user/movie/alldetail`);
          setAllPlaylist(playlist);
        }
      } catch (err) {
        console.error("Error fetching playlist:", err);
      }
    };
    fetchPlayList();
  }, [user]);
  console.log({allPlaylist})
  const truncateText = (text, charLimit) => {
    if (text.length > charLimit) {
      return text.slice(0, charLimit) + '...';
    }
    return text;
  };
  function  Movie_detail(props){
    const { id } = props;
    const { isLoading, movie, isError } = useFetch(`&i=${id}`);
  console.log({movie});

  if (isLoading) {
    return (
      <section className="movie-sec bg-black ">
        <div className="loading">Loading....</div>;
      </section>
    );
  }

  return (
    
    <NavLink to={`/home/movie/${id}`} className="relative group flex flex-col items-center m-10 rounded-md shadow-lg p-10 "
    style={{ backgroundImage: `url(${movie.Poster})`,
    backgroundSize: '100% auto',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center' }}>
      <div className="mov min-w-64 invisible group-hover:visible  bg-opacity-50 bg-white p-4 rounded-b-md shadow-md transition-opacity">
        {/* <figure>
          <img src={movie.Poster} alt="" className=" h-auto mb-4 rounded-md min-w-94" />
        </figure> */}
        <div className="card-size text-center">
          <p className="title font-bold text-2xl mb-2">{truncateText(movie.Title, 30)}</p>
          <p className=""></p>
          <p className="cardText text-xl mb-2">{movie.Released}</p>
          <p className="cardText text-xl mb-2">{movie.Genre}</p>
          <p className="cardText text-xl mb-2">{movie.imdbRating} / 10</p>
          <p className="cardText text-xl mb-2">{movie.Country}</p>
        </div>
      </div>
    </NavLink>
  );
  }
  return (
    <div className='bg-black'>
      <div className="pt-10 text-white text-5xl font-bold mb-5 bg-black text-center">
        All PlayLists
      </div>
    {allPlaylist?.map((item) => (
      <React.Fragment key={item.id}>
        {item?.public?.map((item1) => (
          <div key={item1.id} className="p-10 bg-black bg-opacity-95">
            <h1 className="text-white text-5xl font-bold mb-5">{item1.name}</h1>
            <div className="flex flex-row space-y-5 overflow-x-scroll pl-10 pb-10">
              {item1?.movie_id?.map((id) => (
                <Movie_detail key={id} id={id} />
              ))}
            </div>
        </div>
        ))}
      </React.Fragment>
    ))}
  </div>
  )
}

export default AllPlayList
