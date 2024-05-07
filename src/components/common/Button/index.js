import React from "react";

const Button = props => {
  const { name, title, type, className, onClick, disabled } = props;

  const propsObj = {
    ...(title && { title }),
    ...(className && { className }),
    ...(type && { type }),
    ...(onClick && { onClick }),
    ...(disabled && { disabled })
  };

  return <button {...propsObj}>{name}</button>;
};

export default Button;
