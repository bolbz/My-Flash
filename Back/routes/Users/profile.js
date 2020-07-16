const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const User = require('../../models/User/User');
const Identity = require('../../models/Rubrique/Identity');
const Coordonates = require('../../models/Rubrique/Coordonates');
const SocialNetworks = require('../../models/Rubrique/SocialNetworks');
const Professional = require('../../models/Rubrique/Professional');
const Health = require('../../models/Rubrique/Health');
const Presentation = require('../../models/Rubrique/Presentation');
const Hobbies = require('../../models/Rubrique/Hobbies');

const VisibilityIdentity = require('../../models/Visibility/VisibilityIdentity');
const VisibilityCoordonates = require('../../models/Visibility/VisibilityCoordonates');
const VisibilitySocialNetworks = require('../../models/Visibility/VisibilitySocialNetworks');
const VisibilityProfessional = require('../../models/Visibility/VisibilityProfessional');
const VisibilityHealth = require('../../models/Visibility/VisibilityHealth');
const VisibilityPresentation = require('../../models/Visibility/VisibilityPresentation');
const VisibilityHobbies = require('../../models/Visibility/VisibilityHobbies');

const modelsArray = [Identity, Coordonates, SocialNetworks, Hobbies, Health, Professional];
const visibilityModelsArray = [VisibilityIdentity, VisibilityCoordonates, VisibilitySocialNetworks, VisibilityHobbies, VisibilityHealth, VisibilityProfessional];

//Route pour récupérer les données d'un utilisateur particulier
router.get("/userDatas/:apikey", function (req, res) {
    const payload = [];
    //On récupère l'utilisateur correspondant à l'apikey passée dans l'url
    User.findOne({ apikey: req.params.apikey }, function (err, userFound) {
        if (err) return err;
        const query = {
            user: userFound._id
        };
        //On récupère chaque catégorie de la partie profil en mettant l'objet retourné dans le tableau "payload"
        // et en en créant un si rien n'est trouvé
        //
        //La constante "query" permet de sélectionner le bon document dans la collection car à la création du document
        // on enregistre l'id de l'utilisateur dans la propriété "user",
        // si la propriété "user" et l'id de l'utilisateur trouvé un peu plus haut corrsepondent c'est que ceux-ci sont liés
        Identity.findOne(query, function (err, datas) {
            if (err) {
                console.error("Callback error :\n", err);
                return err;
            }
            if (datas === null) {
                let newModel = new Identity({});
                payload.push(newModel);
            } else {
                payload.push(datas);
            }
            Coordonates.findOne(query, function (err, datas) {
                if (err) {
                    console.error("Callback error :\n", err);
                    return err;
                }
                if (datas === null) {
                    let newModel = new Coordonates({});
                    payload.push(newModel);
                } else {
                    payload.push(datas);
                }
                SocialNetworks.findOne(query, function (err, datas) {
                    if (err) {
                        console.error("Callback error :\n", err);
                        return err;
                    }
                    if (datas === null) {
                        let newModel = new SocialNetworks({});
                        payload.push(newModel);
                    } else {
                        payload.push(datas);
                    }
                    Hobbies.findOne(query, function (err, datas) {
                        if (err) {
                            console.error("Callback error :\n", err);
                            return err;
                        }
                        if (datas === null) {
                            let newModel = new Hobbies({});
                            payload.push(newModel);
                        } else {
                            payload.push(datas);
                        }
                        Health.findOne(query, function (err, datas) {
                            if (err) {
                                console.error("Callback error :\n", err);
                                return err;
                            }
                            if (datas === null) {
                                let newModel = new Health({});
                                payload.push(newModel);
                            } else {
                                payload.push(datas);
                            }
                            Professional.findOne(query, function (err, datas) {
                                if (err) {
                                    console.error("Callback error :\n", err);
                                    return err;
                                }
                                if (datas === null) {
                                    let newModel = new Professional({});
                                    payload.push(newModel);
                                } else {
                                    payload.push(datas);
                                }
                                //On envoi le tableau "payload" dans la réponse sous le nom "cards"
                                res.json({
                                    cards: payload
                                }).status(200)
                            });
                        });
                    });
                });
            });
        });
    });
});

//Route pour faire une mise à jour des données d'un utilisateur
router.post("/userDatas/update/:apikey", function (req, res) {
    const datas = req.body;
    //On récupère l'utilisateur correspondant à l'apikey passée dans l'url
    User.findOne({ apikey: req.params.apikey }).then(userFound => {
        const query = { user: userFound._id };
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };
        const callback = function (error, result) {
            if (error) {
                console.error("Callback error :\n", error);
                return error;
            }
        };
        //On boucle sur le tableau "modelsArray", une fois par catégorie, et à chaque itération :
        //  - on crée un nouvel objet contenant les nouvelles données de cette catégorie,
        //  - on supprime l'_id de cet objet car celui-ci est imutable,
        //  - on sauvegarde celui-ci sous le bon modèle grâce à "mongoose.model(name)"
        //
        //La constante "query" permet de sélectionner le bon document dans la collection car à la création du document
        // on enregistre l'id de l'utilisateur dans la propriété "user",
        // si la propriété "user" et l'id de l'utilisateur trouvé un peu plus haut corrsepondent c'est que ceux-ci sont liés
        //
        //La constante option permet la création d'un document pour l'utilisateur si celui-ci n'en a toujours pas (compte juste créé)
        // et de le remplir automatiquement avec les valeurs par défaut définies dans les schémas
        //
        //La constante callback permet de renvoyer une erreur si une devait survenir
        for (let i = 0, length = modelsArray.length; i < length; i++) {
            let name = modelsArray[i].modelName;
            try {
                var datasToUpdate = {};
                datasToUpdate = Object.assign(datasToUpdate, datas[i]);
                delete datasToUpdate._id;

                mongoose.model(name).findOneAndUpdate(query, datasToUpdate, options, callback);
            } catch (err) {
                console.error("Error :\n", err);
            }
            if (i === length - 1) {
                res.json({
                    message: "Profile updated !!"
                }).status(200);
            }
        }
    });
});

//Route pour récupérer les données d'un utilisateur particulier
router.get("/userDatas/presentation/:apikey", function (req, res) {
    const payload = [];
    //On récupère l'utilisateur correspondant à l'apikey passée dans l'url
    User.findOne({ apikey: req.params.apikey }, function (err, userFound) {
        if (err) return err;
        const query = {
            user: userFound._id
        };
        //On récupère chaque catégorie de la partie profil en mettant l'objet retourné dans le tableau "payload"
        // et en en créant un si rien n'est trouvé
        //
        //La constante "query" permet de sélectionner le bon document dans la collection car à la création du document
        // on enregistre l'id de l'utilisateur dans la propriété "user",
        // si la propriété "user" et l'id de l'utilisateur trouvé un peu plus haut corrsepondent c'est que ceux-ci sont liés
        Presentation.findOne(query, function (err, datas) {
            if (err) {
                console.error("Callback error :\n", err);
                return err;
            }
            if (datas === null) {
                let newModel = new Presentation({});
                //On envoi le tableau "payload" dans la réponse sous le nom "cards"
                payload.push(newModel);
            } else {
                //On envoi le tableau "payload" dans la réponse sous le nom "cards"
                payload.push(datas);
            }
            res.json({
                presentation: payload
            }).status(200)
        });
    });
});

//Route pour faire une mise à jour des données d'un utilisateur
router.post("/userDatas/presentation/update/:apikey", function (req, res) {
    const datas = req.body;
    //On récupère l'utilisateur correspondant à l'apikey passée dans l'url
    User.findOne({ apikey: req.params.apikey }).then(userFound => {
        const query = { user: userFound._id };
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };
        const callback = function (error, result) {
            if (error) {
                console.error("Callback error :\n", error);
                return error;
            }
        };
        var datasToUpdate = {};
        datasToUpdate = Object.assign(datasToUpdate, datas);
        delete datasToUpdate._id;
        Presentation.findOneAndUpdate(query, datasToUpdate, options, callback);
        res.json({
            message: "Profile updated !!"
        }).status(200);
    });
});

//Route pour récupérer la visibilité des données d'un utilisateur particulier
router.get("/userDatasVisibility/:profile/:apikey", function (req, res) {
    const payload = [];
    //On récupère l'utilisateur correspondant à l'apikey passée dans l'url
    User.findOne({ apikey: req.params.apikey }, function (err, userFound) {
        if (err) return err;
        const query = {
            user: userFound._id,
            profile: req.params.profile
        };
        //On récupère chaque catégorie de la partie profil en mettant l'objet retourné dans le tableau "payload"
        // et en en créant un si rien n'est trouvé
        //
        //La constante "query" permet de sélectionner le bon document dans la collection car à la création du document
        // on enregistre l'id de l'utilisateur dans la propriété "user",
        // si la propriété "user" et l'id de l'utilisateur trouvé un peu plus haut corrsepondent c'est que ceux-ci sont liés
        VisibilityIdentity.findOne(query, function (err, datas) {
            if (err) {
                console.error("Callback error :\n", err);
                return err;
            }
            if (datas === null) {
                let newModel = new VisibilityIdentity({});
                payload.push(newModel);
            } else {
                payload.push(datas);
            }
            VisibilityCoordonates.findOne(query, function (err, datas) {
                if (err) {
                    console.error("Callback error :\n", err);
                    return err;
                }
                if (datas === null) {
                    let newModel = new VisibilityCoordonates({});
                    payload.push(newModel);
                } else {
                    payload.push(datas);
                }
                VisibilitySocialNetworks.findOne(query, function (err, datas) {
                    if (err) {
                        console.error("Callback error :\n", err);
                        return err;
                    }
                    if (datas === null) {
                        let newModel = new VisibilitySocialNetworks({});
                        payload.push(newModel);
                    } else {
                        payload.push(datas);
                    }
                    VisibilityHobbies.findOne(query, function (err, datas) {
                        if (err) {
                            console.error("Callback error :\n", err);
                            return err;
                        }
                        if (datas === null) {
                            let newModel = new VisibilityHobbies({});
                            payload.push(newModel);
                        } else {
                            payload.push(datas);
                        }
                        VisibilityHealth.findOne(query, function (err, datas) {
                            if (err) {
                                console.error("Callback error :\n", err);
                                return err;
                            }
                            if (datas === null) {
                                let newModel = new VisibilityHealth({});
                                payload.push(newModel);
                            } else {
                                payload.push(datas);
                            }
                            VisibilityProfessional.findOne(query, function (err, datas) {
                                if (err) {
                                    console.error("Callback error :\n", err);
                                    return err;
                                }
                                if (datas === null) {
                                    let newModel = new VisibilityProfessional({});
                                    payload.push(newModel);
                                } else {
                                    payload.push(datas);
                                }
                                //On envoi le tableau "payload" dans la réponse sous le nom "cards"
                                res.json({
                                    visibilityCards: payload
                                }).status(200)
                            });
                        });
                    });
                });
            });
        });
    });
});

//Route pour faire une mise à jour de la visibilité des données d'un utilisateur
router.post("/userDatasVisibility/update/:profile/:apikey", function (req, res) {
    const datas = req.body;
    //On récupère l'utilisateur correspondant à l'apikey passée dans l'url
    User.findOne({ apikey: req.params.apikey }).then(userFound => {
        const query = { user: userFound._id, profile: req.params.profile };
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };
        const callback = function (error, result) {
            if (error) {
                console.error("Callback error :\n", error);
                return error;
            }
        };
        //On boucle sur le tableau "modelsArray", une fois par catégorie, et à chaque itération :
        //  - on crée un nouvel objet contenant les nouvelles données de cette catégorie,
        //  - on supprime l'_id de cet objet car celui-ci est imutable,
        //  - on sauvegarde celui-ci sous le bon modèle grâce à "mongoose.model(name)"
        //
        //La constante "query" permet de sélectionner le bon document dans la collection car à la création du document
        // on enregistre l'id de l'utilisateur dans la propriété "user",
        // si la propriété "user" et l'id de l'utilisateur trouvé un peu plus haut corrsepondent c'est que ceux-ci sont liés
        //
        //La constante option permet la création d'un document pour l'utilisateur si celui-ci n'en a toujours pas (compte juste créé)
        // et de le remplir automatiquement avec les valeurs par défaut définies dans les schémas
        //
        //La constante callback permet de renvoyer une erreur si une devait survenir
        for (let i = 0, length = visibilityModelsArray.length; i < length; i++) {
            let name = visibilityModelsArray[i].modelName;
            try {
                var datasToUpdate = {};
                datasToUpdate = Object.assign(datasToUpdate, datas[i]);
                delete datasToUpdate._id;
                mongoose.model(name).findOneAndUpdate(query, datasToUpdate, options, callback);
            } catch (err) {
                console.error("Error :\n", err);
            }
            if (i === length - 1) {
                res.json({
                    message: "Profile updated !!"
                }).status(200);
            }
        }
    });
});

//Route pour récupérer les données d'un utilisateur particulier
router.get("/userDatasVisibility/presentation/:profile/:apikey", function (req, res) {
    const payload = [];
    //On récupère l'utilisateur correspondant à l'apikey passée dans l'url
    User.findOne({ apikey: req.params.apikey }, function (err, userFound) {
        if (err) return err;
        const query = {
            user: userFound._id,
            profile: req.params.profile
        };
        //On récupère chaque catégorie de la partie profil en mettant l'objet retourné dans le tableau "payload"
        // et en en créant un si rien n'est trouvé
        //
        //La constante "query" permet de sélectionner le bon document dans la collection car à la création du document
        // on enregistre l'id de l'utilisateur dans la propriété "user",
        // si la propriété "user" et l'id de l'utilisateur trouvé un peu plus haut corrsepondent c'est que ceux-ci sont liés
        VisibilityPresentation.findOne(query, function (err, datas) {
            if (err) {
                console.error("Callback error :\n", err);
                return err;
            }
            if (datas === null) {
                let newModel = new VisibilityPresentation({});
                //On envoi le tableau "payload" dans la réponse sous le nom "cards"
                payload.push(newModel);
            } else {
                //On envoi le tableau "payload" dans la réponse sous le nom "cards"
                payload.push(datas);
            }
            res.json({
                visibilityPresentation: payload
            }).status(200)
        });
    });
});

//Route pour faire une mise à jour des données d'un utilisateur
router.post("/userDatasVisibility/presentation/update/:profile/:apikey", function (req, res) {
    const datas = req.body;
    //On récupère l'utilisateur correspondant à l'apikey passée dans l'url
    User.findOne({ apikey: req.params.apikey }).then(userFound => {
        const query = {
            user: userFound._id,
            profile: req.params.profile
        };
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };
        const callback = function (error, result) {
            if (error) {
                console.error("Callback error :\n", error);
                return error;
            }
        };
        var datasToUpdate = {};
        datasToUpdate = Object.assign(datasToUpdate, datas);
        delete datasToUpdate._id;
        VisibilityPresentation.findOneAndUpdate(query, datasToUpdate, options, callback);
        res.json({
            message: "Profile updated !!"
        }).status(200);
    });
});

module.exports = router;