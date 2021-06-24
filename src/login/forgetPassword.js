import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import { Container, Col, Image, Row, Form, FormControl, Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'

import {getIcon} from '../functions/global'

function ForgotPassword() {

  const history = useHistory();
  
  return (
      <div>
        <Container className="header mt-2">
          <FontAwesomeIcon onClick={() => history.goBack()} className="backButton" icon={faArrowCircleLeft}  />        
        </Container>
        <Container>
          <Row className="d-flex justify-content-center">
              <Image className="img-heading mt-4" src={process.env.PUBLIC_URL+"icones/logo.png"} rounded width="200" height="125"/>
          </Row>
          <Row className="d-flex justify-content-center">
            <h2 className="font-weight-bold mt-4">Mot de passe oublié</h2>
          </Row>
          <Container>
            <Form className="mt-4">
              <Form.Group controlId="pseudoForm">
                <Form.Label className="font-weight-bold">Adresse email ou pseudonyme</Form.Label>
                <Form.Control className="input-border shadow" type="text" placeholder="johnsmith@example.com" />
                </Form.Group>
              <Form.Group controlId="passwordForm">
                <Form.Label className="font-weight-bold">Mot de passe</Form.Label>
                <Form.Control className="input-border shadow" type="password" placeholder="monsupermdp" />
              </Form.Group>
              <Row className="d-flex justify-content-center mt-4">
                <Button type="submit" className="bigButton shadow">SOUMETTRE</Button>            
              </Row>
            </Form>
          </Container>
        </Container>
      </div>
  );
}

export default ForgotPassword;
