import React from 'react';
import PropTypes from 'prop-types';

const InputField = (props) => {
  const {
    input, meta, label, type
  // eslint-disable-next-line jsx-a11y/label-has-for
  } = props; return (<div><label htmlFor={input.id}>{label}</label><input id={input.id} {...input} type={type} />{(meta.error && meta.touched) && <span style={{color: 'red'}}>{meta.error}</span>}</div>);
};

InputField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default InputField;
