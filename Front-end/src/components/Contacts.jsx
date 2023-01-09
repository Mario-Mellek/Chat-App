import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

export default function Contacts({ contacts, currentUser }) {

    const [currentUserName, setCurrentUserName] = useState(undefined)
    const [currentUserImage, setCurrentUserImage] = useState(undefined)
    const [currentlySelected, setCurrentlySelected] = useState(undefined)


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
    return (
        <>
            {
                currentUser && Boolean(contacts[0]) && (
                    <>
                        <Container>
                            <SideBar>
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
                            <div className="current-user">
                                <div className="profile-pic">
                                    <p>{currentUserName}</p>
                                    <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="Profile Picture" />
                                </div>
                            </div>
                        </UserContainer>
                    </>
                ) || (
                    <>
                        <SideBar>
                            <h3>No users to chat with?</h3>
                            <br /><br />
                            <p> Start inviting friends</p>
                        </SideBar>
                        <UserContainer>
                            <div className="current-user">
                                <div className="profile-pic">
                                    <p>{currentUserName}</p>
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
/* display: none; */
background-color: black;
color: white;
overflow-y: auto;
height: 100%;

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
`

const UserContainer = styled.div`
.current-user{
    width: 100%;
    .profile-pic{
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: start;
    gap: 2em;
    border-bottom: 3px solid black;
    border-radius: 2em;
    p{
        margin-bottom: 0.5rem;
        text-align: center;
        color: white;
        text-shadow: 5px 5px 10px white;
        font-style: oblique;
        letter-spacing: 0.3em;
        text-transform: uppercase;
    }
    img{
        aspect-ratio: 1/1;
        width: 5rem;
        box-shadow: 10px 10px 90px 10px black;
        border-radius: 50%; 
    }
    }
}
`