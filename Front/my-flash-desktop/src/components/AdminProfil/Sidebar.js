import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import General from './General';
import CGU from './CGU';
import ResetPassAdmin from './ResetPassAdmin';
import Partners from '../AdminProfil/Partners';
import GestionProfil from '../AdminProfil/GestionProfil';

function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }
  
  TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
  const styles = theme => ({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
  });

 class Sidebar extends Component {
    state = {
        value: 0,
      };
    
      handleChange = (event, value) => {
        this.setState({ value });
      };
    
    render(){
        const { classes } = this.props;
        const { value } = this.state;
    
        return (
            <div className={classes.root}>
              <AppBar position="static">
                <Tabs value={value} onChange={this.handleChange}>
                <Tab label="Général" />
                  <Tab label="Gestion Profils" />
                  <Tab label="Partenaires" />
                  <Tab label="CGU" />
                  <Tab label="Utilisateurs" />
                  <Tab label="Réglages" />
                </Tabs>
              </AppBar>
              {value === 0 && <TabContainer><General/></TabContainer>}
              {value === 1 && <TabContainer><GestionProfil/></TabContainer>}
              {value === 2 && <TabContainer><Partners /></TabContainer>}
              {value === 3 && <TabContainer><CGU /></TabContainer>}
              {value === 4 && <TabContainer>Créer des utilisateurs</TabContainer>}
              {value === 5 && <TabContainer><ResetPassAdmin/></TabContainer>}
            </div>
          );
    }
}
Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(styles)(Sidebar);
