import clsx from "clsx";
import "./Input.css";

const Input = ({ type, placeholder, fullWidth }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={clsx("input", {
        fullWidth: fullWidth,
      })}
    />
  );
};

export default Input;
