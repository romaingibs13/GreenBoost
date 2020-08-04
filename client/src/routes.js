import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Particles from 'react-particles-js';

import withStyles from '@material-ui/core/styles/withStyles';

import Home from './Components/Home/Home';
import BrandList from './Components/BrandList/BrandList';
import AddBrand from './Components/AddBrand/AddBrand';
import Register from './Components/Register/Register';
import SignIn from './Components/SignIn/SignIn';
import ApplicationBar from "./Components/ApplicationBar/ApplicationBar";

const styles = {
  backdrop: {
    background: 'linear-gradient(#23CE6b, #285943)',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: -100
  }
};

function AppRouter({ classes }) {
  return (
    <div>
      <Particles
        className={classes.backdrop}
        params={{
          "particles": {
            "number": {
              "value": 200
            },
            "size": {
              "value": 3
            }
          }
        }} />
      <Router>
        <ApplicationBar />
        <Route path="/" exact component={Home} />
        <Route path="/brands/" component={BrandList} />
        <Route path="/add/" component={AddBrand} />
        <Route path="/register/" component={Register} />
        <Route path="/signin/" component={SignIn} />
      </Router>
    </div>
  );
}

export default withStyles(styles)(AppRouter);
