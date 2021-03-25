import express from 'express';
import mongoose from "mongoose";
import multer from 'multer';
const router = express.Router();
const registerTemplate = require('../models/User');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });

router.post('/register',upload.single('image'), (req, res, next) => {
  let errors= {};
  registerTemplate.findOne({ userName: req.body.userName }).then(user => {
      if (user) {
          errors = 'UserName already exists';
          return res.status(400).json(errors);
      } else {
        const newUser = new registerTemplate({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          userName: req.body.userName,
          password: req.body.password,
          dob: req.body.dob,
          gender: req.body.gender,
          image: req.file.path
      })
      newUser.save().then(data =>{
        res.json({
            message: "User created successfully",
            result: data
            });
        })
        .catch(error =>{
            res.json(error);
        });

      }
  });
});
router.post('/auth', (request, response)=> {
  let username = request.body.userName;
  let password = request.body.password;
  if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
    response.send({
      message:"Logged in Successfully...",
      status: 200,
      username: username,
      isAuthenticated: true
    });
  } else {
    response.send('Please enter valid Username and Password!');
    response.end();
  }
});

module.exports = router;