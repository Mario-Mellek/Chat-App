import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

export default function Contacts({ contacts, currentUser }) {

    const [currentUserName, setCurrentUserName] = useState(undefined)
    const [currentUserImage, setCurrentUserImage] = useState(undefined)
    const [currentlySelected, setCurrentlySelected] = useState(undefined)
    const [min, setMin] = useState(false)


    useEffect(() => {
        (
            currentUser ?
                setCurrentUserImage(currentUser.profilePic)
                &
                setCurrentUserName(currentUser.username)
                :
                null
        )
    }, [currentUser])

    const changeChatWindow = (index, contact) => { }

    const toggle = () => {
        setMin((prev) => !prev);
    }

    return (
        <>
            {
                currentUser && Boolean(contacts[0]) && (
                    <>
                        <Container>
                            <SideBar
                                className={min ? 'min' : 'max'}
                            >
                                <h2>Chat App</h2>
                                <br /><br />
                                <div className="contacts">{
                                    contacts.map((contact, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={`contact ${index === currentlySelected ? 'selected' : ''}`}
                                            >
                                                <p>{contact.username}</p>
                                                <img src={`data:image/svg+xml;base64,${contact.profilePic}`} alt="Profile Picture" />
                                            </div>
                                        )
                                    })
                                }</div>
                            </SideBar>
                        </Container>
                        <UserContainer>
                            <div className={`current-user ${min ? 'big' : 'small'}`}>
                                <div className="profile-pic">
                                    <p onClick={toggle}>{currentUserName}</p>
                                    <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="Profile Picture" />
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
                                <br /><br /><br />
                                <h3>No users to chat with?</h3>
                                <br /><br />
                                <p> Start inviting your friends</p>
                            </SideBar>
                        </Container>
                        <UserContainer>
                            <div className={`current-user ${min ? 'big' : 'small'}`}>
                                <div className="profile-pic">
                                    <p onClick={toggle}>{currentUserName}</p>
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


const SideBar = styled.div`
background-color: black;
color: white;
overflow-y: auto;
height: 100%;
border-radius: 2em;
h2{
    width: 100%;
    position: sticky;
    top: 0;
    text-align: center;
    background-color: gray;
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
            box-shadow: 10px 10px 90px 10px white;
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
        }
    }
}
`

const Container = styled.div`
height: 100%;
overflow: hidden;
text-align: center;
.min{
    animation: scale-out 0.5s ease both;
}
.max{
    animation: scale-in 0.5s ease both;
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
`

const UserContainer = styled.div`
width: auto;
.big{
    animation: scale-up-right 0.5s ease-in-out both;
    animation-delay: 0.3s;
}
.small{
    animation: scale-in-h 0.5s ease both;
    animation-delay: 0.3s;
}
@keyframes scale-up-right {
    0% {
    width: 0vw;
    }
    100% {
    width: 100vw;
    }
}
.current-user{
    .profile-pic{
    background-color: #00000050;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: start;
    gap: 2em;
    border-bottom: 2px solid black;
    border-bottom-left-radius: 2em;
    border-bottom-right-radius: 2em;
    transition: all 0.4s linear;
    animation: scale-in-h 0.5s ease both;
    &:hover{
        background-color: transparent;
    }
    @keyframes scale-in-h {
        0%{
            transform: scaleX(0);
        }
        100%{
            transform: scaleX(1);
        }
    }
    p{
        margin-bottom: 0.5rem;
        text-align: center;
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
        margin-left: 0.5em;
        aspect-ratio: 1/1;
        width: 5rem;
        box-shadow: 10px 10px 90px 10px black;
        border-radius: 50%; 
    }
    }
}
`