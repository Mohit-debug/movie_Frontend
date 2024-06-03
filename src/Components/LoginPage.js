import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import loginImage from "../asstes/loginImage2.jpg";

const LoginPage = () => {

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    phonenumber: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log({name})
    console.log({value})
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleChange1 = (e) => {
    const { name, value } = e.target;
    console.log({name})
    console.log({value})
    setFormData({
      ...formData,
      [name]: value
    });
  };
 console.log({formData})
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('urn:ietf:wg:oauth:2.0:oob/api/user/login', {
      
          email: formData?.email,
          password: formData?.password
        
      });
      console.log({response});
      localStorage.setItem('token', response.data.accessToken)
      navigate('/home');
    } catch (error) {
      console.error(error);
      setErrorMessage('User Not Found');
    }
  };


  return (
      
      <div className="flex items-center justify-center h-screen bg-center bg-cover"
        style={{ backgroundImage: `url(${loginImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center' }}>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white bg-opacity-80 p-8 rounded-md">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-10">
            <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-zinc-800">
              Login in your account
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
                  onChange={handleChange1}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
            {errorMessage && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{errorMessage}</span>
              </div>
            )}
          </form>

          <p className="mt-10 text-center text-xl text-zinc-800">
            Already a member?{" "}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-red-600 hover:text-zinc-800"
              style={{ display: 'inline', border: 'none', background: 'none', }}
            >
              SignUp
            </Link>
          </p>
        </div>
      </div>
    
  );
};

export default LoginPage;
