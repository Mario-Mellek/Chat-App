import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import styled from "styled-components";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { setPicRoute } from "../utils/APIRoutes";
import Test from "./test";
import loader from '../assets/loader.gif'
import { Buffer } from "buffer";

export default function SetProfilePic() {
    const navigate = useNavigate()
    const [pics, setPics] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedPic, setSelectedPic] = useState(undefined)
    const [chosen, setChosen] = useState(undefined)

    const toastOptions = {
        position: "bottom-right",
        autoClose: 3000,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
    }

    let utter;
    function speak(text) {
        utter = new SpeechSynthesisUtterance(text)
        speechSynthesis.speak(utter);
    };

    useEffect(() => {
        async function fetchedPics() {
            const api = import.meta.env.VITE_IMG_API;
            const apiKey = import.meta.env.VITE_IMG_KEY;
            const data = [];
            for (let i = 0; i < 6; i++) {
                const image = await axios.get(`${api}${Math.round(Math.random() * 1000)}.svg?apikey=${apiKey}`)
                data.push(Buffer.from(image.data).toString('base64'))
            }
            setPics(data)
            setIsLoading(false)
        }
        fetchedPics()
    }, [])

    async function postImage() {
        try {
            let user = await JSON.parse(localStorage.getItem('Application User'));
            const { data } = await axios.post(`${setPicRoute}/${user._id}`, {
                image: pics[selectedPic]
            })
            if (data.status === true) {
                // user.profilePic = data.image
                // user.isProfilePicSet = user.profilePic ? true : false;
                // localStorage.setItem('Application User', JSON.stringify(user)) 
                toast.info(`${data.message} Please log in`, toastOptions)
                speak(`${data.message}. Please log in`)
                utter.addEventListener('end', () => {
                    localStorage.clear()
                    navigate('/')
                })
            } else {
                toast.error("Couldn't save the profile pic, Please try again", toastOptions)
            }
        } catch (error) {
            toast.error('You must be logged in to choose a picture', toastOptions)
            console.log(error.message)
            setTimeout(() => {
                navigate('/login')
            }, 4000)
        };
    }

    async function handleSubmission(e) {
        e.stopPropagation()
        selectedPic === undefined ?
            toast.error('Please select a picture', toastOptions)
            :
            setChosen(selectedPic)
            &
            await postImage()
    }

    const mappedPics = pics.map((pic, index) => {
        const handleSelection = (e) => {
            e.stopPropagation()
            setSelectedPic(index)
            setChosen(undefined)
        }
        return (
            <div key={index}
                className={`pic ${selectedPic === index ? 'selected' : ''} ${chosen === index ? 'chosen' : ''}`}>
                <img src={`data:image/svg+xml;base64,${pic}`} alt="Profile Picture"
                    onClick={handleSelection}
                />
            </div>
        )
    })

    return (
        <>
            <Test />
            {isLoading ?
                <Container>
                    <img src={loader} alt="loader" className="loader" />
                </Container> :
                (<Container onClick={() => {
                    setSelectedPic(undefined);
                    setChosen(undefined)
                }}>
                    <div className="title">
                        <h1>Pick a Profile Picture</h1>
                    </div>
                    <div className="pics">
                        {mappedPics}
                    </div>
                    <button className="submit-btn" onClick={handleSubmission}>Set a Profile Picture</button>
                </Container>)
            }
            <ToastContainer />
        </>
    )
}

const Container = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 5rem;
    background-color: #7e624e84;
.loader{
    max-inline-size: 80%;
}
.title{
    color: white;
}
.pics{
    display: grid;
    grid-template-columns:repeat(3, 1fr);
    grid-gap: 5rem;
    .pic{
        border: 1px solid transparent;
        padding: 0.5rem;
        border-radius: 50%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        transition: all 0.5s ease-in-out;
        img{
            height: 10rem;
            transition: all 0.5s ease-in-out;
        }
    }
    .chosen>img{
        height: 15rem;
    }
    .selected{
        width: fit-content;
        border: 5px solid black;
        box-shadow: 0px 0px 20px black;
    }
}
button{
background-color: #00000086;
color: white;
font-size: larger;
padding: 1rem;
font-weight: bold;
cursor: pointer;
border-radius: 15px;
text-transform: uppercase;
transition: all 0.2s ease-in-out;
&:hover{
    background-color: #7e624e84;
    box-shadow: 20px 20px 40px black; 
    }
    &:active{
    background-color: #00000086;
    }
}
@media only screen and (max-width: 1200px){
    text-align: center;
    gap: 2rem;
    .pics{
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.5rem;
}
}
`