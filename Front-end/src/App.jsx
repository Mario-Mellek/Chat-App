import React from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./pages/test";
import SetProfilePic from "./pages/SetProfilePic";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Chat />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/test" element={<Test />}></Route>
                <Route path="/setPic" element={<SetProfilePic />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;