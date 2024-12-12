import { FC } from "react";
import styles from "./countdown-timer.module.css";

interface ButtonProps {
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>> | null;
  text?: string;
  handleClick: () => void;
}
const Button: FC<ButtonProps> = ({ Icon, text, handleClick }) => {
  return (
    <button className={styles.button} onClick={handleClick}>
      {Icon ? <Icon className={styles.icon} /> : text}
    </button>
  );
};

export default Button;
