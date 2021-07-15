import React, { useState } from "react";
import UserContext from "./UserContext";

function UserProvider(props) {
  let [tel, setTel] = useState(localStorage.getItem("tel"));
  let [loggedIn, setLoggedIn] = useState(!!tel);
  let [page, changePage] = useState("Home");

  const logIn = newTel => {
    localStorage.setItem("tel", newTel);
    setTel(localStorage.getItem("tel"));
    setLoggedIn(true);
    changePage("Home");
  };

  const logOut = () => {
    localStorage.removeItem("tel");
    setTel(undefined);
    setLoggedIn(false);
    changePage("Home");
  };

  const userContext = {
    loggedIn,
    tel,
    logIn,
    logOut,
    page,
    changePage,
  };

  window.addEventListener("beforeunload", () => {
    localStorage.removeItem("tel");
  });
  // 다른 사이트로 가거나 탭을 닫은 이후 다시 돌아왔을 때는 로그아웃 되도록 함

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider;
