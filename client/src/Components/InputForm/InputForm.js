import React from "react";
import PropTypes from 'prop-types';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const InputForm = ({ autofocus, id, labelTitle, handleChange, password, variableToUse }) => (
  <FormControl margin="normal" fullWidth>
    <InputLabel htmlFor={id}>{labelTitle}</InputLabel>
    <Input 
      id={id} 
      maxLength="25" 
      autoFocus={autofocus}  
      onChange={(e) => handleChange(e,id)} 
      type={password ? "password" : "text"}
    />
  </FormControl>
)

InputForm.propTypes = {
  autoFocus: PropTypes.bool,
  id: PropTypes.string.isRequired,
  labelTitle: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};
export default InputForm;