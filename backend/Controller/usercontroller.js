const UserModel = require('../model/user');
const bcrypt = require('bcrypt');
const { error } = require('console');
const jwt = require('jsonwebtoken'); // For JWT token generation

const Signup = (req, res) => {
  const { name, email, password } = req.body;

  UserModel.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }

      bcrypt.hash(password, 10)
        .then((hashedPassword) => {
          return UserModel.create({ name, email, password: hashedPassword });
        })
        .then((user) => {
          res.json({ message: "User created successfully", user });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ message: "An error occurred while creating the user", error: err });
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "An error occurred while checking the user", error: err });
    });
};


const Login = (req, res) => {
  const { email, password } = req.body;

  UserModel.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
          }

          const token = jwt.sign({ id: user._id, email: user.email }, 'your-secret-key', {
            expiresIn: '1h', // Token expires in 1 hour
          });

          res.json({
            message: "Login Successful",
            token, // Send token in the response
            user: {
              id: user._id,
              email: user.email,
              name: user.name
            }
          });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ message: "Error comparing passwords", error: err });
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "An error occurred during login", error: err });
    });
};
const Home= async(req,res)=>{
  try{
    const user=await UserModel.find();
    res.status(200).json(user)
  }
  catch(err){
    res.status(500).json(err)
  }
}
//get id
const getId=async(req,res)=>{
  try{
    const user=await UserModel.findById(req.params.id);
    if(!user) return res.status(404).json({error:"User not found"})
      res.json(user)
  }
  catch(err){
    res.status(500).json({err:"failed to fetch user"})

  }
};

//Update
const updateUser=async(req,res)=>{
  try{
    const {id}=req.params
    const {email}=req.body
    const userUpdate=await UserModel.findByIdAndUpdate(id,{email});
    if(!userUpdate){
       return res.status(404).json({error:"User not found"})
    }
      res.status(200).json({message:"user updated successfully",user:userUpdate})
  }
  catch(err){
    console.error("Error Updating user",err)
    res.status(500).json({err:"failed to fetch user"})

  }
};

// Delete
const deleteUser=async (req ,res) => {
  try{
    const {id} = req.params
    const userDelete =await UserModel.findByIdAndDelete(id);
    if(!userDelete) {
      return res.status(404).json({error:"User not found"})
    }
    res.status(200).json({message:"user  successfully"})
  }
  catch(err){
    console.error("Error Deleting user",err)
    res.status(500).json({err:"failed to fetch user"})

  }
}


module.exports = { Signup, Login,Home,getId,updateUser ,deleteUser};
