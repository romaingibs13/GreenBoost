import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class RadioButtons extends React.Component {
  state = {
    value: 'user',
  };

  render() {
    const { classes ,buttonLabels, handleChangeProfile, value } = this.props;
    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Profile type :</FormLabel>
          <RadioGroup
            aria-label={buttonLabels[1]}
            name="gender2"
            className={classes.group}
            value={value}
          >
            <div style={{display: "flex", flexDirection: "row"}}>
              {
                buttonLabels.map(label =>
                  <FormControlLabel
                    value={label}
                    control={<Radio color="Secondary" />}
                    label={label}
                    onChange={(event) => handleChangeProfile(event, "profileType")}
                    checked={ label === value ? true : false }
                  />)
              }
            </div>
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

RadioButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtons);