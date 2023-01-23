import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes'
import Input from './Input'
import { BsArrowDownCircleFill } from 'react-icons/bs'
import { useInView } from 'react-intersection-observer';


export default function ChatContainer({ currentUser, currentChat, minView }) {

    const [messages, setMessages] = useState([])
    const scrollRef = useRef(null)
    const [time, setTime] = useState(new Date());
    const { ref, inView } = useInView();

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        const getAllMessages = async () => {
            const response = await axios.post(getAllMessagesRoute, {
                from: currentUser._id,
                to: currentChat._id,
            })
            setMessages(response.data)
        }
        getAllMessages()
    }, [currentChat, time])

    const mappedMessages = messages.map((message, index) => {
        const timeStamp = (message.timeStamp.split('\n'));
        return (
            <div
                className={`contains ${message.ownMessage ? 'own' : 'received'}`}
                key={index}
            >
                <p className='msgPara'>{message.message} <br /> <br /> <span>{timeStamp[0]}<br />{timeStamp[1]}</span> </p>
            </div>

        )
    })

    const scrollToBottom = () => {
        scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    }

    const handleSend = async (msg) => {
        await axios.post(sendMessageRoute, {
            message: msg,
            from: currentUser._id,
            to: currentChat._id,
        })
    }
    return (
        <Container>
            <div className="chat">
                <div className={`user-info ${minView ? 'min' : null}`}>
                    <p>Username:
                        <span>
                            <br />{currentChat.username}
                        </span>
                    </p>
                    <p>E-mail:
                        <span>
                            <br />{currentChat.email}
                        </span>
                    </p>
                    <p>Date:
                        <span>
                            <br />{`${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()}`}
                        </span>
                    </p>
                    <p>Time:
                        <span>
                            <br />{`${time.getHours()}:${(time.getMinutes() < 10 ? '0' : '') + time.getMinutes()}:${(time.getSeconds() < 10 ? '0' : '') + time.getSeconds()}`}
                        </span>
                    </p>
                </div>
                <div className={`chat-messages ${minView ? 'min' : null}`}>
                    <div
                        onMouseEnter={scrollToBottom}
                        className='msg'>
                        {!inView &&
                            <div className='arrow'>
                                <BsArrowDownCircleFill onClick={scrollToBottom} size={30} />
                            </div>}
                        {mappedMessages} <br />
                        <span className='anchor' ref={(el) => { ref(el); scrollRef.current = el }} />
                    </div>
                </div>
                {/* <Messages minView={minView} currentUser={currentUser} currentChat={currentChat} mappedMessages={mappedMessages} /> */}
                <Input handleSend={handleSend} minView={minView} />
            </div>
        </Container>
    )
}

const Container = styled.div`
margin-top: 8rem;
margin-left: 19%;
height: 90%;
position: absolute;
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
        .chat{
            width: 60vw;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .user-info{
            display: flex;
            column-gap: 5em;
            color: gray;
            transition: all 0.5s ease-in-out;
        
            span{
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
            }
        }
        .chat-messages.min{
            width: 130%;
            margin-right: 20%;
            transition: all 0.5s ease-in;
        }
        .chat-messages{
            transition: all 0.5s ease-in;
            width: 100%;
            max-height: 60%;
            padding: 1rem 2rem;
            display:flex;
            flex-wrap: wrap;
            flex-direction: column;
        .msg{
            padding: 1rem;
            max-width: 100%;
            height: 700px;
            border: 1px solid black;
            border-radius: 1rem;
            display: flex;
            flex-direction: column;
            gap: 0.3rem;
            overflow-x: hidden;
            overflow-y: auto;
            &::-webkit-scrollbar{
                width: 0.5rem;
                background-color: whitesmoke;
            &-thumb{
                background-color: gray;
                border-radius: 1rem;
                }
            &-thumb:hover{
                background-color: #000000;
                }
            }
            .arrow{
                position: sticky;
                top: 0;
                color:gray;
                svg{
                    transition: all 0.5s ease-in-out;
                    &:hover{
                        color: whitesmoke;
                        cursor: pointer;
                    }
                }
            }
        }
        .contains{
            max-width: 50%;
            display: flex;
            flex-direction: column;
            transition: all 0.5s ease-in-out;
            &:hover{
                background-color: transparent;
            }
            .msgPara{
                position: relative;
                span{
                    font-size: 0.55rem;
                    float: right;
                }
            }
        }
        .own{
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            padding: 1.5rem;
            background-color: #616169;
            border: 1px solid black;
            border-radius: 100px 100px 0px;
            margin-left:50%;
        }
        .received{
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            padding: 1.5rem;
            background-color: #1717e6;
            border: 1px solid black;
            border-radius: 0px 100px 100px;
        }
    }
    @media only screen and ( 600px > width ) {
        margin-top: 20%;
        .chat{
            width: 48%;
            height: 90%;
        }
        .user-info{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: flex-start;
            justify-content: center;
            font-size: small;
            font-weight: 100;
            width: 80%;
            height: 20%;
            margin-bottom: 10px;
        }
        .chat-messages{
            width: 100%;
            max-height: 60%;
            padding: 1.5rem 2.5rem;
            .msg{
                padding: 0 0.2rem;
                width: 100%;
                min-height: 100%;
                border-radius: 1rem;
                gap: 0.2rem;
            }
            .anchor{
                margin-bottom: 5%;
            }
            .contains{
                max-width: 90%;
            .msgPara{
                font-size: 80%;
                span{
                    font-size: 50%;
                }
            }
        }
        .own{
            padding: 0.5rem;
            margin-left: 10%;
        }
        .received{
            padding: 0.5rem;
        }
    }
    }
`
