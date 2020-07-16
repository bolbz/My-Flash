import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { logoutAdmin } from '../../actions/authentication';


class Admin extends React.Component {

  componentDidMount() {
    if (!this.props.admin.Authenticated) {
      this.props.history.push("/connection-admin")
    }
     if (this.props.auth.isAuthenticated) {
      this.props.history.push("/")
    }
  }
  render() {
    return (
      <div className="content container-fluid" style={{ margin: 0, padding: 0 }}>
        <div className="row">
        <div className="col-md-2 col-sm-12" style={{ margin: 0, padding: 0 }}>
          <MuiThemeProvider >
            <Header />
          </MuiThemeProvider>
        </div>
        <div className="col-md-10 col-sm-12" style={{ margin: 0, padding: 0 }}>
          <Sidebar />
        </div>
        </div>
      </div>
    )
  }
}

Admin.propTypes = {
  logoutAdmin: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  admin: state.admin,
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { logoutAdmin })(withRouter(Admin));
