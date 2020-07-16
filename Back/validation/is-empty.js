// Cette fonction vérifiera si la valeur transmise est indéfinie  ou  nulle,
//  ou  si la  longueur de l' objet  ou de la chaîne est égale à 0 .
const isEmpty = (value) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
    );
}
module.exports = isEmpty;