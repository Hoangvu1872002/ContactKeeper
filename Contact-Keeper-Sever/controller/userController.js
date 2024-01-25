const asyncModel = require("express-async-handler");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const contactModel = require("../model/contactModel");

const userRegister = asyncModel(async (req, res) => {
  const userFind = await userModel.findOne({
    email: req.body.email,
  });
  const nameFind = await userModel.findOne({
    name: req.body.name,
  });
  if(userFind && nameFind){
    res.status(400);
    throw new Error("name va email da ton tai!");
  }else if (userFind) {
    res.status(400);
    throw new Error("email da ton tai!");
  }else if(nameFind){
    res.status(400);
    throw new Error("name da ton tai!");
  } else {
    try {
      
      const newUser = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
  
      const userInsert = await userModel.create(newUser);
  
      if (userInsert) {
        res.status(200).json({
          _id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          // token: jwt.sign({ _id: newUser.id }, "masobimat"),
        });
      } else {
        res.status(400);
        throw new Error("dang ki that bai!");
      }
    } catch (error) {
      res.status(400);
        throw new Error("dang ki that bai!");
    }
  }
});

const authLogin = asyncModel(async (req, res) => {
  const emailExists = await userModel.findOne({
    email: req.body.email,
  });

  if (!emailExists) {
    res.status(400);
    throw new Error("email khong ton tai!");
  } else {
    if (await bcrypt.compare(req.body.password, emailExists.password)) {
      res.json({
        // _id: emailExists.id,
        // name: emailExists.name,
        // email: emailExists.email,
        token: jwt.sign({ _id: emailExists.id }, "masobimat"),
        isAuthenticated: true,
      });
    } else {
      res.status(401);
      throw new Error("mat khau khong dung!");
    }
  }
});

const userPull = asyncModel(async (req, res) => {
  try {
    const user = req.user;
    res.json(user);
    //  console.log(req.user);
  } catch (error) {
    console.log(error);
  }
});

// const getUserProfile = asyncModel(async (req, res) => {

//   const getProfile = await userModel.findOne({ email: req.user.email });

//   if (getProfile) {
//       res.json({
//         name: getProfile.name,
//         email: getProfile.email,
//         password: getProfile.password,
//         isAuthenticated: true,
//       });
//   } else {
//       res.status(401);
//       throw new Error('khong lay duoc thong tin!');
//   }

// });
const updateUserProfile = asyncModel(async (req, res) => {
  
    //   const contactsUpdate = await contactModel.find({
    //     user: req.user.name
    // })
    
    const user = await userModel.findOne({
      _id: req.body._id,
    });

    const nameRepeat = await userModel.findOne({
      name: req.body.name
    })
    const emailRepeat = await userModel.findOne({
      email: req.body.email
    })
    // console.log(!!(nameRepeat) && (user.name !== nameRepeat.name) && !!(nameRepeat.name) );

    if(!!(nameRepeat) && (user.name !== nameRepeat.name) && !!(nameRepeat.name)){
      res.status(401);
      throw new Error("name da ton tai!");
    }else if(!!(emailRepeat) && (user.email !== emailRepeat.email) && !!(emailRepeat.email)){
      console.log("a");
      res.status(401);
      throw new Error("email da ton tai!");
    }else{
      try {
        if (!req.body.passworNow) {
          console.log("b");
          user.name = req.body.name;
          user.email = req.body.email;
        } else if (
          req.body.passworNow &&
          (await bcrypt.compare(req.body.passworNow, user.password))
        ) {
          console.log("c");
          user.name = req.body.name;
          user.email = req.body.email;
          user.password = req.body.passwordNew;
          // console.log(user);
        } else {
          res.status(401);
          throw new Error("mat khau hien tai khong dung!");
        }
    
        await user.save();
    
        const userUpdate = await userModel
          .findById({ _id: req.user.id })
          .select("-password");
        res.json(userUpdate);
      } catch (e) {
        console.log(e);
        res.status(401);
          throw new Error("mat khau hien tai khong dung!");
      }
    } 
});

const deleteUser = asyncModel(async (req, res) => {

      if (req.user._id) {
        // console.log(req.user._id);
          const userDelete = await userModel.findOne({_id: req.user._id});
          if(userDelete){
              try {
                  await userModel.deleteOne({
      
                      _id: req.user._id
                  })
                  res.status(200).send("thanh cong!");
              } catch (error) {
                  res.send('loi!');
              }
          }else{
              res.status(401);
              throw new Error('Khong tim thay id!');
          }
      } else {
          res.status(401);
              throw new Error('Khong tim thay id!');
      }
  })

module.exports = {
  userRegister,
  authLogin,
  userPull,
  updateUserProfile,
  // getUserProfile
  deleteUser,
};
