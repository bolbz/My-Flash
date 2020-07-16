import React from "react";
import axios from "axios";
import Moment from "react-moment";

export default class General extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infos: []
    };
  }
  async componentDidMount() {
    await axios
      .get("/api/users/infos")
      .then(res => {
        if (res.data === null) {
          console.error("Aucun utilisateur");
        } else {
          this.setState({
            infos: res.data.data
          });
        }
      })
      .catch(error => {
        console.error(error.data);
      });
  }

  render() {
    const { infos } = this.state;
    const total = infos.length;

    return (
      <div className="container-fluid">
        <h1 style={{ textAlign: "center" }}>Infos générales:</h1>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>EMAIL</th>
              <th>PRENOM</th>
              <th>NOM</th>
              <th>INSCRIPTION</th>
            </tr>
          </thead>
          <tbody>
            {infos.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{value.email} </td>
                  <td>{value.firstname}</td>
                  <td>{value.lastname}</td>
                  <td>
                    <Moment format="YYYY/MM/DD">{value.date}</Moment>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <p>Le nombre total d'inscrits actuel est de {total}</p>
        </div>
      </div>
    );
  }
}
