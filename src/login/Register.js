import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from "react";
import { BrowserRouter, Switch, Route, Link, useHistory } from "react-router-dom";
import { Container, Col, Image, Row, Form, FormControl, Button } from 'react-bootstrap';
import Login from './Login';
import ForgetPassword from './forgetPassword';
import getIcon from '../functions/global'
import { BASE_API_URL } from '../utils/constant';

function Register() {
    const [error, setError] = useState("")
    const onFormSubmit = e => {
      e.preventDefault()
      const formData = new FormData(e.target),
            formDataObj = Object.fromEntries(formData.entries())
    if(formDataObj.password === formDataObj.confirmpassword){
      setError("[SUCCESS] Inscription réussi !")
        return fetch(`${BASE_API_URL}/insertUser`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json', "Accept": "application/json"},
          body: JSON.stringify({
            nom: formDataObj.nom,
            prenom: formDataObj.prenom,
            email: formDataObj.email,
            password: formDataObj.password
          })
        }).then((response) => {response.json()})
          .then((responseJson) => {
            return responseJson.success
          })
          .catch((error) => {
            console.error(error)
          });
      }
      else {
        setError("[ERROR] Les mots de passent ne correspondent pas !!")
      }
    }
  
    return (
        <div>
          <Container>
            <Row className="d-flex justify-content-center">
              <Image className="img-heading mt-4" src={process.env.PUBLIC_URL+"icones/logo.png"} rounded width="200" height="125"/>
            </Row>
            <Row className="d-flex justify-content-center">
              <h2 className="font-weight-bold mt-4">Inscription</h2>
            </Row>
            <Container>
              <Form onSubmit={onFormSubmit} className="inscription">
                <Form.Group controlId="nomForm">
                  <Form.Label className="font-weight-bold">Nom</Form.Label>
                  <Form.Control className="input-border shadow" name="nom" type="text" placeholder="Smith" />
                </Form.Group>
                <Form.Group controlId="prenomForm">
                  <Form.Label className="font-weight-bold">Prénom</Form.Label>
                  <Form.Control className="input-border shadow" name="prenom" type="text" placeholder="John" />
                </Form.Group>
                <Form.Group controlId="emailForm">
                  <Form.Label className="font-weight-bold">Email</Form.Label>
                  <Form.Control className="input-border shadow" type="email" name="email" placeholder="johnsmith@example.com" />
                </Form.Group>
                <Form.Group controlId="passwordForm">
                  <Form.Label className="font-weight-bold">Mot de passe</Form.Label>
                  <Form.Control className="input-border shadow" type="password" name="password" placeholder="••••••••••" />
                </Form.Group>
                <Form.Group controlId="confirmPasswordForm">
                  <Form.Label className="font-weight-bold">Confirmer le mot de passe</Form.Label>
                  <Form.Control className="input-border shadow" type="password" name="confirmpassword" placeholder="••••••••••" />
                </Form.Group>
                <Row className="d-flex justify-content-center mt-4">
                  <Button type="submit" className="bigButton shadow">INSCRIPTION</Button>            
                </Row>
              </Form>
            </Container>
            <Row className="d-flex justify-content-center">
              <Link className="smallLink my-4" to="/Map">Déjà inscrit ? Connectez-vous</Link>       
            </Row>
            {error}
          </Container>
        </div>
  
    );
  }

export default Register;