const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Blog = require('./models/blogs');

const app = express();

mongoose.connect('mongodb+srv://vasilicacernovschi11:h6cO0zWhgpGZGPf9@cluster0.bwznyte.mongodb.net/node-angular?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.post('/api/blogs', (req, res, next) => {
  const blog = new Blog({
    title: req.body.title,
    description: req.body.description
  });
  blog.save().then(result => {
    console.log(result);
    res.status(201).json(
      {
        message: "Blog added succesfully to the database",
        blogId: result._id
      }
    )
  });
});

app.get('/api/blogs', (req, res, next) => {
   Blog.find()
    .then(documents => {
      // console.log(documents);
      res.status(200).json(
        {
          message: 'posts fetched succesfully', 
          blogs: documents
        }
      );
    });
});

// app.put("/api/posts/:id", (req, res, next) => {
//   const blog = new Blog({
//     _id: req.body.id,
//     title: req.body.title,
//     description: req.body.description,
//     imgSrc: req.body.imgSrc
//   });

//   Blog.updateOne({_id: req.params.id}, blog)
//     .then(result => {
//       console.log(result);
//       res.status(200).json({message: 'Update succesful!'});
//     });
// });

app.delete('/api/blogs/:id', (req, res, next) => {
  Blog.deleteOne({ _id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!"});
  })
})

module.exports = app;