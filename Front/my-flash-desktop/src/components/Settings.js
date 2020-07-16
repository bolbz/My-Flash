import React from "react";
import "./Profile/Profile.css";
import Photo_cache from "../images/Photo_cache1.png";
import flash1 from "../images/flash1.webp";
import flash2 from "../images/flash2.webp";
import flash3 from "../images/flash3.jpg";
import flash4 from "../images/flash4.jpeg";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { changePassword } from "../actions/authentication";
import { deleteAccount } from "../actions/authentication";
import { logoutUser } from "../actions/authentication";
import Navbar from "./Navbar";
import { notify } from "react-notify-toast";
import DefaultImg from "../images/Mascotte_01B.png";
import axios from "axios";

const flashLogos = [flash1, flash2, flash3, flash4];

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      report: null,
      addClass: false,
      password: "",
      newPassword: "",
      password_confirm: "",
      preview: null,
      baseImage: DefaultImg,
      show: false,
      photoprofil: {},
      errors: {}
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.notify = this.notify.bind(this);
  }

  componentDidMount = () => {
    if (!this.props.auth.isAuthenticated) {
          this.props.history.push('/');
    }
    axios.get("/api/users/me").then(response => {
      this.setState({
        firstName: response.data.firstname,
        lastName: response.data.lastname,
        apikey: response.data.apikey
      });
      axios
        .get("api/upload/profilImg/" + this.state.apikey)
        .then((res, err) => {
          if (!err && res.data.message === "photo de profil connu") {
            this.setState({ photoprofil: res.data.profileImage });
          }
          if (res.data.message === "Pas de photo de profil") {
            this.setState({ baseImage: DefaultImg, photoprofil: null });
          }
        });
      axios.get('/api/users/allUserChip/' + response.data.id).then(res => {
        if (res.data.data === null) {
          console.error('Aucun utilisateur')
        } else {
          this.setState({
            allUserChips: res.data.data
          })
        }
      }).catch(error => {
        console.error(error.data)
      })
    });
  };


   componentWillReceiveProps(nextProps) {
        if (!nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }


  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      password: this.state.password,
      newPassword: this.state.newPassword,
      password_confirm: this.state.password_confirm
    };
    this.props.changePassword(user, this.state.apikey);
    setTimeout(this.notify, 2000);
  }

  notify() {
    axios.get("/api/users/changePassword/" + this.state.apikey).then(res => {
      if (res.data.message === "mot de passe actualisé") {
        notify.show("Le mot de passe a été actualisé");
      }
    });
  }

  handleClick() {
    const user = {
      password: this.state.password,
      newPassword: this.state.newPassword,
      password_confirm: this.state.password_confirm
    };
    this.props.deleteAccount(user, this.state.apikey);
    this.props.logoutUser(this.props.history);
  }

  // on crée une fonction qui change le state à chaque fois qu'on appelle
  test = () => {
    this.setState({ addClass: !this.state.addClass });
  };


  render() {
    const { errors } = this.state;
    // on crée un tableau dans laquelle on stocke des classes
    let boxClass = ["paused", "photo_cache_rotate"];
    // si addClass est true on enlève le premier index du tableau
    if (this.state.addClass) {
      boxClass.shift();
    }

    const { photoprofil, baseImage, allUserChips } = this.state;

    return (
      allUserChips !== undefined && (
        <div style={styles.margin}>
          <Navbar />
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 col-12 profile-main mt-4">
                <div className="row">
                  <div className="col-md-12 col-12 user-detail-main">
                    <div className="row">
                      <div className="col-md-12 col-12 profile-back pb-5 d-flex align-items-center justify-content-center">
                        <img
                          src={Photo_cache}
                          style={styles.fondImage}
                          className={boxClass.join(" ")}
                          onMouseOver={this.test.bind(this)}
                          alt=""
                        />
                        {photoprofil !== null && (
                          <img
                            src={photoprofil.imageData}
                            style={styles.imageOver}
                            alt="Profil"
                            className="rounded-circle img-fluid"
                          />
                        )}
                        {photoprofil === null && (
                          <img
                            src={baseImage}
                            style={styles.imageOver}
                            alt="Profil default"
                            className="rounded-circle img-fluid"
                          />
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 col-12 user-detail text-center">
                        <h4 className="m-0">
                          <strong>
                            {this.state.firstName} {this.state.lastName}
                          </strong>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container mb-5" style={styles.container}>
            <div className="row pt-5 justify-content-center">
              <div
                className="card card-outline-secondary col-sm-11 col-md-11 col-lg-8"
                style={styles.box}
              >
                <div className="mb-5">
                  <h5 className="mb-4">Mes flashs :</h5>
                  <div className="row">
                    {allUserChips.map((chip, i) => {
                      return (
                        <div key={i} className="mr-3">
                          {i + 1}.
                          <img
                            src={flashLogos[Math.floor(Math.random() * Math.floor(flashLogos.length))]}
                            style={{ height: 100, width: 100 }}
                            alt="flash"
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="pr-2">
                  <button
                    type="submit"
                    style={styles.button}
                    className="btn btn-primary col-12 col-md-6 col-lg-4 float-right"
                    data-toggle="modal"
                    data-target="#addFlash"
                  >
                    Ajouter un flash
                  </button>
                </div>
                <div className="modal fade" id="addFlash" tabIndex="-1" role="dialog" aria-labelledby="addFlashLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="addFlashLabel">Pour ajouter un flash :</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <ul>
                          <li>Scannez un flash vierge</li>
                          <li>Cliquez sur "Associer ce flash à mon compte"</li>
                          <li>Et voilà ! Le flash a bien été relié à votre compte.</li>
                        </ul>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-dismiss="modal">Fermer</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container" style={styles.container}>
            <div className="row pt-2 justify-content-center">
              <div
                className="card card-outline-secondary col-sm-11 col-md-11 col-lg-8"
                style={styles.box}
              >
                <div>
                  <h5 className="mb-0">Changer de mot de passe</h5>
                </div>
                <div className="card-body pl-0 pr-0">
                  <form
                    className="form"
                    onSubmit={this.handleSubmit}
                    autoComplete="off"
                  >
                    <div className="form-group">
                      <label
                        htmlFor="password"
                        className="inputGroup mb-3 col-12"
                      >
                        <input
                          type="password"
                          name="password"
                          autoComplete="off"
                          aria-label="password"
                          className={classnames(
                            "form-control form-control-lg",
                            {
                              "is-invalid": errors.password
                            }
                          )}
                          placeholder="Mot de passe "
                          value={this.state.password}
                          onChange={this.handleInputChange}
                        />
                        {errors.password && (
                          <div className="invalid-feedback">
                            {errors.password}
                          </div>
                        )}
                      </label>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputPasswordNew">
                        Nouveau mot de passe
                      </label>
                      <label
                        htmlFor="password"
                        className="inputGroup mb-3 col-12"
                      >
                        <input
                          type="password"
                          name="newPassword"
                          autoComplete="off"
                          aria-label="password"
                          className={classnames(
                            "form-control form-control-lg",
                            {
                              "is-invalid": errors.newPassword
                            }
                          )}
                          placeholder="Nouveau mot de passe "
                          value={this.state.newPassword}
                          onChange={this.handleInputChange}
                        />
                        {errors.newPassword && (
                          <div className="invalid-feedback">
                            {errors.newPassword}
                          </div>
                        )}
                      </label>

                      <label
                        htmlFor="cpassword"
                        className="inputGroup mb-3 col-12"
                      >
                        <input
                          type="password"
                          name="password_confirm"
                          autoComplete="off"
                          aria-label="password_confirm"
                          className={classnames(
                            "form-control form-control-lg",
                            {
                              "is-invalid": errors.password_confirm
                            }
                          )}
                          placeholder="Confirmer nouveau mot de passe "
                          value={this.state.password_confirm}
                          onChange={this.handleInputChange}
                        />
                        {errors.password_confirm && (
                          <div className="invalid-feedback">
                            {errors.password_confirm}
                          </div>
                        )}
                      </label>
                    </div>
                    <div className="form-group">
                      <button
                        type="submit"
                        style={styles.button}
                        className="btn btn-primary col-12 col-md-6 col-lg-4 float-right"
                      >
                        Confirmer nouveau mot de passe
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="container mb-5" style={styles.container}>
                <div className="row pt-5 justify-content-center">
                  <div
                    className="card card-outline-secondary col-sm-11 col-md-11 col-lg-8"
                    style={styles.box}
                  >
                    <div className="mb-5">
                      <h5 className="mb-4">Suppression du compte</h5>
                      <p>Voulez-vous supprimer ce compte ?</p>
                    </div>
                    <div className="pr-2">
                      <button
                        type="submit"
                        data-toggle="modal"
                        data-target="#exampleModalCenter"
                        style={styles.button}
                        className="btn btn-danger col-12 col-md-6 col-lg-4 float-right"
                      >
                        Supprimer ce compte ?
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="exampleModalCenter"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    Confirmer la suppression du compte ?
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>Souhaitez-vous vraiment supprimer votre compte ?</p>
                  <p>Cette action est définitive et irréversible</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-dismiss="modal"
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                    onClick={this.handleClick}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}

Settings.propTypes = {
  deleteAccount: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  password: state.password
});

export default connect(
  mapStateToProps,
  { changePassword, deleteAccount, logoutUser }
)(withRouter(Settings));

const styles = {
  container: {
    border: "none"
  },
  margin: {
    marginBottom: '15vh'
  },
  photo: {
    margin: "-20vh auto"
  },
  button: {
    fontsize: "0.7em"
  },
  box: {
    border: "solid 2px #eee",
    boxShadow: "0 2px 3px #ccc",
    padding: "7vh"
  },
  fondImage: {
    height: "22vh",
    width: "22vh",
    position: "absolute",
    zIndex: 2
  },
  imageOver: {
    position: "absolute",
    zIndex: 1,
    backgroundColor: "#a6a6a6"
  },
};
