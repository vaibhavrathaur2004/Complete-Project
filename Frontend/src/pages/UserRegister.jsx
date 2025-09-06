import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const UserRegister = () => {
    const navigate = useNavigate()
    const [formdata ,setFormdata] = useState({
        username:"",
        email:"",
        password:"",
    })

    const changeHandler = (e) =>{
        setFormdata(prev =>( {
            ...prev,
            [e.target.name]:e.target.value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password } = formdata;

        try {
            const response = await axios.post("http://localhost:4000/api/user/register", {
            username,
            email,
            password,
            },{withCredentials:true});
            navigate("/home")

            console.log(response.data);
        } catch (err) {
            console.error("Registration failed", err);
        }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">User Register</h2>

        <div className='mb-4 p-1 flex text-sm items-center  gap-2  border-black bg-[#3d3a3a] rounded-full w-fit px-2 py-2'>
            <Link to="" className="px-1.5  py-1.5 rounded-full text-white bg-neutral-500 hover:bg-blue-600">
                Register As User
            </Link>

            <Link to="/foodpartner-register" className=" hover:bg-blue-600 px-1.5 bg-neutral-500 py-1.5 rounded-full text-white " >
                Register As Food Partner
            </Link>
        </div>

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formdata.username}
            required
            placeholder='Jhon'
            onChange={changeHandler}
            className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder='Jhon@gmail'
            value={formdata.email}
            onChange={changeHandler}
            required
            className="mt-1  block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder='********'
            name="password"
            onChange={changeHandler}
            value={formdata.password}
            required
            className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-600 pt-2">
                  Don’t have an account?{" "}
                  <Link to="/user-login" className="text-indigo-600 hover:underline">
                    Sign up
                  </Link>
                </p>

      </form>
    </div>
  );
}

export default UserRegister