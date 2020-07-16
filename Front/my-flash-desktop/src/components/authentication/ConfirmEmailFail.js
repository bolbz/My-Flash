import React, { Component } from "react";
import logoMyFlash from "../../images/Logo_Connexion_Inscription.png";
import { Link } from "react-router-dom";

// Composant qui s'affiche si le formulaire d'inscription est bien rempli
class ConfirmEmailFail extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            password_confirm: '',
            errors: {},
        };
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
                        <h2>Un problème est survenu !</h2>
                        <p>Le lien n'est plus valide</p>
                        <Link to="/">
                            <button
                                type="submit"
                                className="btn formulary-button Suscribe mb-3"
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

export default ConfirmEmailFail;
