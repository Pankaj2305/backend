import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Update = () => {
  const { id } = useParams();
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/user/profile/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   
    

    axios
      .put(`http://localhost:3000/user/Update/${id}`, data)
      .then((response) => {
        console.log("response", response.data);
        alert("Update successful");
        navigate("/Home");
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to update");
      });
  };

  // Delete

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;
  
    try {
      
      const response = await axios.delete(`http://localhost:3000/user/Delete/${id}`);
      
      console.log("User deleted:", response.data);
      alert('User successfully deleted');
      
      navigate('/Home');
      
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  return (
    <div className="justify-center">
      <form onSubmit={handleSubmit}>
        <label>Email :</label>
        <input
          type="email"
          placeholder="enter the email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        <label>Password :</label>
        <input type="password" placeholder="">
       </input>

        <div>
        <button type="button" onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
            Delete
          </button>
          <button style={{backgroundColor:'blue'}}type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default Update;
