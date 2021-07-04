import classes from "./Sidebar.module.css";
import React from "react";
import SidebarMenuButton from "../../UI/SidebarMenuButton/SidebarMenuButton";

const Sidebar = React.forwardRef((props, ref) => {
  const openLoginPage = event => {
    window.location.href = "/Login";
  };

  const openJoinPage = event => {
    window.location.href = "/Join";
  };

  const openOrdersPage = event => {
    window.location.href = "/Orders";
  };

  const openMyOrdersPage = event => {
    window.location.href = "/MyOrders";
  };

  const openMakeOrderPage = event => {
    window.location.href = "/MakeOrder";
  };

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
          <SidebarMenuButton title="로그인" onClick={openLoginPage} />
        </li>
        <li>
          <SidebarMenuButton title="회원가입" onClick={openJoinPage} />
        </li>
        <li>
          <SidebarMenuButton title="모집중인 주문" onClick={openOrdersPage} />
        </li>
        <li>
          <SidebarMenuButton title="주문 생성" onClick={openMakeOrderPage} />
        </li>
        <li>
          <SidebarMenuButton title="내 주문" onClick={openMyOrdersPage} />
        </li>
      </ul>
    </aside>
  );
});

export default Sidebar;
