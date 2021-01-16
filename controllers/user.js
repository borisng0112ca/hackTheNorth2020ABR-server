const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/user');

const secret = 'hackthenorth2020abr';

async function login (req, res){

  const email = req.body.email;
  const password = req.body.password;

  try{
    const oldUser = await UserModel.findOne({email});

    if(!oldUser) return res.status(404).json({message: 'User does not exist'});

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({email: oldUser.email, id: oldUser._id}, secret, {expiresIn: '1h'});

    res.status(200).json({result: oldUser, token});
  }
  catch (err) {
    res.status(500).json({ message: "Error" });
  }
}

async function register (req, res){

  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  try{
    const oldUser = await UserModel.findOne({email});

    if(oldUser) return res.status(404).json({message: 'User already exists'});

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await UserModel.create(
      {
        username: username,
        email: email,
        password: hashedPassword,
      }
    );

    const token = jwt.sign( { email: newUser.email, id: newUser._id }, secret, { expiresIn: '1h'});
    
    res.status(201).json({result: newUser, token});
  }
  catch (err) {
    res.status(500).json({ message: "Error" });
    console.log(err);
  }
}

module.exports = {register, login};