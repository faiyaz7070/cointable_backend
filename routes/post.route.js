const express=require("express");
const postRouter=express.Router();
const axios = require('axios');
const Post=require("../models/post.model");

// postRouter.get('/posts/:userId', async (req, res) => {
//     const userId = req.params.userId;
//     try {
//       const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
//       const posts = response.data;
//       res.json(posts);
//     } catch (error) {
//       res.status(500).send('Error fetching posts');
//     }
//   });

postRouter.get('/posts/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}&_limit=1`);
      const post = response.data[0]; // Retrieve the first post from the response array
      if (!post) {
          return res.status(404).send('No post found for the specified user');
      }
      res.json(post);
  } catch (error) {
      res.status(500).send('Error fetching post');
  }
});



// Bulk add posts to MongoDB
postRouter.post('/posts/:userId', async (req, res) => {
    const userId = req.params.userId;
    const postsData = req.body;
    try {
      await Post.insertMany(postsData.map(post => ({ userId, title: post.title, body: post.body })));
      res.send('Posts added successfully');
    } catch (error) {
      res.status(500).send('Error adding posts to database');
    }
  });


// Download posts in Excel format (Not implemented for MongoDB)
postRouter.get('/download/:userId', (req, res) => {
    res.status(501).send('Download in Excel is not implemented for MongoDB');
});


module.exports=postRouter;