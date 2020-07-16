const Admin = require('../../models/Admin/Admin');
const express = require('express');
const validateAdminInput = require("../../validation/Admin");
const validateRegisterAdminInput = require('../../validation/registerAdmin');
const LegalMentions = require('../../models/Admin/LegalMentions');
const validateResetPasswordAdmin = require('../../validation/resetPassAmin');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const router = express.Router();
const rateLimit = require("express-rate-limit");
var LocalStorage = require("node-localstorage").LocalStorage,
    localStorage = new LocalStorage("./scratch");

/***************************************************** Route Admin ********************************************/
const loginAdminLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 3, // start blocking after 5 requests
    message:
        { error: "Trop de requêtes effectuées, merci de réessayer dans une heure" },
    skipSuccessfulRequests: true
});

// on creer la route admin
router.post("/admin", loginAdminLimiter, (req, res) => {
// on omport l'objet errors et isValide de la fonction  validateAdminInput(requete , reponse)
    const { errors, isValid } = validateAdminInput(req.body);
    if (!isValid) {
//si l'objet isValide et different de isValid alor on retourn un erreur
        return res.status(400).json(errors);
    }
// on declare deux constante speudo et password qui sont égale  au corps de la requete  envoyer par l'utilisateur
    const pseudo = req.body.pseudo;
    const password = req.body.password;
// on recherche par rapport au model Admin si on trouve le pseudo dans la DB
    Admin.findOne({ pseudo }).then(admin => {
// si le pseudo ou le role du pseudo entrer et différent du pseudo dans la BD et aussi diff du role 
        if (!admin || admin.role !== 'super_admin') {
            errors.error = "Email ou mot de passe incorrect";
            return res.status(404).json(errors);
// alors on renvoie l'erreur avec comme description d'erreur la phrase suivante 
        }
// sinon on use la fonction compare de bscrypt qui compare le password de le l'objet
// admin dans la bd et le mpd taper par l'admin qui ce connect
        bcrypt.compare(password, admin.password).then(isMatch => {
            if (isMatch) {
// on envoie l'id admin et le pseudo dans 
                const payload = {
                    id: admin.id,
                    pseudo: admin.pseudo,
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
                            //Nous utilisons l'objet Admin comme une charge utile et donner une clé secrète pour générer JWT jeton 
                            //et renvoyer ce jeton à l'Admin et connecté à l'Admin.
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

/**************************************  Enregistrement de l'administrateur ************************************************/
router.post("/registerAdmin", function (req, res) {

    const { errors, isValid } = validateRegisterAdminInput(req.body);
    const pseudo = req.body.pseudo;

    if (!isValid) {
        return res.status(400).json(errors);
    }
    //recherche par pseudo  si il existe déjà genere une erreur
    Admin.findOne({ pseudo }).then(admin => {
        if (admin) {
            return res.status(400).json({ pseudo: "Ce pseudo existe déjà" });
        };
        //creation d'un objet Admin avec cet caractéristique 
        const newAdmin = new Admin({
            pseudo: req.body.pseudo,
            password: req.body.password,
            role: req.body.role
        });
        //Creation du salt
        bcrypt.genSalt(10, (err, salt) => {
            if (err) console.error("There was an error", err);
            else {
                // MDP crypté par bcrypt.hash()
                bcrypt.hash(newAdmin.password, salt, (err, hash) => {
                    if (err) console.error("There was an error", err);
                    else {
                        newAdmin.password = hash;
                        //Nous enregistrons l'admin dans la base de données et le renvoyons au client.
                        newAdmin.save().then(admin => {
                            res.json(admin);
                            // nous effaçons les données du localstorage
                            localStorage.clear();
                        });
                    }
                });
            }
        });
    })
});

/******************************************** Changement de mot de passe  Admin ************************************************/

//Création de la route que nous appelerons pour mettre à jour le nouveau mot de passe Admin
router.post("/reset/:token", (req, res) => {
    const {
        errors,
        isValid
    } = validateResetPasswordAdmin(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    const pseudo = req.body.pseudo;
    Admin.findOne({ pseudo }).then(admin => {
        if (!admin) {
            errors.pseudo = "Admin not found";
            return res.status(404).json(errors);
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) console.error("There was an error", err);
                else {
                    //Ensuite, nous créons une valeur de hachage du mot de passe,
                    //Nous remettons a 'null' le token et son horodatage
                    // Nous enregistrons l’utilisateur dans la base de données
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if (err) console.error("There was an error", err);
                        else {
                            admin.password = hash;
                            admin.token = null;
                            admin.tokenExpires = null;
                            admin.save().then(admin => {
                                res.json(admin);
                            });
                        }
                    });
                }
            });
        }
    });
});

/*********************************** Modification des CGU ***************************************************************/
router.get("/legalmention", function (req, res) {
    LegalMentions.find((err, data) => {
        if (err) return err;
        res.json({
            legalMentions: data
        }).status(200);
    });
});

router.post("/legalmention", function (req, res) {
    const datas = req.body;
    Admin.findOne({ pseudo: "degalikars" }).then(adminFound => {
        const query = { admin: adminFound._id };
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };
        try {
            var datasToUpdate = {};
            datasToUpdate = Object.assign(datas[0]);
            delete datasToUpdate._id;

            LegalMentions.findOneAndUpdate(query, datasToUpdate, options, function (error, result) {
                if (error) {
                    console.error("Callback error :\n", error);
                    return error;
                }
            });
        } catch (err) {
            console.error("Error :\n", err);
        }
        res.json({ message: "Successfully updated" }).status(200);
    })
})
/**************************************************************************************************************************** */

module.exports = router;