const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateForgotPasswordInput = require("../../validation/forgotPassword");
const validateResetPasswordInput = require("../../validation/resetPassword");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();
const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
var LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");

const User = require("../../models/User/User");
const NFChip = require("../../models/User/NFChip")


router.post("/register", function (req, res) {

  //Dans le post-acheminement du registre, nous vérifions d’abord la validation de toutes nos entrées.
  // Si les erreurs existent, le processus ultérieur n'est pas nécessaire. Donc renvoyé la réponse d' erreur au client.
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  //Ensuite, nous vérifions si l'email existe déjà, si nous devons envoyer une réponse d'erreur au client.
  const email = req.body.email;
  User.findOne({
    email
  }).then(user => {
    if (user) {
      return res.status(400).json({
        email: "Email already exists"
      });
    } else {
      //Sinon, nous récupérons l'avatar en fonction de l'adresse e-mail.
      // Si un avatar n'y est pas, il sera renvoyé par défaut en réponse.
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      //Ensuite, nous créons un token afin de l'intégrer au lien de confirmation d'inscription
      const token = crypto.randomBytes(100).toString("hex");
      let tokenExpires = Date.now() + 90000;

      const apikeyToken = crypto.randomBytes(48).toString('hex');
      let newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        token: token,
        tokenExpires: Date.now() + 900000,
        avatar,
        apikey: apikeyToken
      });

      // Nous envoyons le mail à l'utilisateur avec le lien ou nous avons intégré le token précedement générer
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD
        }
      });

      const mailOptions = {
        from: `aire-cube@gmail.com`,
        to: `${newUser.email}`,
        subject: `Bienvenue sur My-flash`,
        text:
          `Bienvenue \n\n ` +
          `Rendez-vous sur ce lien afin de valider votre inscription, le lien sera valide pendant 15 minutes : \n\n` +
          `http://localhost:3000/confirm/${token} \n\n` +
          `Si vous n'avez pas fait cette demande, vous pouvez ignorer cet email. \n`
      };
      transporter.sendMail(mailOptions, function (err, response) {
        if (err) {
          console.error("there was an error : ", err);
          return res.status(404).json("Le mail n'a pas été envoyé");
        } else {
          res.status(200).send({
            message: "email envoyé"
          })
        }
      });

      // on stocke dans le localstorage l'objet'newUser qu'on transforme en une
      // chaîne de caractères JSON
      localStorage.setItem("newUser", JSON.stringify(newUser));
      localStorage.setItem("tokenExpires", JSON.stringify(tokenExpires));


      // on crée une route pour confirmer l'inscription et la sauvegarde des données
      router.post(`/register/confirm/:token`, function (req, res) {

        // on crée une nouvelle variable qu'on transformera en objet User
        // qui récupéra les données mis dans le localstorage
        // on utilise JSON.parse pour retransformer la chaîne de caractère en objet
        let newuser = null;
        tokenExpires = JSON.parse(localStorage.getItem("tokenExpires"));
        if (localStorage !== null) {
          newuser = new User({
            ...JSON.parse(localStorage.getItem("newUser"))
          });
        } else {
          return;
        }
        let date = Date.now();

        if (
          newuser.password === undefined ||
          tokenExpires - date < 0
        ) {
          console.error("Le lien est invalide ou le délai de validation est dépassé");
          res.status(400).json(errors);
          // nous effaçons les données du localstorage
          localStorage.clear();
        } else {
          //Nous créons une valeur de hachage du mot de passe
          bcrypt.genSalt(10, (err, salt) => {
            if (err) console.error("There was an error", err);
            else {
              bcrypt.hash(newuser.password, salt, (err, hash) => {
                if (err) console.error("There was an error", err);
                else {
                  newuser.password = hash;
                  newUser.token = null;
                  newUser.tokenExpires = null;

                  //Nous enregistrons l’utilisateur dans la base de données et le renvoyons au client.
                  newuser.save().then(user => {
                    res.json(user);
                    // nous effaçons les données du localstorage
                    localStorage.clear();
                  });
                }
              });
            }
          });
        }
      });
    }
  });
});

const loginAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message:
    { error: "Trop de requêtes effectuées, merci de réessayer dans une heure" },
  skipSuccessfulRequests: true
});

router.post("/login", loginAccountLimiter, (req, res) => {
  // Nous vérifions le courrier électronique. Si le courrier électronique n’est pas trouvé,
  // nous renverrons l’erreur au client en lui disant que cet utilisateur n’a pas été trouvé.
  let { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  //Si le courrier électronique est correct, nous vérifions le mot de passe à l'aide de la méthode de comparaison de bcrypt. 
  //Si la correspondance est trouvée, nous devons générer le jeton jwt .

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.error = "Email ou mot de passe incorrect";
      return res.status(400).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          avatar: user.avatar
        };
        jwt.sign(
          payload,
          "secret",
          {
            expiresIn: 3600
          },
          (err, token) => {
            if (err) console.error("There is some error in token", err);
            else {
              //Nous utilisons l'objet utilisateur comme une charge utile et donner une clé secrète pour générer JWT jeton 
              //et renvoyer ce jeton à l'utilisateur et connecté à l'utilisateur.
              res.json({
                success: true,
                token: `Bearer ${token}`
              });
            }
          }
        );
      } else {
        errors.error = "Email ou mot de passe incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

//Création de la route Mot de pass oublié
router.post("/forgotPassword", (req, res) => {
  // nous vérifions d’abord la validation de toutes nos entrées. Si les erreurs existent, le processus ultérieur n'est pas nécessaire.
  // Donc renvoyé la réponse d' erreur au client.
  const { errors, isValid } = validateForgotPasswordInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  //Ensuite, vérifiez le courrier électronique. Si le courrier électronique n’est pas trouvé,
  // nous renverrons l’erreur au client en lui disant que cet utilisateur n’a pas été trouvé.
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    } else {
      // Nous générons un token.
      //Nous définissons un horodatage pour combien de temps ce jeton sera valide.
      //Nous enregistrons ces valeurs dans le profil du client
      const token = crypto.randomBytes(20).toString("hex");
      user.token = token;
      user.tokenExpires = Date.now() + 600000;
      user.save();

      //Nous envoyons le lien de courrier électronique de réinitialisation du mot de passe au client.
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD
        }
      });

      const mailOptions = {
        from: `bourvaljonathan@gmail.com`,
        to: `${user.email}`,
        subject: `Réinitialisation du mot de passe`,
        text:
          `Vous avez recu, ce message car vous (ou une autre personne) avait fait la demande pour réinitialiser le mot de passe. \n\n ` +
          `Rendez-vous sur ce lien afin de compléter le processus, le lien sera valide pendant 10 minutes : \n\n` +
          `http://localhost:3000/resetPassword/${token} \n\n` +
          `Si vous n'avez pas fait cette demande, vous pouvez ignorer cet email et votre mot de passe restera inchanger. \n`
      };
      transporter.sendMail(mailOptions, function (err, response) {
        if (err) {
          console.error("there was an error : ", err);
        } else {
          res.status(200).json("recovery email sent");
        }
      });
    }
  });
});


//Si l'utilisateur est connecté et qu'il possède le jeton jwt, il pourra alors accéder à cette route,
// sinon il sera redirigé pour se connecter car cette route est protégée.
// Sert a retrouver l'utilisateur si il est connecté
router.get("/me", passport.authenticate("jwt", { session: false }), (req, res) => {
  return res.json({
    id: req.user.id,
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    email: req.user.email,
    apikey: req.user.apikey
  });
}
);

// Création de la route qui nous permettra de vérifier si le token est toujours valide
router.get("/reset/:token", function (req, res) {
  let date = Date.now();
  //nous vérifions si le token corresponds à un client, sinon nous devons envoyer une réponse d'erreur au client.
  User.findOne({
    token: req.params.token
  }).then(user => {
    if (user == null || user.tokenExpires - date < 0) {
      console.error("le lien a expiré ou est invalide");
      res.json("lien expiré ou invalide");
    } else {
      res.status(200).send({
        email: user.email,
        message: "le lien du mot de passe est valide"
      });
    }
  });
});

//Création de la route que nous appelerons pour mettre à jour le nouveau mot de passe
router.post("/reset/:token", (req, res) => {
  const {
    errors,
    isValid
  } = validateResetPasswordInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  //Nous vérifions le courrier électronique. Si le courrier électronique n’est pas trouvé, 
  //nous renverrons l’erreur au client en lui disant que cet utilisateur n’a pas été trouvé.
  const email = req.body.email;
  User.findOne({
    email
  }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) console.error("There was an error", err);
        else {
          //Ensuite, nous créons une valeur de hachage du mot de passe,
          //Nous remettons a 'null' le token et son horodatage
          // Nous enregistrons l’utilisateur dans la base de données
          // et nous renvoyons au client un mail qui confirmera que son mot de passe a bien été changer.
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) console.error("There was an error", err);
            else {
              user.password = hash;
              user.token = null;
              user.tokenExpires = null;
              user.save().then(user => {
                res.json(user);
              });
              const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                auth: {
                  user: process.env.EMAIL_ADDRESS,
                  pass: process.env.EMAIL_PASSWORD
                }
              });
              const mailOptions = {
                from: `bourvaljonathan@gmail.com`,
                to: `${user.email}`,
                subject: `Votre mot de passe a été changer`,
                text: `Bonjour. \n\n ` +
                  `Nous vous confirmation que votre changement de mot de passe de votre compte a bien été prit en compte. \n` +
                  `Cordialement l'équipe Aire Cube . \n`
              };
              transporter.sendMail(mailOptions, function (err, response) {
                if (err) {
                  console.error("there was an error : ", err);
                } else {
                  res.status(200).json("recovery email sent");
                }
              });
            }
          });
        }
      });
    }
  });
});

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

router.get('/me', passport.authenticate('jwt'), (req, res) => {
  User.findById(req.user._id, {
    password: 0
  }, // projection
    function (err, user) {
      if (err) return res.status(500).send("There was a problem finding the user.\n", err);
      if (!user) return res.status(404).send("No user found.");
      return res.json({
        success: true,
        apikey: req.user.apikey
      });
    });
});

router.get("/register/confirm/:token", function (req, res) {
  let dateNow = Date.now();
  let tokenExpires = JSON.parse(localStorage.getItem("tokenExpires"));
  let newUser = new User({
    ...JSON.parse(localStorage.getItem("newUser"))
  });
  newUser.token = req.params.token;
  if (tokenExpires - dateNow < 0) {
    console.error("le lien a expiré ou est invalide");
    res.json("lien expiré ou invalide");
  } else {
    if (newUser.password === undefined) {
      res.status(200).send({
        message: "le lien n'est pas valide"
      });
    } else {
      res.status(200).send({
        message: "le lien est valide"
      });
    }
  }
});

//Création du router qui nous permettra de récupérer le nombre d'utilisateur inscrit
router.get('/infos', (req, res) => {
  User.find({})
    .exec((err, User) => {
      if (err) {
        res.status(500).json({ message: err })
      }
      res.status(200).json({ message: 'ok', data: User })
    })
})

//********************************** Partie du upload image *******************************/
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
})

router.post('/upload', upload.single('myImage'), function (req, res) {
  (err) => {
    console.log('Request --', req.body);
    console.log('Request file ---', req.file);
    if (!err) {
      return res.send(200).end();
    }
  }
})
/********************************************************************************************/



/**************************************** Partie Puce NFC *********************************/

router.get("/findChip/:chipId", function (req, res) {
  NFChip.findOne({ chipId: req.params.chipId }).then(chipFound => {
    if (chipFound) {
      res.send({ message: "Chip found", found: true, userId: chipFound.user });
    } else {
      res.send({ message: "Chip not found", found: false });
    }
  });
})

router.get("/chipUser/:chipUserId", function (req, res) {
  User.findById(req.params.chipUserId, function (err, userFound) {
    if (err) return res.status(500).send("There was a problem finding the user.\n", err);
    res.send({
      chipUserApikey: userFound.apikey,
      firstname: userFound.firstname,
      lastname: userFound.lastname
    }).status(200)
  })
})

router.post("/addChip/:chipId/:apikey", function (req, res) {
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };
  User.findOne({ apikey: req.params.apikey }, function (err, userFound) {
    if (err) return res.status(500).send("There was a problem finding the user.\n", err);
    var chipToUpdate = new NFChip({
      user: userFound._id
    });
    delete chipToUpdate._id;
    NFChip.findOneAndUpdate({ chipId: req.params.chipId }, chipToUpdate, options, function (error, chipFound) {
      if (err) console.log("Error : \n", err)
      res.send({ message: "Chip was added to your account" });
    });
  });
});


//Création du router qui nous permettra de récupérer le nombre d'utilisateur inscrit
router.get("/allUserChip/:userId", (req, res) => {
  NFChip.find({ user: req.params.userId }).exec((err, chips) => {
    if (err) {
      res.status(500).json({ message: err })
    }
    res.status(200).json({ message: 'ok', data: chips })
  })
})

module.exports = router;
