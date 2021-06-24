import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import { Container, Col, Image, Row, Form, FormControl, Button, Jumbotron } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faVideo, faCircle, faListUl, faSearch, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';

import ReactPlayer from 'react-player'

function Account() {
  const history = useHistory();
  const goMap = () => history.push('/Map');
  const goList = () => history.push('/List');

  return (
    <div>
      <Container className="pt-2 fixed-top">
          <Row className="d-flex justify-content-between">
            <FontAwesomeIcon onClick={() => history.goBack()} className="backButton ml-2" icon={faArrowCircleLeft}/>        
          </Row>
        </Container>
        <Container className="pt-4"></Container>
        <Container className="pt-5">
          <Jumbotron className="my-4 bgGrey borderRadius py-3 shadow">
            <Row className="justify-content-start">
                <Image className="mr-2" src={process.env.PUBLIC_URL+"avatars/batman.png"} rounded width="60" height="60"/>
                <h4 className="font-weight-bold">Profil de John Smith</h4>
            </Row>
            <Row className="d-flex">
              <Col>
                <p className="">Pseudo: <span>John Smith</span> </p>
                <p className="">Mot de passe : <span>•••••••••</span></p>
                <Link className="smallLink my-4" to="/forgetPassword">Modifier le mot de passe</Link>       

              </Col>

            </Row>
          </Jumbotron>
        </Container>
    
        <Container className="pt-2 fixed-bottom">
          <Row className="d-flex justify-content-between pb-2">
            <FontAwesomeIcon onClick={goMap} className="MapIcon" icon={faMapMarkedAlt}/>        
            <FontAwesomeIcon onClick={goList} className="ListIcon" icon={faSearch}/>      
          </Row>
        </Container>
    </div>

  );
}

export default Account;
