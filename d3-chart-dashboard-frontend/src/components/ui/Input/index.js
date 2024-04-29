import React from "react";

const Input = ({ type, label, placeholder, className, ...props }) => {
  return (
    <div>
      {label && <label className="mt-1 text-[16px]" htmlFor={placeholder}>{label}</label>}
      <input
        id={placeholder}
        type={type}
        placeholder={placeholder}
        className={`border-[2px] border-primary !bg-white outline-none w-full py-[10px] rounded-[5px] mt-1 px-[15px] ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
