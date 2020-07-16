import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './headers.css';
import avatar from '../../images/Mascotte.png';
import {logoutAdmin} from '../../actions/authentication';
import {withRouter} from 'react-router-dom';


 class Header extends Component {
     
    onLogout(e) {
        e.preventDefault();
        this.props.logoutAdmin(this.props.history);
    }
    
    render() {
        const styles = {
            tabLink: {
                height: 50,
            },
            tabLabel: {
                fontSize: '3vh',
                color: 'white',
                textTransform: 'none',
            }
           
        };
        return (

            <div className="p-0 m-0">
                <Paper
                    zDepth={1}
                    className="sidenav pb-0 mb-0"
                    children={
                        <div className="content-wrapper p-0 m-0">

                            <center>
                                <div className="d-flex ml-2 justify-content-center relative-avi-wrapper">
                                    <Paper className="avi-border" circle />
                                    <img src={avatar} className="avatar img-fluid" alt="Avatar" />
                                </div>
                            </center>
                            <div className="relative-nav-wrapper">

                                <center>
                                    <div>
                                        <p className="initial">R<span className="name">udy</span></p>
                                    </div>
                                    <div>
                                        <p className="initial">S<span className="name">abbah</span></p>
                                    </div>
                                </center>

                                <Divider className="mt-2" />
                                <div className="row justify-content-center mt-3">
                                    <FlatButton
                                        style={styles.tabLink}
                                        onClick={this.onLogout.bind(this)}
                                        label="Déconnexion"
                                        labelStyle={styles.tabLabel}
                                        disableTouchRipple
                                         />
                                </div>
                            </div>
                        </div>
                    }
                />
            </div>
        )
    }
}


Header.propTypes = {
    logoutAdmin: PropTypes.func.isRequired,
    admin: PropTypes.object.isRequired,
  }
  
//   // premier paramètre de "connect", mapStateToProps est utilisé pour
//   // sélectionner la partie des données du store que le composant connecté
//   // (ici Connection.js) a besoin.
  const mapStateToProps = (state) => ({
    admin: state.admin,
  })
  
//   // connect permet de connecter notre fichier Connection.js à notre store redux
//   // withRouter permet d'accèder aux propriétés de l'objet history et d'être redirigé même
//   // si on est en-dehors d'un router
export  default connect(mapStateToProps, {logoutAdmin})(withRouter(Header));


