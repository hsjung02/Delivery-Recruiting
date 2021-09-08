import Container from "./Container/Container";
import "./App.css";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import MyOrders from "./Pages/MyOrders/MyOrders";
import Orders from "./Pages/Orders/Orders";
import Join from "./Pages/Join/Join";
import MakeOrder from "./Pages/MakeOrder/MakeOrder";
import { useContext } from "react";
import UserContext from "./UserContext/UserContext";
import {useCookies} from "react-cookie";

function App() {
    const userContext = useContext(UserContext);
    const [cookies, setCookie, removeCookie] = useCookies(['tel'])
    const page = userContext.page;
    return (
        <Container changePage={userContext.changePage}>
            {page === "Home" && <Home />}
            {page === "Login" && <Login />}
            {page === "Join" && <Join />}
            {page === "MyOrders" && <MyOrders />}
            {page === "Orders" && <Orders />}
            {page === "MakeOrder" && <MakeOrder />}
        </Container>
    );
}

export default App;


