import { useContext } from "react";
import UserContext from "../../UserContext/UserContext";
import "./home.css";

function Home(props) {
    const userContext = useContext(UserContext);

    return (
        <div className="home">
            {userContext.loggedIn && <p>{userContext.tel}님 환영합니다!</p>}
        </div>
    );
}

export default Home;