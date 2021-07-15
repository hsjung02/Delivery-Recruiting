import classes from "./Container.module.css";
import SidebarOpenButton from "../UI/SidebarOpenButton/SidebarOpenButton";
import Sidebar from "./Sidebar/Sidebar";
import { useRef, useContext } from "react";
import UserContext from "../UserContext/UserContext";

function Container(props) {
  const sidebarRef = useRef();
  const userContext = useContext(UserContext);

  const openSidebar = () => {
    sidebarRef.current.style.left = "0";
  };

  const closeSidebar = () => {
    sidebarRef.current.style.left = "-100%";
  };

  const openHomepage = () => {
    userContext.changePage("Home");
  };

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <SidebarOpenButton onClick={openSidebar} />
        <h2 onClick={openHomepage} className={classes["header-title"]}>
          Delivery Recruiting
        </h2>
      </header>
      <div className={classes.contents}>
        <Sidebar ref={sidebarRef} onClose={closeSidebar} />
        <main className={classes["main-contents"]}>{props.children}</main>
      </div>
    </div>
  );
}

export default Container;
