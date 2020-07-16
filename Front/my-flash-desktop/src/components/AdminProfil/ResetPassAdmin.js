import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { resetPasswordAdmin } from '../../actions/authentication';
import classnames from 'classnames';
import { logoutAdmin } from '../../actions/authentication';

class ResetPassword extends Component {

    constructor() {
        super();
        this.state = {
            pseudo: 'degalikars',
            password: '',
            password_confirm: '',
            errors: {},
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
        const admin = {
            pseudo: this.state.pseudo,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        };
        this.props.resetPasswordAdmin(admin, this.props.history);
        this.props.logoutAdmin(this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.admin.Authenticated) {
            this.props.history.push('/')
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="inscription-page offset-2 col-8 offset-2">
                <div style={styles.formularyContainer}>
                    <div>
                        <h2>Changez votre mot de passe:</h2>

                        <form onSubmit={this.handleSubmit}>
                            <label htmlFor="pseudo" className="inputGroup mb-3 col-12">
                                <input
                                    type="text"
                                    style={styles.formControl}
                                    readOnly
                                    name="pseudo"
                                    aria-label="Pseudo"
                                    autoComplete="on"
                                    aria-describedby="basic-addon1"
                                    value={this.state.pseudo}
                                />
                                {errors.pseudo && (<div className="invalid-feedback">{errors.pseudo}</div>)}
                            </label>

                            <label htmlFor="password" className="inputGroup mb-3 col-12">
                                <input
                                    type="password"
                                    name="password"
                                    aria-label="password"
                                    autoComplete="on"
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

                            <label htmlFor="password" className="inputGroup mb-3 col-12">
                                <input
                                    type="password"
                                    name="password_confirm"
                                    aria-label="password_confirm"
                                    autoComplete="on"
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
                            <Link to="/connection-admin">
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
        );
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
        textAlign: "center",
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
    resetPasswordAdmin: PropTypes.func.isRequired,
    logoutAdmin: PropTypes.func.isRequired,
    admin: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    admin: state.admin,
    errors: state.errors
});


export default connect(mapStateToProps, { resetPasswordAdmin, logoutAdmin })(withRouter(ResetPassword));

