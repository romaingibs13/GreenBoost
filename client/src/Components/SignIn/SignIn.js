import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import InputForm from '../InputForm/InputForm';
import RadioButtons from "../RadioButtons/RadioButtons"
import SelectChoices from "../SelectChoices/SelectChoices"

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});


class SignIn extends React.Component {
  state = {
    disabled: true,
    email: "",
    password: "",
    user: true,
    ambassador: null,
    radioButtonsValue: "user",
    singleCompany: null,
    profileType: "user"
  }

  handleChange = (event,name) => {
    this.setState({ [name]: event.target.value })
    console.log(this.state.profileType)
  }

  handleChangeCheckboxes = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleChangeCompanyName = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  isButtonDisabled = () => {
    const { email, singleCompany, password, user } = this.state;
    if ((singleCompany || user) && email && password) return false;
    return true;
  }

  signIn = () => {
    const { email, password, singleCompany } = this.state;
    var api = singleCompany ? "ambassadors" : "users";

    fetch(`http://localhost:3001/${api}/signin`, {
    method: 'POST',
    headers: {
      // "Accept": 'application/json'
      "Content-Type": 'application/json'
      },
    mode: "cors",
    body: {
      customer: {
        company_name: singleCompany ? singleCompany.label : null,
        email,
        password
      }
    }
    })
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.status === 200)
        this.props.history.push("/");
      else
        console.log(responseData)
    })
    .catch(error => {
      console.error(error);
    });
  }

  render() {
    const { classes } = this.props;
    const { profileType, singleCompany } = this.state;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}>
              <RadioButtons
                buttonLabels={["user", "ambassador"]}
                value={profileType}
                handleChangeProfile={this.handleChange}
              />
            <div>
              {profileType === "ambassador" && <div>
                <SelectChoices
                  selection="single"
                  title="Company"
                  placeholder="Search your company"
                  handleChange={this.handleChangeCompanyName}
                  single={singleCompany}
                  variableToUse="singleCompany"
                />
              </div>}
            </div>
            <InputForm
              id={"email"}
              handleChange={this.handleChange}
              labelTitle={"Email"}
            />
            <InputForm
              id={"password"}
              handleChange={this.handleChange}
              labelTitle={"Password"}
              password={true}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={this.isButtonDisabled()}
              onClick={this.signIn}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);