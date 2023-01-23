import React, { useState } from 'react'
import styled from 'styled-components'
import Picker from 'emoji-picker-react'
import { IoMdSend } from 'react-icons/io'
import { BsEmojiSmileFill } from 'react-icons/bs'

export default function Input({ handleSend, minView }) {
    const [showPicker, setShowPicker] = useState(false)
    const [msg, setMsg] = useState('')

    const handlePicker = () => {
        setShowPicker(!showPicker)
        console.log('Picker ', showPicker)
    }

    const handleEmoji = (e) => {
        let message = msg;
        message += e.emoji
        setMsg(message)
    }

    const sendChat = (e) => {
        e.preventDefault();
        setShowPicker(false)
        if (msg.length > 0) {
            handleSend(msg)
            setMsg('')
        } return
    }

    return (
        <>
            <Container>
                <div className={`button-container`}>
                    <div className="emoji">
                        <BsEmojiSmileFill onClick={handlePicker} />
                        {showPicker && <Picker
                            onEmojiClick={handleEmoji} />}
                    </div>
                </div>
                <form className={`input-container ${minView ? 'min' : null}`}
                    onSubmit={sendChat}>
                    <textarea
                        value={msg}
                        onChange={e => setMsg(e.target.value)}
                        placeholder='Type Here' />
                    <button className="submit">
                        <IoMdSend />
                    </button>
                </form>
            </Container>
        </>
    )
}

const Container = styled.div`
display: flex;
flex-direction: row;
gap: 1rem;
align-items: center;
justify-content: flex-start;
.button-container{
    display: flex;
    align-items: center;
    justify-content: center;
    .emoji{
            position: relative;
            cursor: pointer;
            svg{
                color: yellow;
                font-size: 1.5rem;
                border-radius: 50%;
                box-shadow: 4px 4px 10px black;
            }
            .EmojiPickerReact{
                position: absolute;
                bottom: 0;
                right: 100%;
                --epr-emoji-size: 25px;
                --epr-hover-bg-color: gray;
                --epr-bg-color: #533131;
                --epr-category-label-bg-color: black;
                --epr-text-color: white;
                box-shadow: -10px -10px 25px #533131;
            }
        }
    }
    .input-container{
        width: 40rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        transition: all 0.5s ease-in-out;
        textarea{
            width: 100%;
            height: 5rem;
            background-color: transparent;
            color: white;
            padding-left: 1rem;
            font-size: 1.2rem;
            border-radius: 1rem;
            resize: none;
            box-shadow: 4px 4px 10px black;
            &:focus{
                background-color: black;
                outline: 1px solid gray;
            }
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
        }
        button{
            background-color:gray;
            padding: 1.3rem .5rem;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 4px 4px 10px black;
            svg{
                font-size: large;
                color: white;
            }
        }
    }
    .input-container.min{
        width: 60rem;
        textarea{
            width: 100%;
        }
    }
    @media only screen and (600px > width) {
        width: 75%;
        .input-container textarea{
            width: 100%;
            height: 5rem;
            background-color: transparent;
            color: white;
            padding-left: 1rem;
            font-size: 1.2rem;
            border-radius: 1rem;
            resize: none;
        }
        .button-container .emoji .EmojiPickerReact{
            position: absolute;
            bottom: 200%;
            left: -400%;
        }
    
    }
`