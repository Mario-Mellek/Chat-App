import React from "react";
import { Link } from "react-router-dom";
import Test from "./test";

function Chat() {
    return (
        <>
            <Test />
            Chat <br />
            <button onClick={() => {
                localStorage.clear();
                console.log('Logged out');
            }}>Log out</button>
            <br />
            <Link to="/Register">Register</Link>
        </>
    )
}

export default Chat;