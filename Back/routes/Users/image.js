const express = require("express");
const router = express.Router();
const User = require("../../models/User/User");
const Image = require("../../models/User/image");
const Bandeau = require ('../../models/User/imageBack');

router.route("/uploadbase/:apikey").post((req, res, next) => {
  User.findOne({ apikey: req.params.apikey }).then(UserFound => {
    Image.findOne({ user: UserFound._id }).then(img => {
      if (img !== null) {
        img.imageData = req.body.imageData;
        img.save();
      } else {
        const newImage = new Image ({
          imageName: req.body.imageName,
          imageData: req.body.imageData,
          user: UserFound._id
        });
        newImage
          .save()
          .then(result => {
            res.status(200).json({
              success: true,
              document: result
            });
          })
          .catch(err => next(err));
      }
    });
  });
});

router.get("/profilImg/:apikey", function(req, res) {
  User.findOne({ apikey: req.params.apikey }, function(err, userImg) {
    if (err) return res.json("Utilisateur non trouvé");
    const queryJames = {
      user: userImg._id
    };
    Image.findOne(queryJames, function(err, img) {
      if (err) {
        return err;
      } else {
        let payloadImg = new Image({});
        if (img !== null) {
          payloadImg = Object.assign(img);
          return res
            .send({
              message: "photo de profil connu",
              profileImage: payloadImg
            })
            .status(200);
        } else {
          return res.send({ message: "Pas de photo de profil" });
        }
      }
    });
  });
});

/**************************************** Upload Image Bandeau ************************************/


router.route("/uploadBackImage/:apikey")
.post((req, res, next) => {
  User.findOne({ apikey: req.params.apikey }).then(UserFound => {
    Bandeau.findOne({ user: UserFound._id }).then( img => {
      if (img !== null) {
        img.bandeauData = req.body.bandeauData;
        img.save();
      } else {
        const newBandeau = new Bandeau({
          bandeauData: req.body.bandeauData,
          user: UserFound._id
        });
        newBandeau
          .save()
          .then(result => {
            res.status(200).json({
              success: true,
              document: result
            });
          })
          .catch(err => next(err));
      }
    });
  });
});

router.get("/ImgBack/:apikey", function(req, res) {
  User.findOne({ apikey: req.params.apikey }, function(err, userImg) {
    if (err) return res.json("Utilisateur non trouvé");
    const queryJames = {
      user: userImg._id
    };
    Bandeau.findOne(queryJames, function(err, img) {
      if (err) {
        return err;
      } else {
        let payloadImg = new Bandeau({});
        if (img !== null) {
          payloadImg = Object.assign(img);
          return res
            .send({
              message: "photo d'arriere plan connu",
              bandeauImage: payloadImg
            })
            .status(200);
        } else {
          return res.send({ message: "Pas de photo d'arriere plan" });
        }
      }
    });
  });
});
module.exports = router;
