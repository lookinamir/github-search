import React from 'react';

const SearchInput = ({ label, handleChange, ...otherProps }) => (
  <div className="input-container">
    {label ? <label className="form-input-label">{label}: </label> : null}
    <input
      className="form-input search"
      onChange={handleChange}
      {...otherProps}
    />
  </div>
);

export default SearchInput;
