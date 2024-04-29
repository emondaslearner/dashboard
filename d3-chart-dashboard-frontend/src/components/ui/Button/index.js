import React from "react";

// components
import PropTypes from "prop-types";
import { Button as Buttons } from "@nextui-org/react";

const Button = ({fill, children, className, type, ...props }) => {
  return (
    <Buttons
      type={type ? type : "button"}
      className={`${className} !rounded-[5px] ${fill ? 'text-white bg-primary' : 'text-primary border-[2px] border-primary bg-transparent'} px-[30px]`}
      {...props}
    >
      {children}
    </Buttons>
  );
};

Button.defaultProps = {
  fill: false,
};

Button.propTypes = {
  fill: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default Button;
