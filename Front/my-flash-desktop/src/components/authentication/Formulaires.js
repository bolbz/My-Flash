import React, { Component } from "react";
import "./Formulaires.css";
import logoMyFlash from "../../images/Logo_Connexion_Inscription.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../actions/authentication";
import classnames from "classnames";

// Composant qui permet l'inscription à my-flash
class Formulaires extends Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password_confirm: "",
      isEnable: false,
      errors: {},
      sendEmail: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isEnableOrNot = this.isEnableOrNot.bind(this);
  }

  // fonction permettant de changer le state afin de valider les CGU
  isEnableOrNot = () => {
    this.setState({ isEnable: !this.state.isEnable });
    document.getElementById("isDisabled").disabled = true;
  };

  // Fonction permettant l'envoi des données de connexion
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // Fonction permettant l'envoi du formulaire d'inscription
  // Si tous les champs sont correctement remplis nous sommes
  // redirigé vers la page de confirmation via props.history
  handleSubmit = e => {
    e.preventDefault();
    const user = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm
    };
    this.props.registerUser(user, this.props.history);
  };

  // Si l'authentification est correct quand on reçoit les props
  //  alors nous sommes redirigé vers la page profile
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  // Si l'on est déjà connecté (donc déjà inscris) on est redirigé vers l'accueil
  // au chargement du composant
  componentDidMount() {
    document.getElementById("isDisabled").disabled = true;
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    const { errors, sendEmail } = this.state;

    // Si isEnable devient true alors le bouton avec l'id "#isDisabled"
    // devient actif
    if (this.state.isEnable) {
      document.getElementById("isDisabled").disabled = false;
    }

    return (
      <div>
        <div
          className="inscription-page col-10 mx-auto"
          style={{ marginBottom: "10vh" }}
        >
          <div className="logoContainer" style={styles.logoContainer}>
            <img src={logoMyFlash} style={styles.img} alt="My Flash logo" />
          </div>

          <div style={styles.formularyContainer}>
            <div>
              <h2>Inscription :</h2>

              {sendEmail === true && (
                <div>
                  {" "}
                  <p>email envoyé</p>{" "}
                </div>
              )}
              <form onSubmit={this.handleSubmit}>
                <label htmlFor="firstname" className="inputGroup mb-3 col-12">
                  <input
                    type="text"
                    name="firstname"
                    /* classnames permet d'afficher les erreurs côté client*/
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.firstname
                    })}
                    aria-label="Firstname"
                    style={styles.formControl}
                    placeholder="Prénom"
                    value={this.state.firstname}
                    onChange={this.handleInputChange}
                  />
                  {/* si des erreurs émergent, elles sont affichées en-dessous de l'input */}
                  {errors.firstname && (
                    <div className="invalid-feedback">{errors.firstname}</div>
                  )}
                </label>

                <label htmlFor="lastname" className="inputGroup mb-3 col-12">
                  <input
                    type="text"
                    name="lastname"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.lastname
                    })}
                    aria-label="lastname"
                    style={styles.formControl}
                    placeholder="Nom"
                    value={this.state.lastname}
                    onChange={this.handleInputChange}
                  />
                  {errors.lastname && (
                    <div className="invalid-feedback">{errors.lastname}</div>
                  )}
                </label>

                <label htmlFor="email" className="inputGroup mb-3 col-12">
                  <input
                    type="email"
                    style={styles.formControl}
                    name="email"
                    placeholder="Votre Adresse mail"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </label>

                <label htmlFor="password" className="inputGroup mb-3 col-12">
                  <input
                    type="password"
                    name="password"
                    aria-label="password"
                    autoComplete="on"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    style={styles.formControl}
                    placeholder="Mot de Passe "
                    value={this.state.password}
                    onChange={this.handleInputChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </label>

                <label htmlFor="cpassword" className="inputGroup mb-3 col-12">
                  <input
                    type="password"
                    name="password_confirm"
                    aria-label="password_confirm"
                    autoComplete="on"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password_confirm
                    })}
                    style={styles.formControl}
                    placeholder="Confirmer Mot de Passe "
                    value={this.state.password_confirm}
                    onChange={this.handleInputChange}
                  />
                  {errors.password_confirm && (
                    <div className="invalid-feedback">
                      {errors.password_confirm}
                    </div>
                  )}
                </label>

                <div>
                  <div>
                    <p>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="defaultCheck1"
                        onClick={this.isEnableOrNot}
                      />
                      En validant ce formulaire, vous acceptez les{" "}
                      <span
                        style={styles.cgu}
                        data-toggle="modal"
                        data-target="#exampleModalCenter"
                      >
                        conditions générales d'utilisation
                      </span>
                      .
                    </p>
                  </div>
                  <div>
                    <button
                      id="isDisabled"
                      type="submit"
                      className="btn formulary-button Suscribe mb-3"
                      style={styles.suscribe}
                    >
                      Souscrire
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
                    Retour
                  </button>
                </Link>
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
                    Conditions générales d'utilisation
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <h4 className="mt-3"> ARTICLE 1 : Objet </h4>
                  Les présentes « conditions générales d'utilisation » ont pour
                  objet l'encadrement juridique de l’utilisation du site
                  www.myflash.fr et de ses services. Ce contrat est conclu entre
                  : Le gérant du site internet, ci-après désigné « l’Éditeur »,
                  Toute personne physique ou morale souhaitant accéder au site
                  et à ses services, ci-après appelé « l’Utilisateur ». Les
                  conditions générales d'utilisation doivent être acceptées par
                  tout Utilisateur, et son accès au site vaut acceptation de ces
                  conditions.
                  <h4 className="mt-3">ARTICLE 2 : Mentions légales</h4>
                  Le site www.myflash.fr est édité par la société AIRE CUBE,
                  micro-entreprise dont le siège social est situé à : Les 3
                  Minées - 41800 Montoire-sur-le-Loir. La société est
                  représentée par SABBAH Rudy.
                  <h4 className="mt-3">ARTICLE 3 : Accès aux services</h4>
                  L’Utilisateur du site www.myflash.fr a accès aux services
                  suivants : • Consultation des produits présentés • Achat en
                  ligne des produits présentés Tout Utilisateur ayant accès à
                  internet peut accéder gratuitement et depuis n’importe où au
                  site. Les frais supportés par l’Utilisateur pour y accéder
                  (connexion internet, matériel informatique, etc.) ne sont pas
                  à la charge de l’Éditeur. Les services suivants ne sont pas
                  accessibles pour l’Utilisateur que s’il est membre du site
                  (c’est-à-dire qu’il est identifié à l’aide de ses identifiants
                  de connexion) : • Achat en ligne des produits présentés Le
                  site et ses différents services peuvent être interrompus ou
                  suspendus par l’Éditeur, notamment à l’occasion d’une
                  maintenance, sans obligation de préavis ou de justification.
                  <h4 className="mt-3">
                    ARTICLE 4 : Responsabilité de l’Utilisateur
                  </h4>
                  L'Utilisateur est responsable des risques liés à l’utilisation
                  de son identifiant de connexion et de son mot de passe. Le mot
                  de passe de l’Utilisateur doit rester secret. En cas de
                  divulgation de mot de passe, l’Éditeur décline toute
                  responsabilité. L’Utilisateur assume l’entière responsabilité
                  de l’utilisation qu’il fait des informations et contenus
                  présents sur le site www.myflash.fr Tout usage du service par
                  l'Utilisateur ayant directement ou indirectement pour
                  conséquence des dommages doit faire l'objet d'une
                  indemnisation au profit du site. Le site www.myflash.fr ne
                  permet pas aux membres de publier sur le site.
                  <h4 className="mt-3">
                    ARTICLE 5 : Responsabilité de l’Éditeur
                  </h4>
                  Tout dysfonctionnement du serveur ou du réseau ne peut engager
                  la responsabilité de l’Éditeur. De même, la responsabilité du
                  site ne peut être engagée en cas de force majeure ou du fait
                  imprévisible et insurmontable d'un tiers. Le site
                  www.my-flash.fr s'engage à mettre en œuvre tous les moyens
                  nécessaires pour garantir la sécurité et la confidentialité
                  des données. Toutefois, il n’apporte pas une garantie de
                  sécurité totale. L’Éditeur se réserve la faculté d’une
                  non-garantie de la fiabilité des sources, bien que les
                  informations diffusées sur le site soient réputées fiables.
                  <h4 className="mt-3">ARTICLE 6 : Propriété intellectuelle</h4>
                  Les contenus du site www.myflash.fr (logos, textes, éléments
                  graphiques, vidéos, etc.) sont protégés par le droit d’auteur,
                  en vertu du Code de la propriété intellectuelle. L’Utilisateur
                  devra obtenir l’autorisation de l’éditeur du site avant toute
                  reproduction, copie ou publication de ces différents contenus.
                  Ces derniers peuvent être utilisés par les utilisateurs à des
                  fins privées ; tout usage commercial est interdit.
                  L’Utilisateur est entièrement responsable de tout contenu
                  qu’il met en ligne et il s’engage à ne pas porter atteinte à
                  un tiers. L’Éditeur du site se réserve le droit de modérer ou
                  de supprimer librement et à tout moment les contenus mis en
                  ligne par les utilisateurs, et ce sans justification.
                  <h4 className="mt-3">ARTICLE 7 : Données personnelles</h4>
                  L’Utilisateur doit obligatoirement fournir des informations
                  personnelles pour procéder à son inscription sur le site.
                  L’adresse électronique (e-mail) de l’utilisateur pourra
                  notamment être utilisée par le site [nom de votre site] pour
                  la communication d’informations diverses et la gestion du
                  compte. [Votre site] garantie le respect de la vie privée de
                  l’utilisateur, conformément à la loi n°78-17 du 6 janvier 1978
                  relative à l'informatique, aux fichiers et aux libertés. Le
                  site est déclaré auprès de la CNIL en date du 7 Mars 2017 sous
                  le numéro suivant : 2041950v0. En vertu des articles 39 et 40
                  de la loi en date du 6 janvier 1978, l'Utilisateur dispose
                  d'un droit d'accès, de rectification, de suppression et
                  d'opposition de ses données personnelles. L'Utilisateur exerce
                  ce droit via : • Son espace personnel sur le site ; • Un
                  formulaire de contact ; • Par mail à : airecube@gmail.com ; •
                  Par voie postale à : Les 3 Minées - 41800
                  Montoire-sur-le-Loir.
                  <h4 className="mt-3">ARTICLE 8 : Liens hypertextes</h4>
                  Les domaines vers lesquels mènent les liens hypertextes
                  présents sur le site n’engagent pas la responsabilité de
                  l’Éditeur de [votre site], qui n’a pas de contrôle sur ces
                  liens. Il est possible pour un tiers de créer un lien vers une
                  page du site www.my-flash.fr sans autorisation expresse de
                  l’éditeur.
                  <h4 className="mt-3">
                    ARTICLE 9 : Évolution des conditions générales d’utilisation
                  </h4>
                  Le site www.my-flash.fr se réserve le droit de modifier les
                  clauses de ces conditions générales d’utilisation à tout
                  moment et sans justification.
                  <h4 className="mt-3">ARTICLE 10 : Durée du contrat</h4>
                  La durée du présent contrat est indéterminée. Le contrat
                  produit ses effets à l'égard de l'Utilisateur à compter du
                  début de l’utilisation du service.
                  <h4 className="mt-3">
                    ARTICLE 11 : Droit applicable et juridiction compétente
                  </h4>
                  Le présent contrat dépend de la législation française. En cas
                  de litige non résolu à l’amiable entre l’Utilisateur et
                  l’Éditeur, les tribunaux de Blois sont compétents pour régler
                  le contentieux.
                </div>
              </div>
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
    fontSize: "130%",
    color: "white",
    backgroundColor: "#0086CB"
  },
  cgu: {
    color: "#0086CB",
    cursor: "pointer"
  }
};

// PropTypes vérifie que les données reçues via les props sont valides
Formulaires.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

// premier paramètre de "connect", mapStateToProps est utilisé pour
// sélectionner la partie des données du store que le composant connecté
// (ici Formulaires.js) a besoin.
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  password: state.password,
  firstname: state.firstname,
  lastname: state.lastname,
  email: state.email
});

// connect permet de connecter notre fichier Formulaires.js à notre store redux
// withRouter permet d'accèder aux propriétés de l'objet history et d'être redirigé même
// si on est en-dehors d'un router
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Formulaires));
