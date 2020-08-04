import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";

// import { withRouter } from 'react-router-dom'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
};

var Colors = {
  "toolbar": "#555b6e",
  "button": "#FFFFFF"

};

class ApplicationBar extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar style={{ backgroundColor: Colors.toolbar }}>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Link to={"/signin"} variant="h6" color="inherit" className={classes.grow}>
              <Button
              >
                Home
              </Button>
            </Link>
            <Link to={"/signin"}>
              <Button
              >
                Login
              </Button>
            </Link>
            <Link to={"/register"} >
              <Button
              >
                Register
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
ApplicationBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ApplicationBar);