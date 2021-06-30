import classes from "./Container.module.css";
import buttonImage from "../assets/menu-button.png";
import SidebarButton from "../UI/SidebarButton";

function Container(props) {
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <SidebarButton />
        <h2>Delivery Recruiting</h2>
      </header>
    </div>
  );
}

export default Container;
