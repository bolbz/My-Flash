const Validator = require('validator');
const isEmpty = require('./is-empty');

//la  fonction vérifiera les valeurs d'entrée et en fonction des valeurs,
// si les valeurs sont vides ou non formatées correctement , ou si la longueur n'est pas définie dans les règles, elle remplit un objet d'erreur et le renvoie au client.
//Ici, toutes les valeurs d'entrée sont vérifiées pour voir la validation.
// Si cela échoue, l'objet d'erreur sera renvoyé à l'utilisateur et l'affichera au format correct.
module.exports = function validateLoginInput(data) {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email invalide';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Saisissez votre email';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Le mot de passe doit comporter au minimum 6 caractères';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Saisissez votre mot de passe';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}