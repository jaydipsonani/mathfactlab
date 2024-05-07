import React, { useState } from "react";
const PasswordSwitch = props => {
  const { password, isShowAllPassword } = props;
  const [isShowPassword, setIsShowPassword] = useState(false);
  const handleChangeSwitch = () => {
    setIsShowPassword(!isShowPassword);
  };
  return (
    <>
      <div key={Math.random()} style={{ cursor: "pointer", userSelect: "none" }} onClick={() => handleChangeSwitch()}>
        {isShowPassword || isShowAllPassword ? password : "******"}
      </div>
    </>
  );
};

export default PasswordSwitch;
