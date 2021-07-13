import classes from "./SidebarMenuButton.module.css";

function SidebarMenuButton(props) {
  return (
    <button className={classes["sidebar-menu-button"]} onClick={props.onClick}>
      {props.title}
    </button>
  );
}

export default SidebarMenuButton;
