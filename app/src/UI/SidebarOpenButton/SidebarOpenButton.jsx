import classes from "./SidebarButton.module.css";
import buttonImage from "../../assets/menu-button.png";

function SidebarOpenButton(props) {
  return (
    <button type="button" className={classes.button} onClick={props.onClick}>
      <img src={buttonImage} alt="button" className={classes["button-image"]} />
    </button>
  );
}

export default SidebarOpenButton;
