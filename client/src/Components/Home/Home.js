import React from "react";

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Gallery from '../Gallery/Gallery';
import MapContainer from '../MapContainer/MapContainer';
import InputForm from '../InputForm/InputForm';


const styles = {
  title: {
    fontSize: 22,
  },
  carousel_div: {
    display: 'block',
    margin: '25px'
  },
  main_div: {
    display: "flex",
    alignItems: "center",
    flexDirection: 'column'
  },
  mapStyles: {
    width: '50%',
    height: '50vh',
    margin: '25px',
    position: 'relative'
  },
  search_fields_div: {
    width: "20%",
    height: "20%"
  },
  frozen_body: {
    backgroundAttachment: "fixed",
  }
};

class Home extends React.Component {
  state = {
    what_product: "",
    where: ""
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    console.log(this.state)
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.main_div} >
        <div>
          <InputForm
            id={"what_product"}
            handleChange={this.handleChange("what_product")}
            labelTitle={"Which product would you search for?"}
          />
          <InputForm
            id={"where"}
            handleChange={this.handleChange("where")}
            labelTitle={"Where would you like to find it?"}
          />
        </div>
        <div className={classes.mapStyles}>
          <MapContainer />
        </div>
        <div >
          <div>
            <h2 align="center">Brands you may want to know</h2>
            <div className={classes.carousel_div} >
              <Gallery />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// style={{ position: 'relative', boxShadow: "inset 0 0 2000px rgba(255, 255, 255, .5)", background: "inherit" }}
Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

//currying
export default withStyles(styles)(Home);