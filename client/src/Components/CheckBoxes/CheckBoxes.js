import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  checkboxes_div: {
    display: "flex",
    flexDirection: "column"
  }

});

class CheckBoxes extends React.Component {
  state = {
    shop: false,
    shop_input: "",
    website: false,
    website_input: "",

  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleChangeTextInput = name => event => {
    this.setState({ [name]: event.target.value })
  }

  render() {
    const { classes } = this.props;
    const { registerState, text_input } = this.props;
    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">{this.props.legend}</FormLabel>
          <FormGroup>
            {this.props.fcLabel
              .map(checkBoxName =>
                <div className={classes.checkboxes_div}>
                  <div>
                    <FormControlLabel
                      control={<Checkbox
                        onChange={this.props.handleChangeCheckBoxes(checkBoxName)}
                        value={checkBoxName}
                        />
                      }
                      label={checkBoxName}/>
                  </div>
                  <div style={{ width: "max-content"}}>
                    {  text_input && registerState[checkBoxName] && <Input
                      id={checkBoxName + "_input"}
                      maxLength="25"
                      onChange={(e) => this.props.handleChangeTextInput(e, checkBoxName + "_input")}
                      placeholder={checkBoxName === "website" ? "enter the company website url" : "enter a valid shop address"}
                    />}
                  </div>
                </div>
              )}
          </FormGroup>
          <FormHelperText>{this.props.text}</FormHelperText>
        </FormControl>
      </div >
    );
  }
}

CheckBoxes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckBoxes);