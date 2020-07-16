import React from 'react'
import ProfileHeader from './ProfileHeader'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authentication';
import { withRouter } from 'react-router-dom';


class Profile extends React.Component {

    // Si nous sommes déjà authentifié au chargement du composant 
    // nous sommes redirigé vers la page profile
    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
        if (this.props.admin.Authenticated) {
            this.props.history.push('/');
        }
    }

    // Si l'authentification est correct quand on reçoit les props
    //  alors nous sommes redirigé vers la page profile
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

    render() {
        return (
            <div>
                <div className="container-fluid p-0 m-0" id="navbar">
                    <div id="page-wrap">
                        <ProfileHeader />
                    </div>
                </div>
            </div>
        )
    }
}

// PropTypes vérifie que les données reçues via les props sont valides
Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    admin: PropTypes.object.isRequired
}

// premier paramètre de "connect", mapStateToProps est utilisé pour
// sélectionner la partie des données du store que le composant connecté
// (ici Profile.js) a besoin.
const mapStateToProps = (state) => ({
    auth: state.auth,
    admin: state.admin
})

// connect permet de connecter notre fichier Profile.js à notre store redux
// withRouter permet d'accèder aux propriétés de l'objet history et d'être redirigé même
// si on est en-dehors d'un router
export default connect(mapStateToProps, { logoutUser })(withRouter(Profile));
