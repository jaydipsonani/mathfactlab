import React from "react";

const SelectComponent = props => {
  const { value, options, onChange, placeholder } = props;

  return (
    <>
      <select value={value} placeholder={placeholder} onChange={onChange} className="form-control">
        {options.map(option => (
          <option
            value={option.value}
            key={option.value}
            disabled={option.value === null ? true : option.disabled && option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>

      {/* {isShowError && !value && <span className="error"> {errorText}</span>} */}
    </>
  );
};

export default SelectComponent;
