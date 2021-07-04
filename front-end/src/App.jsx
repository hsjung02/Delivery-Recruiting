import Container from "./Container/Container";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import MyOrders from "./Pages/MyOrders/MyOrders";
import Orders from "./Pages/Orders/Orders";
import Join from "./Pages/Join/Join";
import MakeOrder from "./Pages/MakeOrder/MakeOrder";


function App() {
  return (
    <Container>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/Login">
            <Login />
          </Route>
          <Route exact path="/Join">
            <Join />
          </Route>
          <Route exact path="/MyOrders">
            <MyOrders />
          </Route>
          <Route exact path="/Orders">
            <Orders />
          </Route>
          <Route exact path="/MakeOrder">
            <MakeOrder />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
