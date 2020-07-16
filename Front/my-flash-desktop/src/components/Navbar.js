import React, { Component } from 'react';
import { stack as Menu } from "react-burger-menu";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DefaultImg from '../images/Mascotte_01B.png'
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
import "../App.css";
import axios from 'axios';

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addClass: false,
      firstName: null,
      lastName: null,
      profileValue: "Urgences",
      show: false,
      photoprofil: {},
      apikey: "",
      report: null,
      preview: null,
      baseImage: DefaultImg
    };
  }

  componentDidMount = () => {
    axios.get("/api/users/me").then(response => {
      this.setState({
        apikey: response.data.apikey
      });
      axios.get("/api/upload/profilImg/" + this.state.apikey).then((res, err) => {
          if (!err && res.data.message === "photo de profil connu") {
            this.setState({ photoprofil: res.data.profileImage });
          }
          if (res.data.message === "Pas de photo de profil") {
            this.setState({ baseImage: DefaultImg, photoprofil: null });
          }
        });
    });
  };

  setDefaultImage() {
    this.setState({
      baseImage: DefaultImg
    });
  }

  // fonction appelant la requête logoutUser permettant la deconnexion
  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  render() {
    // constantes dans lesquelles on assigne props.auth afin de savoir si on est connecté 
    const { isAuthenticated, user } = this.props.auth;
    const { photoprofil, baseImage } = this.state;
    // constante retournant du jsx utilisé
    const authLinks = (
      <Menu right>
        {photoprofil !== null && (
          <img
            src={photoprofil.imageData}
            style={styles.img}
            alt="Profil"
            className="rounded-circle outerborder img-fluid"
          />
        )}
        {photoprofil === null && (
          <img
            src={baseImage}
            style={styles.img}
            alt="Profil default"
            className="rounded-circle img-fluid"
          />
        )}

        <a href="/editer-profile-general" className="nav-link menu-item text-center pl-0 pb-4 border-bottom">
          {user.firstname} {user.lastname}
        </a>
        <a className="menu-item pl-4" href='/profile'> Mon profil</a>
        <a className="menu-item pl-4" href='/editer-profile'>Gérer mes profils</a>
        <a className="menu-item pl-4" href='/settings'>Mon compte</a>
        <a className="menu-item pl-4" href='https://www.my-flash.fr/' target="_blank" rel="noopener noreferrer">Boutique</a>
        <a className="menu-item pl-4" href=' ' onClick={this.onLogout.bind(this)}>Déconnexion</a>
      </Menu>
    )
    // constante retournant du jsx utilisé
    const guestLinks = (
      <Menu right className="p-0 m-0 ">
        <img
          src={baseImage}
          style={styles.img}
          alt="Profil default"
          className="rounded-circle img-fluid mb-5"
        />
        <a className="menu-item pl-4" href='/inscription'>S'inscrire
                </a>
        <a className="menu-item pl-4" href='/connection'>Se connecter
                </a>
        <a className="menu-item pl-4" href='https://www.my-flash.fr/' target="_blank" rel="noopener noreferrer">Boutique</a>
      </Menu>
    )
    return (

      <div className="container-fluid p-0 m-0">
        {/* si l'utilisateur est connecté alors on affiche authLinks
                    sinon on affiche guestLinks */}
        {isAuthenticated ? authLinks : guestLinks}
      </div>


    )
  }
}

// PropTypes vérifie que les données reçues via les props sont valides
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

// premier paramètre de "connect", mapStateToProps est utilisé pour
// sélectionner la partie des données du store que le composant connecté
// (ici Navbar.js) a besoin.
const mapStateToProps = (state) => ({
  auth: state.auth
})

// connect permet de connecter notre fichier Navbar.js à notre store redux
// withRouter permet d'accèder aux propriétés de l'objet history et d'être redirigé même
// si on est en-dehors d'un router
export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));

const styles = {
  img: {
    width: '130px',
    height: '130px',
    margin: 'auto',
    border: 'solid 4px white',
    outlineStyle: 'none'
  }
}