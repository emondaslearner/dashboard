import React from "react";
import {
  Popover as PopoverNext,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import PropTypes from "prop-types";

const Popover = ({ buttonText, children }) => {
  return (
    <div className="relative">
      <PopoverNext>
        <PopoverTrigger>
          <Button className="!rounded-[5px] bg-transparent border-[2px] border-primary text-primary px-[30px]">
            {buttonText}
          </Button>
        </PopoverTrigger>
        <PopoverContent>{children}</PopoverContent>
      </PopoverNext>
    </div>
  );
};

Popover.propTypes = {
  children: PropTypes.element,
};

export default Popover;
