import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';

import AlertDialog from '../AlertDialog/AlertDialog';
import InputForm from '../InputForm/InputForm';
import SelectChoices from "../SelectChoices/SelectChoices"
import CheckBoxes from "../CheckBoxes/CheckBoxes"
import { Checkbox } from '@material-ui/core';
import * as lists from "../../Config/lists";
import RadioButtons from "../RadioButtons/RadioButtons";

var countriesList = lists.countries.map(country => ({
  value: country,
  label: country,
}));

var jobAreasList = lists.jobAreas.map(jobArea => ({
  value: jobArea,
  label: jobArea,
}));

const registered_companies = ["Thred Up"].map(company => ({
  value: company,
  label: company,
}));

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
  textField: {
    width: '100%'
  },
  ambassador_fields: {
    display: "flex",
    flexDirection: "column"
  },
  inline_div: {
    display: "flex",
    justifyContent: "flex-start"
  }
});

class Register extends React.Component {

  state = {
    address: null,
    checkboxCompany: false,
    city: null,
    companyName: null,
    registered: true,
    email: null,
    first_name: null,
    green_values: null,
    last_name: null,
    multiActivities: null,
    multiCountries: null,
    password: null,
    profileType: "user",
    repeatPassword: null,
    singleCompany: null,
    shop: false,
    shop_input: null,
    showDialog: false,
    website: false,
    website_input: null,
    zip_code: null,
    customerCountry: null
  };

  handleChangeCompanyName = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  handleChangeCheckboxes = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  componentDidMount() {


  }

  addCompany = () => {
    // send post request to server  
    const { address, registered, profileType, companyName, singleCompany, first_name, last_name, multiCountries, customerCountry } = this.state;
    const { city, zip_code, repeatPassword, green_values, password, email, multiActivities, shop_input, website_input, shop, website } = this.state;

    var customerInformations = first_name && last_name && password && email && city && zip_code && address && repeatPassword && password === repeatPassword && customerCountry;
    var userConditions = (profileType === "user" && customerInformations);
    var companyRegisteredConditions = (profileType === "ambassador" && singleCompany && registered && customerInformations);
    var companyNotRegisteredConditions = (profileType === "ambassador" && companyName && !registered && customerInformations && multiActivities.length
      && multiCountries.length && green_values && ((shop_input && shop) || (website_input && website)));
    console.log(this.state)
    console.log(companyNotRegisteredConditions)
    if (userConditions || companyRegisteredConditions || companyNotRegisteredConditions) {
      var api = profileType === "user" ? "users" : "companies";

      var customer = {
        first_name,
        last_name,
        password,
        email,
        address,
        zip_code,
        city,
        country: customerCountry.value
      }

      if (profileType === "ambassador") {
        var countries = [];
        var activities_areas = [];
        var ambassadors = null;

        if (!registered) {
          multiCountries.forEach(x => countries.push(x.value))
          multiCountries.map(x => activities_areas.push(x.value));
          ambassadors = { email: last_name }
        }

        var company = {
          name: registered ? singleCompany["value"] : companyName,
          characteristics: {
            countries,
            activities_areas,
            ambassadors: [email]
          },
          green_values,
          website: website_input,
          shop: shop_input
        }
      }

      fetch(`http://localhost:3001/${api}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: "cors",
        body: JSON.stringify({
          company_registered: registered,
          customer,
          company
        })
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData)
          if (responseData.status === 200)
            this.props.history.push("/");
        })
        .catch(error => {
          console.error(error);
        });
    }
    else {
      this.showDialog();
    }
  };

  handleChange = (event, name) => {
    this.setState({ [name]: event.target.value });
  };


  handleCheckCompany = name => {
    this.setState(prevState => ({ [name]: !prevState[name] }));
  }

  handleCloseDialog = () => {
    this.setState({ showDialog: false });
  };

  showDialog = () => {
    this.setState({ showDialog: true });
  }

  render() {
    const { classes } = this.props;
    const { website, shop, multiActivities, multiCountries, singleCompany, registered, profileType, customerCountry } = this.state;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className={classes.form}>
            <RadioButtons
              buttonLabels={["user", "ambassador"]}
              value={profileType}
              handleChangeProfile={this.handleChange}
            />
            <div>
              <h3 style={{ display: "flex", justifyContent: "center" }}>{profileType}'s informations</h3>
              <div className={classes.ambassador_fields}>
                <div className={classes.inline_div}>
                  <InputForm
                    id={"first_name"}
                    handleChange={this.handleChange}
                    labelTitle={"First name"}
                  />
                  <InputForm
                    id={"last_name"}
                    handleChange={this.handleChange}
                    labelTitle={"Last name"}
                  />
                </div>
                <div>
                  <InputForm
                    id={"email"}
                    handleChange={this.handleChange}
                    labelTitle={"Email"}
                  />
                </div>
                <div>
                  <SelectChoices
                    selection="single"
                    title="Country"
                    placeholder="Search your residency country"
                    handleChange={this.handleChangeCompanyName}
                    single={customerCountry}
                    variableToUse="customerCountry"
                    handleChangeInput={this.handleChange}
                    list={countriesList}
                  />
                  <InputForm
                    id={"address"}
                    handleChange={this.handleChange}
                    labelTitle={"Address"}
                  />
                  <InputForm
                    id={"zip_code"}
                    handleChange={this.handleChange}
                    labelTitle={"Zip ode"}
                  />
                  <InputForm
                    id={"city"}
                    handleChange={this.handleChange}
                    labelTitle={"City"}
                  />
                </div>
                <div className={classes.inline_div}>
                  <InputForm
                    id={"password"}
                    handleChange={this.handleChange}
                    labelTitle={"Password"}
                    password={true}
                  />
                  <InputForm
                    id={"repeatPassword"}
                    handleChange={this.handleChange}
                    labelTitle={"Repeat password"}
                    password={true}
                  />
                </div>
              </div>
            </div>
            {profileType === "ambassador" && <div>
              <div>
                <h3 style={{ display: "flex", justifyContent: "center" }}>Company informations</h3>
                <div>
                  {registered && <SelectChoices
                    selection="single"
                    title="Company"
                    placeholder="Search your company"
                    handleChange={this.handleChangeCompanyName}
                    single={singleCompany}
                    variableToUse="singleCompany"
                    handleChangeInput={this.handleChange}
                    list={registered_companies}
                  />}
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ color: "grey" }}>Company not registered yet ?
              <Checkbox
                      onChange={() => this.handleCheckCompany("registered")}
                    />
                    {!registered && <InputForm
                      id={"companyName"}
                      handleChange={this.handleChange}
                      labelTitle={"companyName"}
                    />}
                  </label>
                </div>
                {!registered && <div>
                  <SelectChoices
                    selection="multi"
                    title="Known geographic implantations"
                    placeholder="Search multiple countries ..."
                    multi={multiCountries}
                    handleChange={this.handleChangeCompanyName}
                    variableToUse="multiCountries"
                    list={countriesList}
                  />
                  <div>
                    <CheckBoxes
                      fcLabel={["website", "shop"]}
                      text="Select at least one option"
                      legend="How to buy its services/products ?"
                      handleChangeCheckBoxes={this.handleChangeCheckboxes}
                      handleChangeTextInput={this.handleChange}
                      registerState={{ website: website, shop: shop }}
                      text_input={true}
                    />
                  </div>
                  <div>
                    <SelectChoices
                      selection="multi"
                      title="Activity areas"
                      placeholder="Select activity areas"
                      multi={multiActivities}
                      handleChange={this.handleChangeCompanyName}
                      variableToUse="multiActivities"
                      list={jobAreasList}
                    />
                  </div>
                  <TextField
                    id="green_values"
                    label="Company green values"
                    multiline
                    rows="4"
                    className={classes.textField}
                    onChange={(e) => this.handleChange(e, "green_values")}
                    margin="normal"
                    variant="outlined"
                  />
                </div>}
              </div>
            </div>}
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.addCompany}
            >
              Register
            </Button>
            <AlertDialog handleClose={this.handleCloseDialog} open={this.state.showDialog} />
          </form>
        </Paper>
      </main>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);