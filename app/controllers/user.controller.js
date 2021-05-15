
const config = require("../config/auth.config");
var  {student} =require ("../models/user.model");
const db = require("../models");
const User = db.user;
const Role = db.role;
var ObjectId = require('mongoose').Types.ObjectId;
  
var bcrypt = require("bcryptjs");


  
exports.addstudent = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
  
}
exports.updatestudent = (req, res) => {

if (!ObjectId.isValid.JSON.parse(req.params.id))
        return res.status(400).send(`No record with given id : JSON.parse${req.params.id}`);

    var emp = {
        username:JSON.parse( req.body.username),
        email: JSON.parse(req.body.email),
        password:JSON.parse(req.body.password),
        
    };
    User.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
    });
  };
exports.delete= (req, res) => {
const id = req.params.id;
User.findByIdAndRemove(req.params.id)
.then((user) => {
if (!user) {
  return res.status(404).send({
    message: "User not found ",
  });
}
res.send({ message: "User deleted successfully!" });
})
.catch((err) => {
return res.status(500).send({
  message: "Could not delete user ",
});
});
};

