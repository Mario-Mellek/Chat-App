import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { BiPowerOff } from 'react-icons/bi'


export default function Logout() {
    const navigate = useNavigate();
    const handleClick = () => {
        localStorage.clear();
        navigate('./login')
    }
    return (
        <Button onClick={handleClick}><BiPowerOff /></Button>
    )
}

const Button = styled.button`
width: 5rem;
border-radius: 1rem;
padding: 0.5rem;
transition: all 0.3s ease-in-out;
background-color: gray;
&:hover{
    background-color: black;
    color: white;
    cursor: pointer;
}
    svg{
        font-size: 1.5rem;
    }
`
