import clsx from "clsx";
import "./Button.css";

const Button = ({ children, type, onClick, disabled, variant }) => {
  return (
    <button
      className={clsx("buttonContained", {
        secondary: variant === "secondary",
      })}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
