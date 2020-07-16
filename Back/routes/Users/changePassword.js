const bcrypt = require("bcryptjs");
const validateChangePasswordInput = require("../../validation/change-password");
const express = require("express");
const router = express.Router();

const User = require("../../models/User/User");
var LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");

router.post("/changePassword/:apikey", function(req, res) {
  const { errors, isValid } = validateChangePasswordInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const password = req.body.password;
  User.findOne({ apikey: req.params.apikey }).then(user => {
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        localStorage.setItem(
          "passwordChanged",
          "le mot de passe est sauvegardé"
        );
        user.password = req.body.newPassword;
        bcrypt.genSalt(10, (err, salt) => {
          if (err) console.error("There was an error", err);
          else {
            bcrypt.hash(user.password, salt, (err, hash) => {
              if (err) console.error("There was an error", err);
              else {
                user.password = hash;
                user.save().then(user => {
                  res.json(user);
                });
              }
            });
          }
        });
      } else {
        errors.password = "Incorrect Password";
        return res.status(400).json(errors);
      }
    });
  });
});

router.get("/changePassword/:apikey", function(req, res) {
  let passwordchanged = null;
  passwordchanged = localStorage.getItem("passwordChanged");
  if(passwordchanged === "le mot de passe est sauvegardé") {
    localStorage.clear();
    passwordchanged = null;
    res.status(200).send({
      message: "mot de passe actualisé"
    });
  } else {
  passwordchanged = null;
  localStorage.clear();
    return res.status(404).json("Une erreur est survenu");
  }
});

module.exports = router;
