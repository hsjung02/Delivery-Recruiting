import classes from "./Sidebar.module.css";
import React from "react";
import SidebarMenuButton from "../../UI/SidebarMenuButton/SidebarMenuButton";

const Sidebar = React.forwardRef((props, ref) => {
  return (
    <aside className={classes["sidebar"]} ref={ref}>
      <header className={classes["sidebar-header"]}>
        <button className={classes["close-button"]} onClick={props.onClose}>
          X
        </button>
        <h2 className={classes["sidebar-title"]}>Menu</h2>
      </header>
      <ul className={classes["sidebar-menu"]}>
        <li>
          <SidebarMenuButton title="로그인" />
        </li>
        <li>
          <SidebarMenuButton title="회원가입" />
        </li>
        <li>
          <SidebarMenuButton title="모집중인 주문" />
        </li>
        <li>
          <SidebarMenuButton title="내 주문" />
        </li>
      </ul>
    </aside>
  );
});

export default Sidebar;
