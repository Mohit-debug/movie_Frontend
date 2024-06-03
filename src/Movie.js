import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import 'tailwindcss/tailwind.css';
import { useGlobalContext } from "./context";
import instance from "../src/api/axios";
import { useUserStore } from "./hooks/UseUserStore";


const imgUrl = "https://via.placeholder.com/200/200";

const Movie = () => {
  const [showSelect, setShowSelect] = useState(false);
  const [selected,setSelected] = useState(null)
  const [allPlaylist, setAllPlaylist] = useState(null);
  const { movie, isLoading } = useGlobalContext();
  const user = useUserStore(state => state.user);
  useEffect(() => {
    const fetchPlayList = async () => {
      try {
        if (user?._id) {
          const { playlist } = await instance.get(`/user/movie/detail/${user._id}`);
          setAllPlaylist(playlist);
        }
      } catch (err) {
        console.error("Error fetching playlist:", err);
      }
    };
    fetchPlayList();
  }, [user]);
  console.log({allPlaylist})
  if (isLoading) {
    return <div className="loading">Loading....</div>;
  }

  const handleClick = () => {
    setShowSelect(true);
  };

 console.log({selected})

  return (
    <>
      <section className="movie-page">
        <div className="grid grid-4-col">
          {movie
            ? movie.map((curMovieElem) => {
                const { imdbID, Title, Poster } = curMovieElem;
                const movieName = Title.substring(0, 15);

                return (
                  <div key={imdbID}>
                    <NavLink to={`movie/${imdbID}`}>
                      <div className="card">
                        <div className="card-info">
                          <h2>
                            {movieName.length > 13
                              ? `${movieName}...`
                              : movieName}
                          </h2>
                          <img src={Poster === "N/A" ? imgUrl : Poster} alt={Title} />
                        </div>
                      </div>
                    </NavLink>
                    <button className="flex bg-gray-300 bg-opacity-50 hover:bg-gray-500 p-3 rounded-md cursor-pointer font-bold justify-end"
                      onClick={handleClick}>Add to PlayList</button>
                    {showSelect && (
                      <select className="bg-gray-500 bg-opacity-50 p-3 rounded-md cursor-pointer font-bold hover:bg-gray-700"
                      onChange={(e)=>{
                        setSelected(e.target.value)
                      }}
                      >
                        <option  value="" disabled selected>Select a playlist</option>
                        {allPlaylist?.private?.map((item) => (
                          <option key={item?._id} value={item?._id}>
                            {item?.name} - private
                          </option>
                        ))}
                        {allPlaylist?.public?.map((item) => (
                          <option key={item?._id} value={item?._id}>
                            {item?.name} - public
                          </option>
                        ))}
                      </select>
                    )}
                   
                   {
                      selected && (
                        <>
                          {/* Update private playlists */}
                          {allPlaylist?.private?.map((item) => {
                            if (item._id === selected) {
                              (async () => {
                                try {
                                  const newid = [...item.movie_id, imdbID];
                                  const updatedPlaylist = allPlaylist.private.map((playlistItem) => {
                                    if (playlistItem._id === selected) {
                                      return {
                                        ...playlistItem,
                                        movie_id: newid,
                                      };
                                    }
                                    return playlistItem;
                                  });
                                  await instance.put(`/user/movie/update/${allPlaylist._id}`, {
                                    private: updatedPlaylist,
                                  });
                                  window.location.reload();
                                } catch (error) {
                                  console.error("Error updating private playlist:", error);
                                }
                              })();
                            }
                            return null;
                          })}
                          {/* Update public playlists */}
                          {allPlaylist?.public?.map((item) => {
                            if (item._id === selected) {
                              (async () => {
                                try {
                                  const newid = [...item.movie_id, imdbID];
                                  const updatedPlaylist = allPlaylist.public.map((playlistItem) => {
                                    if (playlistItem._id === selected) {
                                      return {
                                        ...playlistItem,
                                        movie_id: newid,
                                      };
                                    }
                                    return playlistItem;
                                  });
                                  await instance.put(`/user/movie/update/${allPlaylist._id}`, {
                                    public: updatedPlaylist,
                                  });
                                  window.location.reload();
                                  
                                } catch (error) {
                                  console.error("Error updating public playlist:", error);
                                }
                              })();
                            }
                            return null;
                          })}
                        </>
                      )
                    }

                  </div>
                );
              })
            : ""}
        </div>
      </section>
    </>
  );
};

export default Movie;
