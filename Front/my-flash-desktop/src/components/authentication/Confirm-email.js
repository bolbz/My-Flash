import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../images/Spinner.gif";
import { withRouter } from "react-router-dom";
import { confirmUser } from "../../actions/authentication";
import { notify } from "react-notify-toast";
import axios from "axios";

// Composant qui s'affiche à la confirmation de l'inscription en cliquant
// sur le lien dans le mail de confirmation
class ConfirmUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      willUnmount: true,
      errors: {}
    };
  }

  // avant que le composant soit rendu on confirme que les infos sont justes

  // on récupère le token via l'url puis les données via axios et si l'on a une réponse avec le message
  // "le lien est valide" c'est que le token n'a pas expiré
  // et une notification indiquant le succès de l'inscription apparait

  async componentDidMount() {
    const user = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password
    };

    let token = this.props.match.params.token;
    await axios.get("/api/users/register/confirm/" + token).then(res => {
      if (res.data.message === "le lien est valide") {
        notify.show("Votre inscription a bien été enregistrée !");
      } else if (res.data.message === "le lien n'est pas valide" || res.data.message === undefined) {
        notify.show("Le lien n'est plus valide !");
      }
    });
    // On utilise l'action confirmUser afin de changer de page ou d'afficher les erreurs
    this.props.confirmUser(user, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/connection");
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
        <div
          className="container-fluid"
          style={{
            height: "100vh",
            justifyContent: "center",
            textAlign: "center",
            paddingTop: "10vh",
          }}
        >
          <img src={Spinner} alt="Loading" />
        </div>
      </div>
    );
  }
}
confirmUser.propTypes = {
  confirmUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  firstname: state.firstname,
  lastname: state.lastname,
  email: state.email,
  password: state.password
});

export default connect(
  mapStateToProps,
  { confirmUser }
)(withRouter(ConfirmUser));
