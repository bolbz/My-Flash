const express = require('express');
const helmet = require('helmet')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./db');

// Variable d'import du router

const activeCards = require('./routes/Admin/activeCards');
const users = require('./routes/Users/user');
const profile = require('./routes/Users/profile');
const partners = require('./routes/Admin/partner');

//Deprecation Warnings see link below for more informations :
const Image = require('./routes/Users/image');
const ImageBack = require ('./routes/Users/image');
const changePassword = require('./routes/Users/changePassword');
const deleteAccount = require('./routes/Users/deleteAccount');

// Variable d'import du router admin
const admins = require('./routes/Admin/admin');
const contactMail = require('./routes/Users/PageContactIndex');

// Deprecation Warnings see link below for more informations :
// https://mongoosejs.com/docs/deprecations.html
const connectOptions = { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true };

// Connexion à la base de donnée de MongoDB
mongoose.connect(config.DB, connectOptions).then(
    () => { console.log('Database is connected') },
    err => { console.log('Can not connect to the database' + err) }
);

const app = express();
app.use(passport.initialize());
require('./passport')(passport);

// Helmet helps you secure your Express apps by setting various HTTP headers.
// https://www.npmjs.com/package/helmet
app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com']
    }
}));

app.disable('x-powered-by');

app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));
app.use(bodyParser.json({limit: "5mb"}));

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/users', changePassword);
app.use('/api/users', deleteAccount);
app.use('/api/active', activeCards);
app.use('/api/partners', partners);
app.use('/api/contact', contactMail);

// Route for Admin
app.use('/api/admins', admins); // api= database / admins= nom de la table use / admins variable pour use la route creer 
app.use('/api/upload', ImageBack);
app.use('/api/upload', Image);

app.get('/', function (req, res) {
    res.send('hello');
});

// Variable que définit le port d'écoute du serveur NodeJs
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
