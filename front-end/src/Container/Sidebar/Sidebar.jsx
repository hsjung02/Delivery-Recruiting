import classes from "./Sidebar.module.css";
import React from "react";
import SidebarMenuButton from "../../UI/SidebarMenuButton/SidebarMenuButton";
import { useContext } from "react";
import UserContext from "../../UserContext/UserContext";

const Sidebar = React.forwardRef((props, ref) => {
  const userContext = useContext(UserContext);

  const openLoginPage = event => {
    userContext.changePage("Login");
  };

  const openJoinPage = event => {
    userContext.changePage("Join");
  };

  const openOrdersPage = event => {
    userContext.changePage(userContext.loggedIn ? "/Orders" : "/Login");
  };

  const openMyOrdersPage = event => {
    userContext.changePage(userContext.loggedIn ? "/MyOrders" : "/Login");
  };

  const openMakeOrderPage = event => {
    userContext.changePage(userContext.loggedIn ? "/MakeOrder" : "/Login");
  };

  const alertAndLogout = () => {
    const answer = window.confirm("로그아웃 하시겠습니까?");

    if (answer) {
      alert("로그아웃 되었습니다.");
      userContext.logOut();
    }
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
        {!userContext.loggedIn && (
          <React.Fragment>
            <li>
              <SidebarMenuButton title="로그인" onClick={openLoginPage} />
            </li>
            <li>
              <SidebarMenuButton title="회원가입" onClick={openJoinPage} />
            </li>
          </React.Fragment>
        )}
        <li>
          <SidebarMenuButton title="모집중인 주문" onClick={openOrdersPage} />
        </li>
        <li>
          <SidebarMenuButton title="주문 생성" onClick={openMakeOrderPage} />
        </li>
        <li>
          <SidebarMenuButton title="내 주문" onClick={openMyOrdersPage} />
        </li>
        {userContext.loggedIn && (
          <li>
            <SidebarMenuButton title="로그아웃" onClick={alertAndLogout} />
          </li>
        )}
      </ul>
    </aside>
  );
});

export default Sidebar;
