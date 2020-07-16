import React, { Component } from "react";
import logoMyFlash from "../../images/Logo_Connexion_Inscription.png";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authentication';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

// Composant qui s'affiche si le formulaire d'inscription est bien rempli
class MailWasSend extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            password_confirm: '',
            errors: {},
        };
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        return (
            <div>
                <div className="inscription-page offset-2 col-8 offset-2">
                    <div className="logoContainer" style={styles.logoContainer}>
                        <img src={logoMyFlash} style={styles.img} alt="My Flash logo" />
                    </div>
                    <div style={styles.formularyContainer}>
                        <h2>Un email de confirmation vous a été envoyé</h2>
                        <p className="mt-4">Merci de vérifier votre boîte mail et de cliquer sur le lien afin de valider votre inscription</p>
                        <Link to="/">
                            <button
                                type="submit"
                                className="btn formulary-button Suscribe mb-3 mt-4"
                                style={{ margin: 'auto', justifyContent: 'center', flexDirection: 'center', backgroundColor: 'blue', display: 'flex' }}
                            >
                                Retour à l'accueil
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    img: {
        width: "40%",
        margin: "auto",
        marginBottom: "3rem"
    },
    logoContainer: {
        textAlign: "center",
        maxWidth: "600px",
        width: "100%",
        margin: "auto"
    },
    formularyContainer: {
        textAlign: "center"
    }
};

// PropTypes vérifie que les données reçues via les props sont valides
MailWasSend.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

// premier paramètre de "connect", mapStateToProps est utilisé pour
// sélectionner la partie des données du store que le composant connecté
// (ici Profile.js) a besoin.
const mapStateToProps = (state) => ({
    auth: state.auth
})

// connect permet de connecter notre fichier Profile.js à notre store redux
// withRouter permet d'accèder aux propriétés de l'objet history et d'être redirigé même
// si on est en-dehors d'un router
export default connect(mapStateToProps, { logoutUser })(withRouter(MailWasSend));
