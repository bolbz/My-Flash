import React from "react";
import { activeCards } from "../../actions/authentication";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import axios from "axios";

class GestionProfil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount = () => {
    axios.get("/api/active/activeCards").then(response => {
      if (response === undefined) {
        return;
      } else {
        this.setState({
          tab: response.data.datas
        });
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.tab !== undefined) {
      const datas = {
        Coordonates: this.state.tab.Coordonates,
        Identities: this.state.tab.Identities,
        Health: this.state.tab.Health,
        SocialNetworks: this.state.tab.SocialNetworks,
        Professional: this.state.tab.Professional,
        Hobbies: this.state.tab.Hobbies
      };
      this.props.activeCards(datas);
    } else {
      const datas = {
        Coordonates: true,
        Identities: true,
        Health: true,
        SocialNetworks: true,
        Professional: true,
        Hobbies: true
      };
      this.props.activeCards(datas);
    }
  };

  _changeBoolean(key) {
    const tempTab = this.state.tab;
    tempTab[key] = !tempTab[key];
    this.setState({ tab: tempTab });
  }

  render() {
    if (this.state.tab !== undefined) {
      const array = this.state.tab;
      const value = Object.values(array);
      const buttons = Object.keys(array).map((key, index) => {
        if (key !== "_id" && key !== "admin" && key !== "__v") {
          return (
              <button
                className={value[index] ? " bg-primary" : "bg-danger"}
                style={styles.buttons}
                onClick={() => this._changeBoolean(key)}
                key={key}
              >
                {key}
              </button>
          );
        }
        return null;
      });

      return (
        <div className="container">
          <div
            style={styles.row}
            className="row  Height col-12 justify-content-center align-items-center"
          >
            {buttons}
          </div>
          <div className="row col-12 saveButton justify-content-center align-items-center">
            <button style={styles.savebutton} onClick={this.handleSubmit}>
              Sauvegarder
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <button style={styles.savebutton} onClick={this.handleSubmit}>
            Sauvegarder
          </button>
        </div>
      );
    }
  }
}

GestionProfil.propTypes = {
  activeCards: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors
});

const styles = {
  buttons: {
    color: "white",
    marginTop: "5vh",
    border: "2px solid #0073cb",
    borderRadius: "7px",
    fontSize: "1rem",
    margin: "2vh",
    padding: "1vh",
    cursor: "pointer",
    width: "25vh"
  },
  savebutton: {
    color: "white",
    backgroundColor: "green",
    marginTop: "5vh",
    borderRadius: "7px",
    fontSize: "1rem",
    margin: "2vh",
    padding: "1vh",
    cursor: "pointer",
    width: "25vh"
  },
  row: { 
    marginTop: "10vh"
  },
 
};

export default connect(
  mapStateToProps,
  { activeCards }
)(withRouter(GestionProfil));
