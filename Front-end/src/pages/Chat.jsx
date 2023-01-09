import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { allUsersRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Test from "./test";

function Chat() {
    const [contacts, setContacts] = useState([])
    const [currentUser, setCurrentUser] = useState(undefined)

    const navigate = useNavigate()

    useEffect(() => {
        function login() {
            try {
                localStorage.getItem('Application User') ?
                    setCurrentUser(JSON.parse(localStorage.getItem('Application User')))
                    :
                    navigate('/login')
            } catch (error) {
                console.warn(error)
            }
        }
        login()
    }, [])

    useEffect(() => {
        async function setPic() {
            try {
                if (await currentUser.isProfilePicSet) {
                    const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`)
                    setContacts(await data.users)
                } else {
                    navigate('/setPic')
                }
            } catch (error) {
                console.warn(error)
            }
        }
        setPic()
    }, [currentUser])

    return (
        <>
            <Test />
            <Conatiner>
                Chat <br />
                <div
                // style={{ display: 'none' }}
                >
                    <button onClick={() => {
                        localStorage.clear();
                        alert('Logged out');
                        navigate('/login')
                    }}>Log out</button>
                    <br />
                    <Link to="/Register">Register</Link>
                    <br />
                    <Link to="/Login">Login</Link>
                    <br />
                    <Link to="/setPic">Set a profile picture</Link>
                </div>
                <div className="container">
                    <Contacts
                        contacts={contacts}
                        currentUser={currentUser}
                    />
                </div>
            </Conatiner>
        </>
    )
}

const Conatiner = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 1rem;
    .container{
        height: 85%;
        width: 85%;
        border: 5px solid black;
        background-color: #25160a84;
        display: grid;
        grid-template-columns: 1fr 2fr ;
    }
`

export default Chat;