import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import hello from '../assets/hello.gif'

export default function Welcome({ currentUser }) {
    const [userName, setUserName] = useState(undefined)

    useEffect(() => {
        async function update() {
            try {
                setUserName(await currentUser.username)
            } catch (error) {
                console.warn(error)
            }
        }
        update()
    }, [currentUser])

    return (
        <Container>
            <img src={hello} alt="load" />
            <br />
            <h3>Hello {userName}!</h3>
            <br />
            <span>Select a chat to start</span>
        </Container>
    )
}

const Container = styled.div`
width: 100vw;
height: 100vh;
position: absolute;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
z-index: -1;
text-align: center;
animation: rotate 0.5s 0.3s both ease-in-out;
color: white;
@keyframes rotate {
    from{
        transform:rotateY(0deg) ;
        opacity: 0;
    }
    to{
        transform: rotateY(360deg);
        opacity: 1;
    }
}
img{
    border-radius: 40%;
    width: 40%;
}
`
