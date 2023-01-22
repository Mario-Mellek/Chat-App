import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { allUsersRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import Test from "./test";
import ChatContainer from "../components/ChatContainer";

function Chat() {
    const [contacts, setContacts] = useState([])
    const [currentUser, setCurrentUser] = useState(undefined)
    const [currentChat, setCurrentChat] = useState(undefined)
    const [minView, setMinView] = useState(false)

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

    const handleChatToggle = (contact) => {
        setCurrentChat(contact)
    }

    const handleResize = () => {
        setMinView((prev) => !prev)
    }


    return (
        <>
            <Test />
            <Conatiner>
                <div className="container">
                    <Contacts
                        contacts={contacts}
                        currentUser={currentUser}
                        toggleChat={handleChatToggle}
                        handleResize={handleResize}
                    />
                    {currentChat !== undefined ?
                        <ChatContainer
                            currentUser={currentUser}
                            currentChat={currentChat}
                            minView={minView}
                        /> :
                        <Welcome
                            currentUser={currentUser}
                        />}

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
overflow: hidden;
flex-wrap: wrap;
.container{
    border-radius: 50px;
    height: 85%;
    width: 85%;
    border: 5px solid black;
    background-color: #25160a84;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: nowrap;
    }
`

export default Chat;