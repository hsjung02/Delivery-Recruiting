import React from 'react';

const UserContext = React.createContext({
    loggedIn: false,
    tel: "",
    logIn: tel => {},
    logOut: () => {},
    page: "",
    changePage: page => {}
});

export default UserContext;