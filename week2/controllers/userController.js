 'use strict';
// userController
const userModel = require('../models/userModel');

const users = userModel.users;

const getUserList = async (req, res) => {
    try {
      const users = await userModel.getAllUsers();
      console.log(users);
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  const postUser =  async (req,res) => {
    console.log(req.body);
    res.redirect("http://localhost:52330/week2/example-ui/ui1/front.html");
  }
const getUser = async (req, res) => {
    try {
      const user = await userModel.getUser(req.params.id);
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
const user_create_post = async (req,res) => {
  try {
    userModel.addUser(req)
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error')
  }
};
module.exports = {
    getUserList,getUser,postUser,user_create_post
};