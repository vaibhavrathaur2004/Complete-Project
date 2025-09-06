import React, { useState } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";


const FoodPartnerlogin = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit =async (e) => {
    e.preventDefault();
    const {email ,password} = formData
    
    try{
        const response =await axios.post("http://localhost:4000/api/loginfoodpartner",{
            email,
            password

        },{withCredentials:true})
        navigate("/create-food")
        console.log("Logging in as ", response.data);
    }catch(error){
        console.log(error.message);
        
    }
  
  
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
         Login
        </h2>

        {/* Toggle Switch */}
        {/* <div className="flex items-center justify-center space-x-4">
          <span className="text-sm text-gray-600">User</span>
          <button
            onClick={handleToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
              isFoodPartner ? "bg-indigo-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                isFoodPartner ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className="text-sm text-gray-600">Food Partner</span>
        </div> */}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 pl-2 block h-[35px] w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 pl-2 block  h-[35px]  w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your password"
            />
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
            >
              Login
            </button>
          </div>
        </form>

        {/* Don't have account */}
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/foodpartner-register" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FoodPartnerlogin;
