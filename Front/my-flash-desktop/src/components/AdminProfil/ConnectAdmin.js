import React from "react";
import homepage_image from "../../images/image_ecrite.png";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginAdmin } from '../../actions/authentication';
import classnames from 'classnames';

class ConnectAdmin extends React.Component {

  constructor() {
    super();
    this.state = {
      pseudo: '',
      password: '',
      role: '',
      errors: "",
      headers: {}
    }
    // crée une nouvelle fonction avec le mot "this" assigné à la valeur passé en paramètre
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // permet d'ajuster la valeur du state à chaque changement
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // Fonction permettant l'envoi des données de connexion
  handleSubmit(event) {
    event.preventDefault();
    const admin = {
      pseudo: this.state.pseudo,
      password: this.state.password,
    }
    this.props.loginAdmin(admin);
  }

  // Si nous sommes déjà authentifié au chargement du composant nous sommes redirigé vers la page admin
  componentDidMount() {
    if (this.props.admin.Authenticated) {
      this.props.history.push('/admin');
    }
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/")
    }
  }

  // Si l'authentification est correct quand on reçoit les props
  //  alors nous sommes redirigé vers la page admin
  componentWillReceiveProps(nextProps) {
    if (nextProps.admin.Authenticated) {
      this.props.history.push('/admin')
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        headers: nextProps.headers
      });
    }
  }

  render() {
    const { errors, headers } = this.state;
    return (
      <div className="container-fluid" style={styles.container}>
        <div className="row col-12 mt-3 justify-content-center">
          <div className="col-12 p-0">
            <img
              className=" img-fluid"
              style={styles.responsive}
              src={homepage_image}
              alt="My Flash logo"
            />
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group mt-3">
              <input
                type="text"
                name="pseudo"
                aria-label="pseudo"
                autoComplete="on"
                /* classnames permet d'afficher les erreurs côté client*/
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors
                })}
                style={styles.formControl}
                placeholder="Pseudo"
                value={this.state.pseudo}
                onChange={this.handleInputChange}
              />
              {/* si des erreurs émergent, elles sont affichées en-dessous de l'input */}
              {/* {errors.error && (<div className="invalid-feedback">{errors.error}</div>)} */}
              {!!errors && (<div className="invalid-feedback">Essais restants : {headers["x-ratelimit-remaining"]}</div>)}
            </div>

            <div className="form-group mt-5">
              <input
                type="password"
                id="exampleInputPassword1"
                placeholder="Mot de passe"
                autoComplete="on"
                style={styles.input}
                className={classnames('form-control form-control-lg', {
                  'is-invalid': errors
                })}
                name="password"
                onChange={this.handleInputChange}
                value={this.state.password}
              />
              {!!errors && (<div className="invalid-feedback">{!!errors.password ? errors.password : (!!errors.error ? errors.error : null)}</div>)}
            </div>
            <button type="submit" style={styles.connectionButton} className="btn mt-5">
              Se connecter
            </button>
          </form>
          <Link  className="col-12" to="/">
            <button type="submit" style={styles.returnButton} className="btn">
              Retour
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    height: "90vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: 'center'
  },
  input: {
    border: '1px solid #0073cb',
    width: '45vh'
  },
  connectionButton: {
    color: "white",
    backgroundColor: "#0085c5",
    marginTop: "5vh",
    border: "2px solid #0073cb",
    borderRadius: "7px",
    fontSize: "1rem",
    padding: "1vh",
    cursor: "pointer",
    width: '25vh'
  },
  returnButton: {
    color: "white",
    backgroundColor: "#7AB51D",
    marginTop: "2vh",
    borderRadius: "3px",
    fontSize: "0.7rem",
    padding: "1vh",
    cursor: "pointer",
    width: '15vh'
  },
  lien: {
    textDecoration: "none",
    color: "grey"
  },
  responsive: {
    height: '40vh',
  }
};

// PropTypes vérifie que les données reçues via les props sont valides
ConnectAdmin.propTypes = {
  loginAdmin: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  headers: PropTypes.object.isRequired
}

// premier paramètre de "connect", mapStateToProps est utilisé pour
// sélectionner la partie des données du store que le composant connecté
// (ici Connection.js) a besoin.
const mapStateToProps = (state) => ({
  admin: state.admin,
  auth: state.auth,
  errors: state.errors,
  headers: state.headers
})

// connect permet de connecter notre fichier Connection.js à notre store redux
// withRouter permet d'accèder aux propriétés de l'objet history et d'être redirigé même
// si on est en-dehors d'un router
export default connect(mapStateToProps, { loginAdmin })(ConnectAdmin)
