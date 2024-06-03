import Movie from "./Movie";
import Search from "./Search";
import 'tailwindcss/tailwind.css';
import { useNavigate } from 'react-router-dom';
import loginImage from "./asstes/loginImage3.jpg";
// import MyPlayList from "./MyPlayList";
// import AllPlayList from "./AllPlayList";
import Modal from "./Components/Modal"
import { useState } from "react";
import {useForm} from 'react-hook-form';
import {IoCloseCircle} from 'react-icons/io5'
import { useUserStore } from "./hooks/UseUserStore";
import axios from "axios";
import instance from '../src/api/axios'
const Home = () => {

  const navigate = useNavigate();

  const handleMyPlaylistClick = () => {
    navigate('/home/myplaylist');
  };
  const user = useUserStore(state=>state.user)
 console.log({user})
  const handleAllPlaylistClick = () => {
    navigate('/home/allplaylist');
  };
 const [show,setShow] = useState(false)
 const {register,handleSubmit}= useForm();
 const submit = (async(values)=>{
    console.log({values})
   

    const {playlist} = await instance.get(`/user/movie/detail/${user?._id}`);
    if(values.type==='private')
      {
        let newPrivatePlaylist = [
          ...playlist.private,
          {
            movie_id: [],  // Initially an empty array
            name: values.name,  // Use the name from the form values
          },
        ];
        await instance.put(`/user/movie/update/${playlist?._id}`,{
          private:newPrivatePlaylist
        }).then(result=>{
          console.log({result})
          setShow(false)
          window.location.reload();

        }).catch(err=>{
          console.log({err})
        })
      }
      if(values.type==='public')
        {
          let newPublicPlaylist = [
            ...playlist.public,
            {
              movie_id: [],  // Initially an empty array
              name: values.name,  // Use the name from the form values
            },
          ];
          await instance.put(`/user/movie/update/${playlist?._id}`,{
            public:newPublicPlaylist
          }).then(result=>{
            console.log({result})
            setShow(false)
            window.location.reload();

          }).catch(err=>{
            console.log({err})
          })
        }
    console.log({playlist})
  })
  const logoutUser = useUserStore(state=>state.logout)
  const handleLogout=()=>{
    logoutUser();
    navigate('/');
  }


  return (
    <>
      <div className="bg-center bg-cover bg-black"
        style={{ backgroundImage: `url(${loginImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center' }}>
          
        <div className="flex justify-end w-full">
          <button className="flex bg-yellow-500 p-4 mt-5 mr-10 rounded-md cursor-pointer font-bold justify-end "
          onClick={handleLogout}>
              SignOut
          </button>
        </div>
        <Search />
        
        <div className="play-list px-1 py-5">
          <div className="play-list flex flex-col sm:flex-row justify-center rounded-md w-full gap-20">
            <div
              className="flex items-center bg-gray-500 p-4 rounded-md cursor-pointer sm:w-1/4"
              onClick={handleMyPlaylistClick}
              >
              <div className="w-16 h-16 bg-blue-500 flex-shrink-0 mr-4"></div>
              <span className="text-lg font-bold">My Play List</span>
            </div>

            <div
              className="flex items-center bg-gray-500 p-4 rounded-md cursor-pointer sm:w-1/4"
              onClick={handleAllPlaylistClick}
              >
              <div className="w-16 h-16 bg-green-500 flex-shrink-0 mr-4"></div>
              <span className="text-lg font-bold">All Play List</span>
            </div>
            <div>

            <button className="flex bg-yellow-500 p-4 rounded-md cursor-pointer font-bold "
            onClick={()=>setShow(true)}>
              create PlayList
            </button>
         
        </div>
          </div>
          {show && (
                  <Modal.Container>
                    <Modal.CardForm  onClose={() => setShow(false)}>
                      <form onSubmit={handleSubmit(submit)}>
                        <div>
                          <div className="flex justify-between mb-4 w-[100%]">
                            <div>
                              <h1 className="font-bold text-2xl  text-zinc-200">Make Your PlayList</h1>
                            </div>
                            <div className="mr-1">
                              <IoCloseCircle
                                className="w-10 h-10 bg-[red]"
                                onClick={() => setShow(false)}
                              />
                            </div>
                          </div>

                          <div className="flex flex-col justify-start">
                            <h2 className="text-start mb-2 mt-2 bold">Public/Private</h2>
                            <select
                              className="h-[40px] mr-3 px-4 w-[30rem] text-xl rounded-[20px]"
                              {...register('type', {
                                
                              })}
                            >
                              {' '}
                              <option
                                className="py-3 text-sm"
                                value=""
                                disabled
                                selected
                                hidden
                              >
                                Select a Type
                              </option>
                              <option value="private">Private</option>
                              <option value="public">Public </option>
                            </select>
                          </div>
                          <div className="flex flex-col mt-4 justify-start">
                            <h2 className="text-start  mt-2 bold">List Name</h2>
                            <input
                                className="h-[40px] mr-3 px-4  text-xl "
                                {...register('name', {
                                  
                                })}
                              >
                            </input>
                          </div>
                          <div className="mt-8 flex justify-center " style={{ fontWeight: 'bold' }}>
                            <button
                              type="submit"
                              className="bg-[#FFC60C] text-[#232323]  rounded-[20px] font-bold w-[150px] h-[30px] "
                            >
                              {' '}
                              Add
                            </button>
                          </div>
                        </div>
                      </form>
                    </Modal.CardForm>
                  </Modal.Container>
                )}
        </div>
        
        <Movie />
      </div>
    </>
  );
};

export default Home;