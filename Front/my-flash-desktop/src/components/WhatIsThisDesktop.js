import React from "react";
import { Link } from 'react-router-dom';
import logo_row from "../images/my_flash_logo_row.png";
import logo_mobile from "../images/homepage_image.png"
import whatisthis from "../whatisthis";

class WhatIsThisDesktop extends React.Component {
  render() {
    return (
      <div>
        <div className="container-fluid d-flex align-items-center" style={styles.container}>
          <div className="row m-0 justify-content-center">
            <div className="col-12 col-md-10 col-lg-8 d-flex justify-content-center ml-auto mr-auto mt-4">
              {window.innerWidth <= 768 ? (
                <img
                  className="img-fluid"
                  style={styles.responsive}
                  src={logo_mobile}
                  alt="My Flash logo"
                />
              ) : (
                  <img
                    className="img-fluid"
                    style={styles.responsive}
                    src={logo_row}
                    alt="My Flash logo"
                  />
                )}
            </div>
            <span className="col-12 col-md-10 col-lg-8 ml-auto mr-auto text-right mt-3" style={styles.small_title}>FABRICATION 100% FRANÇAISE</span>
            <span className="col-12 col-md-10 col-lg-8 ml-auto mr-auto py-1" style={styles.title}>{whatisthis.title}</span>
            <div className="col-12 col-md-10 col-lg-8 ml-auto mr-auto mt-4 p-0 text-justify" style={styles.text}>
              {whatisthis.content}
            </div>
            <div className="col-12 col-md-10 col-lg-8 ml-auto mr-auto text-center mt-3">
              <Link to="/">
                <button type="submit" style={styles.returnButton} className="btn col-12">
                  Retour
            </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  responsive: {
    height: '30vh',
  },
  container: {
    // marginBottom: '20vh'
  },
  small_title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#B1B2B4'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: "#0085CB",
    color: 'white'
  },
  text: {
    fontSize: 20
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
  }
};

export default WhatIsThisDesktop