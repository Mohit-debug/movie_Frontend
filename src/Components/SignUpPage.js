import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import loginImage from "../asstes/loginImage2.jpg";
import instance from '../api/axios';

const SignUpPage = () => {

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    phonenumber: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('urn:ietf:wg:oauth:2.0:oob/api/user/signup', formData);
      console.log({response});
      // Handle success (e.g., redirect to login page or show success message)
      navigate('/');
      const data = await instance.post('/user/movie/add',{
        user:response.data.user?._id
      })
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show error message)
    }
  };


  return (
    
      <div className="flex items-center justify-center h-screen px-6 py-12 lg:px-8 bg-center bg-cover"
        style={{ backgroundImage: `url(${loginImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center' }}>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white bg-opacity-80 p-8 rounded-md">

          <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-10">
            <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-zinc-800">
              Create your account
            </h2>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-bold leading-6 text-zinc-800"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-lg font-bold leading-6 text-zinc-800"
              >
                User Name
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-lg font-bold leading-6 text-zinc-800"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phonenumber"
                className="block text-lg font-bold leading-6 text-zinc-800"
              >
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="phonenumber"
                  name="phonenumber"
                  type="phonenumber"
                  autoComplete="phonenumber"
                  required
                  value={formData.phonenumber}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-lg text-zinc-800">
            Already a member?{" "}
            <Link
              to="/"
              className="font-semibold leading-6 text-red-600 hover:text-zinc-800"
              style={{ display: 'inline', border: 'none', background: 'none', }}
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    
  );
};

export default SignUpPage;
