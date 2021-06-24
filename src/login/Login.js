import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Register';
import React, { Component, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import { Container, Col, Image, Row, Form, FormControl, Button } from 'react-bootstrap';
import { logDOM } from '@testing-library/react';
import PropTypes from 'prop-types';
import axios from 'axios'
import AWS from 'aws-sdk'
import fetch from 'node-fetch'
import { BASE_API_URL } from '../utils/constant';
import Map from '../pages/Home';

function getIcon(link) {
    let url = process.env.PUBLIC_URL+link
    return url
}

async function loginUser(dataToTransfer) {
    console.log('dataToTransfer : ',dataToTransfer)
    const res = await fetch(`${BASE_API_URL}/getUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(dataToTransfer)
    })
    const data = await res.json()
    return data
}

function Login({setToken}) {
    const [email, setUserMail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            email,
            password
        });
        console.log('token :',token)
        setToken(token);
    }

    return (
        <div>
            <Container>
                <Row className="d-flex justify-content-center">
                </Row>
                <Row className="d-flex justify-content-center">
                    <Image className="img-heading mt-4" src={getIcon('icones/logo.png')} rounded width="200" height="125"/>
                </Row>
                <Row className="d-flex justify-content-center">
                    <h2 className="font-weight-bold mt-4">Connexion</h2>
                </Row>
            </Container>
            <Container>
                {/* <Form className="mt-4" onSubmit={this.handleSubmit}> */}
                <Form className="mt-4" onSubmit={handleSubmit}>
                    <Form.Group controlId="pseudoForm">
                        <Form.Label className="font-weight-bold">Adresse email ou pseudonyme</Form.Label>
                        {/* <Form.Control value={this.state.mail} onChange={this.mailChange} className="input-border shadow" type="text" placeholder="johnsmith@example.com" /> */}
                        <Form.Control onChange={e => setUserMail(e.target.value)} className="input-border shadow" type="text" placeholder="johnsmith@example.com" />
                    </Form.Group>
                        <Form.Group controlId="passwordForm">
                        <Form.Label className="font-weight-bold">Mot de passe</Form.Label>
                        {/* <Form.Control value={this.state.pwd} onChange={this.pwdChange} className="input-border shadow" type="password" placeholder="•••••••••••••" /> */}
                        <Form.Control onChange={e => setPassword(e.target.value)} className="input-border shadow" type="password" placeholder="•••••••••••••" />
                    </Form.Group>
                    <Row className="d-flex justify-content-center mt-4">
                        <Button type="submit" className="bigButton shadow">CONNEXION</Button>            
                    </Row>
                </Form>
            </Container>
            <Container>
                <Row className="justify-content-around  my-4">
                    <Link className="smallLink" to="/ForgetPassword">Mot de passe oublié ?</Link>
                    <Link className="smallLink" to="/Register">Inscription</Link>       
                </Row>
            </Container>
        </div>
    );
    // }
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  };

export default Login;
