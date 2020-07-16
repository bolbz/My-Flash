import React from "react";
import axios from "axios";
import "./Profile.css";
import Photo_cache from "../../images/Photo_cache1.png";
import ProfileContain from "../Profile/ProfileContain";
import Navbar from "../Navbar";
import Avatar from "react-avatar-edit";
import { Modal, Button } from "react-bootstrap";
import DefaultImg from "../../images/Mascotte_01B.png";
import DefaultBack from "../../images/images.jpeg";
import FileBase64 from 'react-file-base64';

const tempProfileArray = ["Privé", "Public", "Urgences"];

export default class ProfileHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addClass: false,
      firstName: null,
      lastName: null,
      profileValue: localStorage.getItem("profileValue") || "Privé",
      show: false,
      photoProfil: {},
      photoBack: {
        bandeauData: DefaultBack
      },
      showBandeau: false,
      apikey: "",
      preview: null,
      baseImage: DefaultImg,
      baseImage1: DefaultBack
    };
    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this);
  }

  componentDidMount = () => {
    axios.get("/api/users/me").then(response => {
      this.setState({
        firstName: response.data.firstname,
        lastName: response.data.lastname,
        apikey: response.data.apikey,
      });
      axios.get("api/upload/profilImg/" + this.state.apikey).then((res, err) => {
        if (!err && res.data.message === "photo de profil connu") {
          this.setState({ photoProfil: res.data.profileImage });
        }
        if (res.data.message === "Pas de photo de profil") {
          this.setState({ baseImage: DefaultImg, photoProfil: null });
        }
      });
      axios.get("api/upload/ImgBack/" + this.state.apikey).then((res, err) => {
        if (!err && res.data.message === "photo d'arriere plan connu") {
          this.setState({ photoBack: res.data.bandeauImage });
        }
        if (res.data.message === "Pas de photo d'arriere plan") {
          this.setState({ baseImage1: DefaultBack });
        }
      })
    });
  };

  onBeforeFileLoad(elem) {
    if (elem.target.files[0].size > 1501680) {
      alert("La taille du fichier ne peut pas excéder 1.5Mo");
      elem.target.value = "";
    }
  }

  handleShow = () => {
    this.setState({ show: true });
  };

  handleHide = () => {
    this.setState({ show: false });
  };

  handleBandeau = () => {
    this.setState({ showBandeau: true });
  };

  HideBandeau = () => {
    this.setState({ showBandeau: false });
  };

  onClose() {
    this.setState({ preview: null });
  }

  onCrop(preview) {
    this.setState({ preview });
  }

  setDefaultImage() {
    this.setState({
      baseImage: DefaultImg
    });
  }
  setDefault() {
    this.setState({
      baseImage1: DefaultBack
    });
  }


  // function to capture base64 format of an image
  getBaseFile() {
   
    if(this.state.preview !== null){
    let imageObj = {
      imageName: "base-image-" + Date.now(),
      imageData: this.state.preview.toString()
    };
    axios.post("api/upload/uploadbase/" + this.state.apikey, imageObj)
      .then(data => {
        if (data.data.success) {
          alert("Image has been successfully uploaded");
          this.setDefaultImage();
        }
      })
      .catch(err => {
        alert("Error while uploading image");
        this.setDefaultImage();
      });
    window.location.reload();
  } else {
    return;
  }
  }
  // fonciton pour transformer ton image en base64
  getBaseBandeau(files) {
    this.setState({
      bandeau: files.base64
    })
    let bandeauObj = {
      bandeauData: this.state.bandeau.toString()
    };
    this.submit(bandeauObj)
  }

  submit(bandeauObj) {
    axios.post("api/upload/uploadBackImage/" + this.state.apikey, bandeauObj)
      .then(data => {
        if (data.data.success) {
          alert("Image has been successfully uploaded");
          this.setDefault()
        }
      })
      .catch(err => {
        alert("Error while uploading image");
        this.setDefault();
      });
    window.location.reload()
  }


  moveOutline = () => {
    this.setState({ addClass: !this.state.addClass });
  };

  handleChange = event => {
    this.setState({ profileValue: event.target.value },
      localStorage.setItem("profileValue", this.state.profileValue)
    );
  };

  render() {
    let boxClass = ["paused", "photo_cache_rotate"];
    if (this.state.addClass) {
      boxClass.shift();
    }
    const { photoProfil, baseImage, photoBack } = this.state;
    return (
      <div className="container-fluid p-0 m-0" style={styles.all} id="navbar">

        <Navbar pageWrapId={"page-wrap"} outerContainerId={"navbar"} />
        <div className="row limit" id="page-wrap">

          <div className="col-md-8 offset-md-2 col-12 mt-4">
            <div className="row">
              <div className="col-md-12 col-12 user-detail-main mb-3 pb-2">
                {window.location.pathname === "/editer-profile-general" && (
                  <div>
                    <div className="row">
                      <Button className="boutton" onClick={this.handleBandeau} variant="outline-light">Modifier bandeau</Button>
                      <div className="col-md-12 col-12 user-detail-main">
                        <div className="row align-items-center">
                          <div style={{ backgroundImage: 'url(' + this.state.photoBack.bandeauData  + ')' }}
                            className="col-md-12 col-12 profile-back pb-5 d-flex align-items-center justify-content-center">
                            {photoBack === null && (
                              <img
                                onClick={this.handleBandeau}
                                src={this.state.baseImage1}
                                alt="Profil"
                                className='bg-danger'
                              />
                            )}
                            <div onClick={this.handleShow} className="photo-container d-flex align-items-center justify-content-center">
                              <p className="textOnPhoto d-flex align-items-center justify-content-center rounded-circle" style={styles.textOnHover}>Modifier la photo</p>
                              <img
                                src={Photo_cache}
                                className="photo-cache"
                                style={styles.fondImage}
                                onMouseOver={this.moveOutline.bind(this)}
                                alt=""
                              />
                              {photoProfil !== null && (
                                <img
                                  src={photoProfil.imageData}
                                  style={styles.imageOver}
                                  alt="Profil"
                                  className="rounded-circle img-fluid"
                                />
                              )}
                              {photoProfil === null && (
                                <img
                                  onClick={this.handleShow}
                                  src={baseImage}
                                  style={styles.imageOver}
                                  alt="Profil default"
                                  className="rounded-circle img-fluid"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row ligneBoutonProfil">
                          <div className="form-group profile-select boutonProfil col-sm-12 col-md-4 col-lg-4 mt-4">
                            {this.state.firstName !== "Urgences" &&
                              <a href='/editer-profile' onClick={this.handleChange}>
                                <select
                                  value={this.state.profileValue}
                                  onChange={this.handleChange}
                                  className="form-control"
                                  style={{
                                    width: "50%",
                                    margin: "0 auto",
                                    border: "1px solid #0073cb"
                                  }}
                                  id="sel1"
                                >
                                  {tempProfileArray.map(element => {
                                    return (
                                      <option value={element} key={element}>
                                        Profil {element}
                                      </option>
                                    );
                                  })}
                                </select>
                              </a>
                            }
                          </div>
                          <div className="col-md-4 col-lg-4 col-sm-12 user-detail text-center">
                            <h4 className="m-0">
                              <strong>
                                {this.state.firstName} {this.state.lastName}
                              </strong>
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/*********************************** Partie Modal Bandeau ***************************/}

                    <Modal
                      size="lg"
                      animation
                      dialogClassName="modal-100w"
                      aria-labelledby="example-custom-modal-styling-title"
                      show={this.state.showBandeau}
                      onHide={this.HideBandeau}>

                      <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title align-items-center">
                          Modifier le bandeau
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-md-6">
                            </div>
                            <div className="process__upload-btn">
                              <FileBase64 type="file" multiple={false} onDone={this.getBaseBandeau.bind(this)} />
                            </div>
                          </div>
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="danger" onClick={this.HideBandeau}>
                          Fermer
                        </Button>
                      </Modal.Footer>
                    </Modal>

                    {/* -------------- Partie changement photo de profil------------------ */}

                    <Modal
                      size="lg"
                      animation
                      show={this.state.show}
                      onHide={this.handleHide}
                      dialogClassName="modal-100w"
                      aria-labelledby="example-custom-modal-styling-title">
                      <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                          Modifier la photo :
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div className="card-group">
                          <div className="card mx-auto">
                            <div className="d-flex justify-content-center">
                              {photoProfil !== null && (
                                <Avatar
                                type="file"
                                width={240}
                                height={240}
                                label="chosir une image"
                                onCrop={this.onCrop}
                                onClose={this.onClose}
                                onBeforeFileLoad={this.onBeforeFileLoad}
                                src={photoProfil.imageData}
                              />
                              )}
                              {photoProfil === null && (
                                <Avatar
                                type="file"
                                width={240}
                                height={240}
                                label="chosir une image"
                                onCrop={this.onCrop}
                                onClose={this.onClose}
                                onBeforeFileLoad={this.onBeforeFileLoad}
                                src={this.state.baseImage}
                              />
                              )}
                            </div>
                            <div className="card-body mx-auto">
                              <button onClick={this.getBaseFile.bind(this)}>
                                Sauvegarder
                              </button>
                            </div>
                          </div>
                          <div className="card">
                            <div className="profile-bandeau d-flex justify-content-center align-items-center">
                              <img
                                style={styles.fondImage}
                                src={Photo_cache}
                                className={[
                                  "card-img-top modalProfile",
                                  boxClass.join(" ")
                                ]}
                                onMouseOver={this.moveOutline.bind(this)}
                                alt=""
                              />
                              <img
                                src={this.state.preview}
                                alt="Profil"
                                className="rounded-circle img-fluid"
                                style={{ backgroundColor: "#a6a6a6" }}
                              />
                            </div>
                          </div>
                        </div>
                      </Modal.Body>
                    </Modal>
                  </div>
                )}
                {//On affiche le sélect seulement si on se trouve sur les urls "/profile" ou "/editer-profile"
                  (window.location.pathname === "/profile" ||
                    window.location.pathname === "/editer-profile") && (
                    <div>
                      <div className="row align-items-center">
                        <div style={{ backgroundImage: 'url(' + this.state.photoBack.bandeauData + ')' }}
                          className="col-md-12 col-12 profile-back pb-5 d-flex align-items-center justify-content-center">
                          <img
                            src={Photo_cache}
                            style={styles.fondImage}
                            className={boxClass.join(" ")}
                            onMouseOver={this.moveOutline.bind(this)}
                            alt=""
                          />

                          {photoProfil !== null && (
                            <img
                              src={photoProfil.imageData}
                              style={styles.imageOver}
                              alt="Profil"
                              className="rounded-circle img-fluid"
                            />
                          )}
                          {photoProfil === null && (
                            <img
                              src={baseImage}
                              style={styles.imageOver}
                              alt="Profil default"
                              className="rounded-circle img-fluid"
                            />
                          )}
                        </div>
                      </div>
                      <div className="row ligneBoutonProfil">
                        <div className="form-group profile-select boutonProfil col-sm-12 col-md-4 col-lg-4 mt-4">
                          {this.state.firstName !== "Urgences" &&
                            <div>
                              <select
                                value={this.state.profileValue}
                                onChange={this.handleChange}
                                className="form-control"
                                style={{
                                  width: "50%",
                                  margin: "0 auto",
                                  border: "1px solid #0073cb"
                                }}
                                id="sel1"
                              >
                                {tempProfileArray.map(element => {
                                  return (
                                    <option value={element} key={element}>
                                      Profil {element}
                                    </option>
                                  );
                                })}
                              </select>
                              <div className="col-12 text-center mt-2">
                                <a className="modify-datas-link" href='/editer-profile-general'>
                                    Modifier mes données
                                </a>
                              </div>
                            </div>
                          }
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-12 user-detail text-center">
                          <h4 className="m-0">
                            <strong>
                              {this.state.firstName} {this.state.lastName}
                            </strong>
                          </h4>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
              <ProfileContain profileValue={this.state.profileValue} />
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
  containerImage: {
    height: "26vh"
  },
  fondImage: {
    height: "22vh",
    width: "22vh",
    position: "absolute",
    zIndex: 2,
    borderRadius: '100%',
    cursor: 'pointer'
  },
  textOnHover: {
    position: "absolute",
    zIndex: 4,
    marginTop: '20vh',
    display: 'block',
    height: "22vh",
    width: "22vh",
    fontSize: "2vh",
    color: 'white',
    fontWeight: 'bold'
  },
  imageOver: {
    position: "absolute",
    zIndex: 1,
    backgroundColor: "#a6a6a6"
  },
  presentation: {
    border: "1px solid black",
    padding: "1vh",
    borderRadius: "10px"
  },
  bandeau: {
    position: "absolute",
    zIndex: 4,
    marginTop: '20vh',
    display: 'block',
    height: "22vh",
    width: "22vh",
    fontSize: "2vh",
    color: 'white',
    fontWeight: 'bold'
  },
};
