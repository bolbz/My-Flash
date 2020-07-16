const Validator = require('validator');
const isEmpty = require('./is-empty');

//la  fonction vérifiera les valeurs d'entrée et en fonction des valeurs,
// si les valeurs sont vides ou non formatées correctement , ou si la longueur n'est pas définie dans les règles, elle remplit un objet d'erreur et le renvoie au client.
//Ici, toutes les valeurs d'entrée sont vérifiées pour voir la validation.
// Si cela échoue, l'objet d'erreur sera renvoyé à l'utilisateur et l'affichera au format correct.
module.exports = function validateChangePasswordInput(data) {
    let errors = {};
    data.password = !isEmpty(data.password) ? data.password : '';
    data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : '';
    data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : '';

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Le mot de passe doit comporter au minimum 6 caractères';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Saisissez votre mot de passe';
    }

    if (!Validator.isLength(data.newPassword, { min: 6, max: 30 })) {
        errors.newPassword = 'Le mot de passe doit comporter au minimum 6 caractères';
    }

    if (Validator.isEmpty(data.newPassword)) {
        errors.newPassword = 'Saisissez votre mot de passe';
    }
    if (!Validator.isLength(data.password_confirm, { min: 6, max: 30 })) {
        errors.password_confirm = 'Le mot de passe doit comporter au minimum 6 caractères';
    }

    if (!Validator.equals(data.newPassword, data.password_confirm)) {
        errors.password_confirm = 'Les mots de passe ne correspondent pas';
    }

    if (Validator.isEmpty(data.password_confirm)) {
        errors.password_confirm = 'Saisissez votre mot de passe';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}