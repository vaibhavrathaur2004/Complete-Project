import React ,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const userlogin = () => {
  const navigate = useNavigate()
    const [formdata ,setFormdata] = useState({
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
            const {  email, password } = formdata;
    
            try {
                const response = await axios.post("http://localhost:4000/api/user/login", {
                email,
                password,
                },{withCredentials:true});

                navigate("/home")
    
                // console.log(response.data);
            } catch (err) {
                console.error("Registration failed", err);
            }
    };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={changeHandler}
            value={formdata.email}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            onChange={changeHandler}
            name="password"
            value={formdata.password}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

         <p className="text-center text-sm pt-2 text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
};
export default userlogin