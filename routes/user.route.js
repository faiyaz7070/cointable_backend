const express=require("express");
const userRouter=express.Router();
const axios = require('axios');
const User=require("../models/user.model");

// Get all users from API
userRouter.get('/users', async (req, res) => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      const users = response.data;
      res.json(users);
    } catch (error) {
      res.status(500).send('Error fetching users');
    }
  });

  // Add user to MongoDB
  userRouter.post('/users', async (req, res) => {
    const userData = req.body;
    try {
      const newUser = new User(userData);
      await newUser.save();
      res.send('User added successfully');
    } catch (error) {
      res.status(500).send('Error adding user to database');
    }
  });


  module.exports=userRouter;