import React, { Component } from "react";
import logoMyFlash from "../../images/Logo_Connexion_Inscription.png";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { resetPasswordUser } from '../../actions/authentication';
import classnames from 'classnames';
import axios from "axios";

class ResetPassword extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            password_confirm: '',
            errors: {},
            linkExpire: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        };
        this.props.resetPasswordUser(user, this.props.history);
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

    //Cette méthode se déclenche dès que la page est atteinte. Il extrait le jeton à partir des paramètres de requête d'URL 
    //et le renvoie à la reset route du serveur pour vérifier que le jeton est légitime.
    async componentDidMount() {
        let token = this.props.match.params.token;
        await axios.get('/api/users/reset/' + token)
            .then(res => {
                if (res.data.message === 'le lien du mot de passe est valide') {
                    this.setState({
                        email: res.data.email,
                        linkExpire: true
                    })
                } else {
                    this.setState({
                        linkExpire: false
                    })
                }
            }).catch(error => {
                console.error(error.data)
            })
    }

    render() {
        const { errors, linkExpire } = this.state;
        if (linkExpire === false) {
            return (
                <div>
                    <div className="inscription-page offset-2 col-8 offset-2">
                        <div className="logoContainer" style={styles.logoContainer}>
                            <img src={logoMyFlash} style={styles.img} alt="My Flash logo" />
                        </div>
                        <div style={styles.formularyContainer}>
                            <h2>Erreur de la réinitialisation de mot de passe :</h2>
                        </div>
                        <p>Le lien qui vous été envoyer a expiré, de ce fait nous ne pouvons donner suite au changement de votre mot de passe. Veuillez recommencer la procédure si vous souhaitez toujours changer de mot de passe.</p>
                        <div>
                            <Link to="/connection">
                                <button
                                    type="submit"
                                    className="btn formulary-button Suscribe mb-3"
                                    style={{ margin: 'auto', justifyContent: 'center', flexDirection: 'center', backgroundColor: 'blue', display: 'flex' }}
                                >
                                    Retour à la connexion
                        </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        } else if (linkExpire === true) {
            return (
                <div>
                    <div className="inscription-page offset-2 col-8 offset-2">
                        <div className="logoContainer" style={styles.logoContainer}>
                            <img src={logoMyFlash} style={styles.img} alt="My Flash logo" />
                        </div>

                        <div style={styles.formularyContainer}>
                            <div>
                                <h2>Changez votre mot de passe :</h2>

                                <form onSubmit={this.handleSubmit}>
                                    <label htmlFor="email" className="inputGroup mb-3 col-12">
                                        <input
                                            type="email"
                                            style={styles.formControl}
                                            name="email"
                                            placeholder="Entrez adresse email"
                                            className={classnames('form-control form-control-lg', {
                                                'is-invalid': errors.email
                                            })}
                                            aria-label="Username"
                                            aria-describedby="basic-addon1"
                                            value={this.state.email}
                                        />
                                        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                                    </label>

                                    <label htmlFor="password" className="inputGroup mb-3 col-12">
                                        <input
                                            type="password"
                                            name="password"
                                            aria-label="password"
                                            className={classnames('form-control form-control-lg', {
                                                'is-invalid': errors.password
                                            })}
                                            style={styles.formControl}
                                            placeholder="Nouveau mot de passe "
                                            value={this.state.password}
                                            onChange={this.handleInputChange}
                                        />
                                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                                    </label>

                                    <label htmlFor="cpassword" className="inputGroup mb-3 col-12">
                                        <input
                                            type="password"
                                            name="password_confirm"
                                            aria-label="password_confirm"
                                            className={classnames('form-control form-control-lg', {
                                                'is-invalid': errors.password_confirm
                                            })}
                                            style={styles.formControl}
                                            placeholder="Confirmer nouveau mot de passe "
                                            value={this.state.password_confirm}
                                            onChange={this.handleInputChange}
                                        />
                                        {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
                                    </label>

                                    <div>
                                        <div>
                                            <button
                                                type="submit"
                                                className="btn formulary-button Suscribe mb-3"
                                                style={styles.suscribe}
                                            >
                                                Confirmer
                                    </button>
                                        </div>
                                    </div>
                                </form>
                                <div>
                                    <Link to="/">
                                        <button
                                            type="button"
                                            className="btn formulary-button ReturnButton mb-3"
                                            style={styles.returnButton}
                                        >
                                            Annuler
                                </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
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
    },
    formControl: {
        width: "100%",
        maxWidth: "600px",
        margin: "auto",
        maxHeight: "350px",
        height: "3rem",
        paddingLeft: "0.5rem",

        fontSize: "auto",
        border: "1px solid #0086CB",
        borderRadius: "7px"
    },
    returnButton: {
        color: "white",
        backgroundColor: "#7AB51D"
    },
    suscribe: {
        maxWidth: "250px",
        width: "100%",
        fontSize: "150%",
        color: "white",
        backgroundColor: "#0086CB"
    }
};

ResetPassword.propTypes = {
    resetPasswordUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { resetPasswordUser })(withRouter(ResetPassword));
