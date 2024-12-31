import React from "react";
import Link from "next/link";
import { ButtonProps } from "@/utils/types";

const Button = ({
  href,
  onClick,
  type,
  className,
  children,
  disabled = false,
  variant = "primary",
}: ButtonProps) => {
  const styles = {
    primary:
      "bg-sky-500 py-1 px-12 min-h-12 rounded-sm hover:bg-transparent rounded-lg font-bold border border-sky-500 text-white hover:text-sky-500 transition-colors duration-300",
    black:
      "hover:bg-ty-0 py-1 px-12 min-h-12 rounded-sm bg-transparent rounded-lg font-bold border border-ty-0 text-ty-0 hover:text-white transition-colors duration-300",
    white:
      "bg-white py-1 px-12 min-h-12 rounded-sm hover:bg-transparent rounded-lg font-bold border border-ty-0 text-ty-0  transition-colors duration-300",
  };

  if (href) {
    return (
      <Link className={`${styles[variant]} ${className} text-nowrap py-[1em]`} href={href}>
        {children}
      </Link>
    );
  } else if (onClick) {
    return (
      <button className={`${styles[variant]} ${className} text-nowrap`} onClick={onClick}>
        {children}
      </button>
    );
  } else if (type) {
    return (
      <button
        className={`${styles[variant]} ${className} text-nowrap ${disabled && "opacity-50"}`}
        type={type}
        disabled={disabled}
      >
        {children}
      </button>
    );
  } else {
    throw new Error("You must provide what type of button is, href | onClick | type");
  }
};

export default Button;
