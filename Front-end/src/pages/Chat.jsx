import React from "react";
import { Link } from "react-router-dom";
import Test from "./test";

function Chat() {
    return (
        <>
            <Test />
            Chat <br />
            <Link to="/Register">Register</Link>
        </>
    )
}

export default Chat;