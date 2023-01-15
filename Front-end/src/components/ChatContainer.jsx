import styled from 'styled-components'

export default function ChatContainer({ currentUser, currentChat }) {

    return (
        <Container>
            <div className="chat-header">
                <div className="user-info">
                    <div className="profile-pic">
                        <img src={`data:image/svg+xml;base64,${currentChat.profilePic}`} alt="User's Picture" />
                        <p>{currentChat.username}</p>
                        <p>{currentChat.email}</p>
                    </div>
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`
width: 50vw;
height: 100vh;
position: absolute;
left: 40rem;
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

@media only screen and ( 600px > width ) {
    left: 10rem;
}
@media only screen and ( 600px < width < 1200px) {
    left: 20rem;
}
`
