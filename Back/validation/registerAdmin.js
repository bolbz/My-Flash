const Validator = require('validator');
const isEmpty = require('./is-empty');

//la  fonction vérifiera les valeurs d'entrée et en fonction des valeurs,
// si les valeurs sont vides ou non formatées correctement , ou si la longueur n'est pas définie dans les règles, elle remplit un objet d'erreur et le renvoie au client.
//Ici, toutes les valeurs d'entrée sont vérifiées pour voir la validation.
// Si cela échoue, l'objet d'erreur sera renvoyé à l'utilisateur et l'affichera au format correct.

//Model Admin qui est use dans la validation
module.exports = function validateRegisterAdminInput(data) {
    let errors = {};

    data.pseudo = !isEmpty(data.pseudo) ? data.pseudo : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.role = !isEmpty(data.role) ? data.role : 'Invité';

    if (!Validator.isLength(data.pseudo, { min: 6, max: 30 })) {
        errors.pseudo = 'Votre pseudo doit comporter au minimum 4 caractères';
    }

    if (Validator.isEmpty(data.pseudo)) {
        errors.pseudo = 'Saisissez votre pseudo';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Le mot de passe doit comporter au minimum 6 caractères';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Saisissez votre mot de passe';
    }
    if (!Validator.isLength(data.role, { min: 4, max: 30 })) {
        errors.role = 'Utilisateur incorrect';
    }


    if (Validator.isEmpty(data.role)) {
        errors.role = 'Utilisateur incorrect';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
