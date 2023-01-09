import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import styled from "styled-components";
import welcomeImage from "../assets/welcome.gif"
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";
import Test from "./test";

function Register() {
  let utter;

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: false,
    draggable: true,
    theme: "dark",
  }

  const navigate = useNavigate();
  useEffect(() => {
    localStorage.getItem('Application User') ?
      toast.info(`You're logged in already`, toastOptions) &
      setTimeout(() => {
        navigate('/')
      }, 4000)
      : null;
  }, [])

  const location = async () => {
    const API = import.meta.env.VITE_API;
    const key = import.meta.env.VITE_KEY;
    const response = await axios.get(`${API}?key=${key}`);
    const { city, country, latitude, longitude } = response.data.location
    return (`${city} ${country.name} ${latitude} ${longitude}`)
  };

  function speak(text) {
    utter = new SpeechSynthesisUtterance(text)
    speechSynthesis.speak(utter);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { password, username, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
        userLocation: await location(),
      })
      if (data.status === false) {
        speak(data.message);
        toast.info(data.message, toastOptions);
      } else {
        localStorage.setItem("Application User", JSON.stringify(data.user));
        toast.info(`Welcome ${username}, You've registered successfully`, toastOptions);
        speak(`Welcome ${username}, You've registered successfully`);
        utter.addEventListener('end', () => {
          navigate('/')
        })
      }
    }
  }

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("Passwords aren't matching", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be longer", toastOptions);
      return false;
    }
    else if (password.length < 8) {
      toast.error("Password should be at leat 8 charachtars", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastOptions);
      return false
    }
    return true
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Test />
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="welcome">
            <img src={welcomeImage} alt="welcome Image" />
            <h1>Chatting App</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Sign Up</button>
          <span>
            Already have an account? <Link to='/login'>Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 1rem;
background-color: #7e624e84;
text-align: center;
img{
  border-radius: 30%;
  margin-bottom: 1rem;
}
h1{
  text-transform: uppercase;
}
form{
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #25160a84;
  border-radius: 2rem;
  padding: 3rem 5rem;
  input{
    background-color: #7e624e84;
    padding: 0.5rem;
    border-radius: 15px;
    color: white;
    width: 100%;
    text-align: center;
    align-self: center;
    font-size: 1rem;
    transition: all 0.5s ease-in-out;
    &:focus{
      box-shadow: 20px 20px 40px black;
      border: 0.1rem solid black;
      outline: none;
    }
    &:hover{
      border: 0.1rem solid #830a0a;
    }
  }
  input::placeholder {
  color: black;
  font-weight: 600;
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
span{
  font-size: large;
  color: white;
  a:link, a:visited {
    text-decoration: underline;
    color: white;
    cursor: pointer;
}
}
}
@media only screen and (max-width: 600px) {
  form {
    height: fit-content;
    width: 90%;
    margin-top: 0px;
    padding-top: 0px;
    img{
      margin-top: 20px;
      width: 100%;
    }
    input{
      align-self: center;
      width: 140%;
    }
  }
}
@media only screen and (600px < width < 1200px) {
  form {
    height: fit-content;
    max-width: 80%;
    margin-top: 0px;
    padding-top: 0px;
    margin-bottom: 50px;
    img{
      margin-top: 20px;
      width: 100%;
    }
    input{
      align-self: center;
    }
  }
}
@media only screen and ( 1200px < width < 1500px) {
  form {
    height: fit-content;
    max-width: 90%;
    margin-top: 0px;
    padding-top: 0px;
    img{
      width: 100%;
      margin-top: 20px;
    }
    input{
      align-self: center;
    }
  }
}
`

export default Register;