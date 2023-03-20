const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const cors = require('cors');
app.use(cors());
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {body,validator, validationResult}=  require('express-validator')


const SECRET_KEY = "qwertyuioplkjhnmbgvfcdxsaz12345628790@./,";

const mongoURL =
  "mongodb+srv://sabari12:sabari12@cluster12.u4edjlc.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((e) => {
    console.log(e);
  });

  require("./userDetails");


const User = mongoose.model("userInfo");

app.post("/register", 
[  body('uname').notEmpty().isLength({min:3}).withMessage('Username is required'),
   body('fname').notEmpty().withMessage('name is required'),
   body('date').isDate().withMessage('Invalid date format'),
   body('desig').notEmpty().withMessage('Please select atleast one'),
   body('email').isEmail().withMessage('Invalid email address'),
   body('password').isLength({min:6}).withMessage('Password should be 6 or more characters'),
   body('phone').notEmpty().isLength({min:10}).withMessage('Enter a valid mobile number')],
  async (req, res) => {
  const errors = await validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors:errors.array()});
  }

  const {uname,fname,date,desig,email,password,phone} = req.body;

  const encryptedPassword = await bcrypt.hash(password,6);


  try {

    const existingUser = await User.findOne({email});

    if (existingUser) {
      return res.send({error : "User Exists"});
    }

    await User.create({
      uname,
      fname,
      date,
      desig,
      email,
      password : encryptedPassword,
      phone,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({status:"error"},console.log(error));
  }
});

app.post("/login",async (req,res) =>{
  const {email,password} = req.body;

  const registeredUser = await User.findOne({email});

  if (!registeredUser) {
    return res.json({error:"user not found"});
  }

  if(await bcrypt.compare(password,registeredUser.password)){
    const token = jwt.sign({email:registeredUser.email},SECRET_KEY);
    if (res.status(201)) {
      return res.json({status:"ok",data:token});
    } else {
      return res.json({error:"error"});
    }                                                                          
  }
  res.json({status:"error",error:"invlid password"});
});

  app.post("/userData",async(req,res) =>{
    const {token} = req.body;

    try {
      const user = jwt.verify(token,SECRET_KEY);
      const useremail = user.email;
      User.findOne({email:useremail})
      .then((data) => {
        res.send({status:"ok", data : data});
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });

    } catch (error) {
      
    }

  })




app.listen("5000", console.log("server started successfully"));








