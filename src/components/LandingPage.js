import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function LandingPage() {
  return (
    <Container>
        <Mytech>Use My Tech Stuff</Mytech>
        <Para >
          Tired of paying ridiculous fees for camera and other equipment
          rentals? Bypass the middleman and rent from a real person!
        </Para >
        <Logincontainer>
            <Link to="/login">
            <p>Login</p>
            </Link>
        </Logincontainer>
        <Logincontainer>
            <Link to="/sign-up">
            <p>Sign Up</p>
            </Link>
        </Logincontainer>
    </Container>
  );
}

export default LandingPage;

const Container = styled.div`
  text-align: center;
  margin: auto;
  margin-top: 5%;
  width: 40%;
`

const Mytech = styled.h1 `
    font-size: 4rem;
    text-shadow: 2px 2px black;
`

const Para = styled.p ` 
    margin: 10% 0;
`

const Logincontainer = styled.div `
    margin: auto;
    background-color: #1D817F;
    width: 30%;
`
