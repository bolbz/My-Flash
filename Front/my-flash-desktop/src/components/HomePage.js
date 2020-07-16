import React from "react";
import homepage_image from "../images/homepage_image.png";
import "./HomePage.css";
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
  render() {
    return (
      <div>
      <div className="container-fluid" style={styles.container}>
        <div className="row col-12 m-0 justify-content-center">
          <div className="col-12 pb-0">
            <img
              className="img-fluid"
              style={styles.responsive}
              src={homepage_image}
              alt="My Flash logo"
            />
          </div>
          <div className="col-12 mt-4">
            <Link to="/connection">
              <button className="mt-0" style={styles.button}>
                Connexion
            </button>
            </Link>
          </div>
          <div className="col-12 mt-3">
            <Link to="/inscription">
              <button style={styles.button}>Inscription</button>
            </Link>
          </div>
          <div className="col-12 mt-3">
            <Link to="/description">
              <button style={styles.kezako}>Qu'est-ce que c'est ?</button>
            </Link>
          </div>
          <div className="col-12">
            <a
              className="col-9 col-md-4 col-lg-4"
              style={styles.lien}
              href="https://www.my-flash.fr"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.my-flash.fr
            </a>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default HomePage;

const styles = {
  container: {
    height: "90vh",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    marginBottom: '10vh'
  },
  button: {
    color: "white",
    marginTop: "2vh",
    backgroundColor: "#0085c5",
    borderRadius: "7px",
    paddingTop: "1vh",
    paddingBottom: "1vh",
    fontSize: "1rem",
    cursor: "pointer",
    width: "30vh",
    "@media only screen and (maxWidth: 1024px)": {
      width: "80vw"
    },
    "@media only screen and (minWidth: 1025px)": {
      maxHeight: "80vh",
      width: "100%"
    }
  },
  kezako: {
    color: "#0085c5",
    backgroundColor: "#FFF",
    marginTop: "5vh",
    border: "2px solid #0085c5",
    borderRadius: "7px",
    fontSize: "1rem",
    paddingTop: "1vh",
    paddingBottom: "1vh",
    width: "30vh",
    cursor: "pointer"
  },
  lien: {
    fontSize: "0.8rem",
    textDecoration: "none",
    color: "grey"
  },
  responsive: {
    height: "40vh"
  }
};
