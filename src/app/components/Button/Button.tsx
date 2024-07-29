import React from "react";
import cx from "classnames";
import { ButtonProp } from "@/types/component";

const Button: React.FC<ButtonProp> = ({
  children,
  onClick,
  type = "button",
  className,
  disabled = false,
}) => {
  return (
    <button
      className={cx(
        "bg-transparent hover:bg-gray-900 text-gray-900 hover:text-gray-100 py-4 px-10 border border-gray-900 hover:border-transparent !rounded-xl font-semibold",
        className
      )}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
