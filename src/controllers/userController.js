const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

module.exports.newUser = (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password
  };

  const newUser = new User(data);

  newUser.save((error, doc) => {
    if (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
    res.json(doc);
  });
};

module.exports.login = async (req, res) => {
  const email = req.body.email;
  try {
      
  } catch (error) {
      
  }
    const token = jwt.sign({
        data: 'foobar'
      }, 'secret', { expiresIn: 60 * 60 });
      
  const user = await User.findOne({ email }).exec((err, doc) =>
    console.log(doc)
  );

  console.log(user);

  res.status(200).json(user);
};

module.exports.updatePass = async (req, res) => {
  const newPassword = req.body.newPassword;
  const id = req.body.id;

  console.log(req.body);

  const userUpdate = await User.findById({ _id: id });
  userUpdate.password = newPassword;
<<<<<<< HEAD
  await userUpdate.save();
=======
  //userUpdate.generateHash();
  await userUpdate.save();

>>>>>>> parent of ac5cdd7... added user model
  res.send(userUpdate);

  // User.findByIdAndUpdate(id, { password: newPassword }, (err, doc) => {
  //   if (err) res.json({ message: err.message });
  //   res.json(doc);
  // });

  // User.findOneAndUpdate(
  //   { _id: id },
  //   { $set: { password: newPassword } },
  //   { new: true },
  //   (err, doc) => {
  //     if (err) console.log(err);
  //     doc.save((err, doc) => {
  //       if (err) console.log(err);
  //       console.log(doc);
  //     });
  //     console.log(doc);
  //   }
  // );
};

module.exports.logout = (req, res) => {
  res.json({
    message: "User successfully Logout"
  });
};
