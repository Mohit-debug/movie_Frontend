import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import SingleMovie from "./SingleMovie";
import Error from "./Error";
import "./App.css";
import LoginPage from "./Components/LoginPage";
import SignUpPage from "./Components/SignUpPage";
import MyPlayList from "./MyPlayList";
import AllPlayList from "./AllPlayList";
import { useUserStore } from "./hooks/UseUserStore";
import RequireAuth from "./Auth/index"
import axios from "axios";
import instance from '../src/api/axios'
const App = () => {
  const setLogin = useUserStore(state=>state.login)
  const setIsFetching = useUserStore(state => state.setIsFetching);
  const isAuthenticated = useUserStore(state => state.isAuthenticated);
  async function fetchUser() {
    try {
      console.log("Fetching user profile...");
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
  
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
  
      const response = await axios.get('http://localhost:5000/api/user/profile', config);
      const { user } = response.data;
      console.log({ user }, '1234');
      setLogin(user, token);
    } catch (err) {
      console.error({ err: err.message });
    } finally {
      setIsFetching(false);
    }
  }
  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setLogin,isAuthenticated,setIsFetching]);
  return (
    <>
      
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/home" element={<RequireAuth redirect="/"><Home /></RequireAuth>} />
          <Route path="/home/myplaylist" element={ <MyPlayList /> } />
          <Route path="/home/movie/:id" element={ <SingleMovie /> } />
          <Route path="/home/allplaylist" element={ <AllPlayList /> } />
          <Route path="*" element={<Error />} />
        </Routes>
      
    </>
  );
};

export default App;