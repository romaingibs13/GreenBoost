import React from "react";
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = {
  textField: {

  }
}

class AddBrand extends React.Component {
  state = {
    brand: "ce que je veux",
    product: ""
  };
  //componentDidMount => fetch server
  addBrand() {
    // send post request to server
    alert('Send data to server here')
    const { brand, product} = this.state
    console.log()
    //fetch api
    // cors a regarder

  };

  //
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });

  };


  render() {
    const { classes } = this.props;

    return (
      <div>
        <h1> Add a brand </h1>
        <form noValidate autoComplete="off">
          <TextField
            label="Brand"
            className={classes.textField}
            value={this.state.brand}
            onChange={this.handleChange('brand')}
            margin="normal"
          />

          <TextField
            label="Product"
            className={classes.textField}
            value={this.state.product}
            onChange={this.handleChange('product')}
            margin="normal"
          />

          <TextField
            label="Description"
            className={classes.textField}
            value={this.state.description}
            onChange={this.handleChange('description')}
            margin="normal"
          />
          <Button onClick={() => this.addBrand()}> Add my brand </Button> 
        </form>


        <Link to='/'> Home </Link>
      </div>
    );
  }
}

export default withStyles(styles)(AddBrand);