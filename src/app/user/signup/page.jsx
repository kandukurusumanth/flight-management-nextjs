"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const token = localStorage.getItem("token")
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
        const {confirmPassword,...userData} = formData
        userData.role = 'USER'
        console.log(userData)
        const response = await axios.post('/api/user',userData)
        if(response.status===201){
            console.log(response.data.data.token)
            localStorage.setItem('token',response.data.data.token)
            setTimeout(() => {
                window.location.href="/flights"
            }, 100);
            
        }
    } catch (error) {
        console.log(error)
        alert('error while creating user')
    }
  }
  useEffect(() => {
    const handleKeyDown = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') {
            console.log('Copy attempt detected');
            alert('Not allowed to use Copy Commands')
            e.preventDefault();
        }        
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
        document.removeEventListener('keydown', handleKeyDown);
    };
    }, []);

  return token ? window.location.href="/flights" : (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Signup</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          />

          
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          />

    
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          />


          <input
            
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );

}

