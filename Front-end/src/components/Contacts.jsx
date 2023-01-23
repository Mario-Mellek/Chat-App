import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Logout from './Logout'

export default function Contacts({ contacts, currentUser, toggleChat, handleResize }) {

    const [currentUserName, setCurrentUserName] = useState(undefined)
    const [currentUserImage, setCurrentUserImage] = useState(undefined)
    const [currentlySelected, setCurrentlySelected] = useState(undefined)
    const [min, setMin] = useState(false)
    const [selectedContact, setSelectedContact] = useState(undefined)


    useEffect(() => {
        async function display() {
            if (await currentUser) {
                setCurrentUserImage(await currentUser.profilePic)
                setCurrentUserName(await currentUser.username)
            }
        }
        display()
    }, [currentUser])

    const changeChatWindow = (index, contact) => {
        setCurrentlySelected(index)
        toggleChat(contact)
        setSelectedContact(contact)
    }

    const toggleView = () => {
        setMin((prev) => !prev);
        handleResize()
    }

    const mappedContacts = contacts.map((contact, index) => {
        return (
            <div
                key={index}
                onClick={() => { changeChatWindow(index, contact) }}
                className={`contact ${currentlySelected === index ? 'selected' : ''}`}
            >
                <p>{contact.username}</p>
                <img src={`data:image/svg+xml;base64,${contact.profilePic}`} alt="Profile Picture" />
            </div>
        )
    })

    return (
        <>
            {
                currentUser && Boolean(contacts[0]) && (
                    <>
                        <Container>
                            <SideBar
                                className={min ? 'min' : 'max'}
                            >
                                <h2
                                    onClick={() => {
                                        setCurrentlySelected(undefined)
                                        toggleChat(undefined)
                                        setSelectedContact(undefined)
                                    }}
                                >
                                    Logout
                                    <br />
                                    <Logout />
                                </h2>

                                <br /><br />
                                <div className="contacts">{
                                    mappedContacts
                                }</div>
                            </SideBar>
                        </Container>
                        <UserContainer>
                            <div className={`current-user ${min ? 'big' : 'small'}`}>
                                <div className="profile-pic">
                                    {selectedContact &&
                                        <>
                                            <div>
                                                <p onClick={toggleView}>{selectedContact.username}</p>
                                                <img src={`data:image/svg+xml;base64,${selectedContact.profilePic}`} alt="Profile Picture" />
                                            </div>
                                        </>}
                                    <div>
                                        <p onClick={toggleView}>{currentUserName}</p>
                                        <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="Profile Picture" />
                                    </div>
                                </div>
                            </div>
                        </UserContainer>
                    </>
                ) || (
                    <>
                        <Container>
                            <SideBar
                                className={min ? 'min' : 'max'}
                            >
                                <Logout />
                                <br /><br /><br />
                                <h3>No users to chat with?</h3>
                                <br /><br />
                                <p> Start inviting your friends</p>
                            </SideBar>
                        </Container>
                        <UserContainer>
                            <div className={`current-user ${min ? 'big' : 'small'}`}>
                                <div className="profile-pic">
                                    <p onClick={toggleView}>{currentUserName}</p>
                                    <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="Profile Picture" />
                                </div>
                            </div>
                        </UserContainer>
                    </>
                )
            }
        </>
    )
}

const Container = styled.div`
height: 100%;
overflow: hidden;
text-align: center;
.min{
    animation: scale-out 0.5s ease both;
}
.max{
    animation: scale-in 0.5s 0.4s ease both;
}
@keyframes scale-out {
    0% {
    transform: scaleY(1);
    opacity: 1;
    }
    100% {
    transform: scaleY(0);
    opacity: 0;
    display: none;
    }
}
@keyframes scale-in {
    0% {
    transform: scaleY(0);
    opacity: 0;
    }
    100% {
    transform: scaleY(1);
    opacity: 1;
    }
}
@media only screen and (600px > width){
    overflow: visible;
    max-width: 28.5%;
}
`


const SideBar = styled.div`
background-color: black;
color: white;
overflow-y: auto;
overflow-x: hidden;
height: 100%;
border-radius: 2em;
&::-webkit-scrollbar{
    width: 0.4rem;
    height: fit-content;
    &-thumb{
        background-color: gray;
        border-radius: 1rem;
    }
    &-thumb:hover{
        background-color: white;
    }
}
h2{
    width: 100%;
    position: sticky;
    top: 0;
    text-align: center;
    background-color: gray;
    transition: all 0.3s ease-in-out;
    &:hover{
        background-color: white;
        color: black;
        cursor: pointer;
    }
    @media only screen and (600px > width) {
        font-size: large;
    }
}
.contacts{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    .contact{
        width: 80%;
        max-width: fit-content;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-bottom: 0.4rem solid gray;
        border-radius: 50%;
        transition: all 400ms ease-in-out;
        &:hover{
            box-shadow: 0px 0px 20px white;
            cursor: pointer;
        }
        &:active{
            box-shadow: 10px 10px 90px 10px transparent;
        }
        img{
            width: 60%;
            aspect-ratio: 3 / 2;
        }
        p{
            margin-bottom: 0.5rem;
            text-align: center;
            color: white;
            text-shadow: 5px 5px 10px white;
            font-style: oblique;
            letter-spacing: 0.3em;
            text-transform: uppercase;
            @media only screen and (600px > width) {
                font-size: 70%;
                font-weight: 100;
            }
        }
    }
    .selected{
        padding: 0.5rem;
        background-image: linear-gradient(to bottom, rgb(0, 0, 0) 25%, #ffffff 100%);        
        border: 0.1rem solid white;
        z-index: -1;
        animation: select 0.5s both;
        @keyframes select {
            0%{
                transform: translateY(0);
            }
            50%{
                transform: translateY(1rem);
            }
            100%{
                transform: translateY(0);
            }
        }
    }
}
`

const UserContainer = styled.div`
/* width: auto; */
display: flex;
flex-direction: column;
.big{
    animation: scale-up-right 0.5s ease-in-out both;
    animation-delay: 0.3s;
    max-width: 94%;
}
.small{
    animation: scale-in-h 0.5s ease both;
    animation-delay: 0.3s;
}
@keyframes scale-up-right {
    0%{
        /* width: auto; */
        transform: scale(0);
        opacity: 0;
    }
    100% {
        transform: scale(1);
        width: 90vw;
        opacity: 1;
    }
}
.current-user{
    width: 85rem;
    .profile-pic{
        background-color: #00000050;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        border-bottom: 2px solid black;
        border-bottom-left-radius: 2em;
        border-bottom-right-radius: 2em;
        transition: all 0.4s linear;
        text-align: center;
        color: white;
    &:hover{
        background-color: transparent;
    }
    @keyframes scale-in-h {
        from{
            transform: scaleX(0);
        }
        to{
            transform: scaleX(1);
        }
    }
    p{
        margin-bottom: 0.5rem;
        color: white;
        text-shadow: 5px 5px 10px white;
        font-style: oblique;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        &:hover{
            text-decoration: .1em underline;
            cursor: pointer;
        }
    }
    img{
        width: 5rem;
        box-shadow: 10px 10px 90px 10px black;
        border-radius: 50%; 
    }
    }
}
@media only screen and (600px > width) {
    width: 100%;
    .current-user{
        width: 100%;
        .profile-pic{
            margin: 0 5px;
            p{
                font-size: small;
            }
            img{
                width: 4rem;
            }
        }
    }
}
`