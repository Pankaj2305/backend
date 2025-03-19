import React from "react";
import { useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";


const Home = () => {


  const [Data, setData] = useState([]);
  const navigate = useNavigate();
   
  
    useEffect(() => {
      axios
        .get("http://localhost:3000/user/Home")
        .then((response) => {
          setData(response.data); 
        });
    }, []);

    const handleEdit = (id)=>{
      navigate (`/update/${id}`)
    }

  return (
    

    <div className="bg-gray-50 min-h-screen flex flex-col">

      <header className="bg-white shadow-md py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Instagram</h1>
          
          <div className="flex items-center bg-gray-100 p-2 rounded-lg max-w-md w-full">
            <input 
              type="text" 
              placeholder="Search"
              className="bg-transparent outline-none flex-1 px-2 text-sm"
            />
          </div>
          
          <div className="flex space-x-6">
            <i className="text-xl text-gray-600 hover:text-black cursor-pointer">🏠</i>
            <i className="text-xl text-gray-600 hover:text-black cursor-pointer">❤️</i>
            <i className="text-xl text-gray-600 hover:text-black cursor-pointer">✉️</i>
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white cursor-pointer">
              <span className="font-semibold text-sm">U</span>
            </div>
          </div>
        </div>
      </header>

      <section className="py-4 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex space-x-6 overflow-x-auto">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-pink-500 rounded-full flex items-center justify-center text-white mb-2">
              <span className="font-semibold text-sm">YS</span>
            </div>
            <p className="text-xs text-center">Your Story</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-pink-500 rounded-full flex items-center justify-center text-white mb-2">
              <span className="font-semibold text-sm">U1</span>
            </div>
            <p className="text-xs text-center">User1</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-pink-500 rounded-full flex items-center justify-center text-white mb-2">
              <span className="font-semibold text-sm">U2</span>
            </div>
            <p className="text-xs text-center">User2</p>
          </div>
        </div>
      </section>

      <section className="flex-1 py-6 px-6 bg-gray-100">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white">
                <span className="font-semibold text-sm">U1</span>
              </div>
              <div>
                <p className="font-semibold text-gray-700">User1</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            {Data.map((user) => (
            <div key={user._id} className="bg-gray-300 w-full h-64 rounded-lg mb-4">  
              <h5>Email: {user.email}</h5>
              <h5>Password: {user.password}</h5>
              <button className="bg-blue-400 p-3" onClick={()=>handleEdit(user._id)}>Update</button>
              </div> 
            ))}
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <i className="text-xl text-gray-600 hover:text-black cursor-pointer">❤️</i>
                <i className="text-xl text-gray-600 hover:text-black cursor-pointer">💬</i>
                <i className="text-xl text-gray-600 hover:text-black cursor-pointer">🔗</i>
              </div>
              <i className="text-xl text-gray-600 hover:text-black cursor-pointer">✉️</i>
            </div>
            <div className="mt-4">
              <p className="font-semibold text-gray-700">Likes: 256</p>
              <p className="text-gray-700">This is a sample post description. Lorem ipsum dolor sit amet.</p>
            </div>
          </div>

       
        </div>
      </section>

      <footer className="bg-white py-4 shadow-md">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">© 2025 Instagram, Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
