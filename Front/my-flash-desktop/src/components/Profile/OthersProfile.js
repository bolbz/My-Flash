import React from 'react'
import axios from "axios";
import './Profile.css';
import OthersProfileContain from './OthersProfileContain';
import Navbar from "../Navbar";
import DefaultImg from "../../images/Mascotte_01B.png";
import Photo_cache from "../../images/Photo_cache1.png";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const tempProfileArray = ["Public", "Urgences"];

class OthersProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            report: this.datasJson,
            addClass: false,
            profileValue: "Public",
            found: null,
            chipId: window.location.pathname.substring(6),
            chipUserApikey: null,
            baseImage: DefaultImg,
            photoprofil: null,
        };
    }

    componentDidMount = () => {
        if (this.props.auth.isAuthenticated) {
            axios.get("/api/users/me").then(response => {
                this.setState({
                    userApikey: response.data.apikey,
                    userFirstName: response.data.firstname,
                    isAuthenticated: true
                });
            });
        } else {
            this.setState({
                userApikey: "",
                isAuthenticated: false
            });
        }

        axios.get("/api/users/findChip/" + this.state.chipId).then(response => {
            this.setState({
                found: response.data.found
            });
            if (this.state.found) {
                this.setState({
                    chipUserId: response.data.userId
                })
                axios.get("/api/users/chipUser/" + this.state.chipUserId).then(response => {
                    this.setState({
                        chipUserApikey: response.data.chipUserApikey,
                        firstName: response.data.firstname,
                        lastName: response.data.lastname
                    })
                    axios.get("/api/upload/profilImg/" + this.state.chipUserApikey).then((res, err) => {
                        if (!err && res.data.message === "photo de profil connu") {
                            this.setState({ photoprofil: res.data.profileImage });
                        }
                        if (res.data.message === "Pas de photo de profil") {
                            this.setState({ baseImage: DefaultImg, photoprofil: null });
                        }
                    });
                })
            } else {
                this.setState({
                    chipUserApikey: ""
                })
            }
        });
    };

    test = () => {
        this.setState({ addClass: !this.state.addClass });
    };

    handleChange = (event) => {
        this.setState({ profileValue: event.target.value });
    }

    moveOutline = () => {
        this.setState({ addClass: !this.state.addClass });
    };

    render() {
        let boxClass = ["paused", "photo_cache_rotate"];
        if (this.state.addClass) {
            boxClass.shift();
        }
        const { photoprofil, baseImage } = this.state;
        return (
            this.state.chipUserApikey !== null && this.state.found !== null && this.state.userApikey !== undefined &&
            <div>
            <div className="container-fluid" style={styles.all}>
                <Navbar pageWrapId={"page-wrap"} outerContainerId={"navbar"} />
                <div className="row limit" id="page-wrap">
                    <div className="col-md-8 offset-md-2 col-12 profile-main mt-4">
                        <div className="row">
                            <div className="col-md-12 col-12 user-detail-main border mb-3 pb-2">
                                <div className="row align-items-center">
                                    <div className="col-md-12 col-12 profile-back pb-5 d-flex align-items-center justify-content-center">
                                        <img
                                            src={Photo_cache}
                                            style={styles.fondImage}
                                            className={boxClass.join(" ")}
                                            onMouseOver={this.moveOutline.bind(this)}
                                            alt="Profil"
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
                                                alt="Profil"
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
                                        <div className="form-group">
                                            {this.state.userFirstName === "Urgences" &&
                                                <select
                                                    value={this.state.profileValue}
                                                    onChange={this.handleChange}
                                                    className="form-control"
                                                    style={{
                                                        width: "20%",
                                                        margin: "0 auto",
                                                        border: "1px solid #0073cb"
                                                    }}
                                                    id="sel1"
                                                >
                                                    {
                                                        tempProfileArray.map(element => {
                                                            return (
                                                                <option value={element} key={element}>
                                                                    Profil {element}
                                                                </option>
                                                            );
                                                        })
                                                    }
                                                </select>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <OthersProfileContain profileValue={this.state.profileValue} found={this.state.found} chipId={this.state.chipId} chipUserApikey={this.state.chipUserApikey} userApikey={this.state.userApikey} userFirstName={this.state.userFirstName} isAuthenticated={this.state.isAuthenticated} />
                    </div>
                </div>
            </div>
    </div>
        );
    }
}

const styles = {
    all: {
        minHeight: "90vh",
        maxHeight: "fit-content"
    },
    fondImage: {
        height: "22vh",
        width: "22vh",
        position: "absolute",
        zIndex: 2,
        borderRadius: '100%',
        cursor: 'pointer'
    },
    imageOver: {
        position: "absolute",
        zIndex: 1,
        backgroundColor: "#a6a6a6"
    },
};

// PropTypes vérifie que les données reçues via les props sont valides
OthersProfile.propTypes = {
    auth: PropTypes.object.isRequired
}

// premier paramètre de "connect", mapStateToProps est utilisé pour
// sélectionner la partie des données du store que le composant connecté
// (ici OthersProfile.js) a besoin.
const mapStateToProps = (state) => ({
    auth: state.auth
})

// connect permet de connecter notre fichier OthersProfile.js à notre store redux
// withRouter permet d'accèder aux propriétés de l'objet history et d'être redirigé même
// si on est en-dehors d'un router
export default connect(mapStateToProps)(withRouter(OthersProfile));