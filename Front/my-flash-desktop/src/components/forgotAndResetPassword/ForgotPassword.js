import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import logoMyFlash from "../../images/Logo_Connexion_Inscription.png";
import classnames from "classnames";
import { ForgotPasswordUser } from "../../actions/authentication";

class ForgotPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      email: " ",
      errors: {}
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
      email: this.state.email
    };
    this.props.ForgotPasswordUser(user, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div
          className="container-fluid"
          style={{
            justifyContent: "center",
            textAlign: "center",
            paddingTop: "10vh"
          }}
        >
          <div className="logoContainer" style={styles.logoContainer}>
            <img src={logoMyFlash} style={styles.img} alt="My Flash logo" />
          </div>
          <h1>Réinitialisation du mot de passe : </h1>
          <div className="container -fluid " style={styles.container}>
            <div className="row col-12 mt-3 justify-content-center">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Entrez votre email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    onChange={this.handleInputChange}
                    value={this.state.email}
                    style={styles.input}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="container  form-group">
                  <button
                    type="submit"
                    style={styles.sendButton}
                    className="btn mt-3 "
                  >
                    Envoyer
                </button>
                </div>
              </form>
              <div className="container form-group">
                <Link to="/connection">
                  <button
                    type="submit"
                    style={styles.returnButton}
                    className="btn"
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

ForgotPassword.propTypes = {
  ForgotPasswordUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { ForgotPasswordUser }
)(ForgotPassword);

const styles = {
  container: {
    height: "40vh",
    display: "flex",
    alignItems: "center",
    textAlign: "center"
  },
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
  input: {
    border: "1px solid #0073cb",
    width: "45vh"
  },
  sendButton: {
    color: "white",
    backgroundColor: "#0073cb",
    marginTop: "5vh",
    border: "2px solid #0073cb",
    borderRadius: "7px",
    fontSize: "1rem",
    padding: "1vh",
    cursor: "pointer",
    width: "25vh"
  },
  returnButton: {
    color: "white",
    backgroundColor: "#7AB51D",
    marginTop: "2vh",
    borderRadius: "3px",
    fontSize: "0.7rem",
    padding: "1vh",
    cursor: "pointer",
    width: "15vh"
  }
};
