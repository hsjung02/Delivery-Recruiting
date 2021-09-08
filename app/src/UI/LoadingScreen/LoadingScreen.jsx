import ReactDOM from "react-dom";
import classes from "./LoadingScreen.module.css";

function LoadingScreen() {
    return ReactDOM.createPortal(
        <div className={classes.background}>
            <div class={classes["lds-ring"]}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <p className={classes.message}>잠시만 기다려 주세요...</p>
        </div>,
        document.getElementById("root")
    );
}

export default LoadingScreen;