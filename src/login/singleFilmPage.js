import '../index.css';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import { Container, Col, Image, Row, Form, FormControl, Button, Jumbotron } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faVideo, faCircle, faListUl, faSearch, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';

import ReactPlayer from 'react-player'

function SingleFilmPage() {

  const history = useHistory();
  const goAccount = () => history.push('/account');
  const goMap = () => history.push('/Map');
  const goList = () => history.push('/List');
  const golistMode = () => history.push('/listMode');

  return (
    <div>
      <Container className="pt-2 fixed-top">
        <Row className="d-flex justify-content-between">
          <FontAwesomeIcon onClick={() => history.goBack()} className="backButton ml-2" icon={faArrowCircleLeft}/>        
          <Image onClick={goAccount} className="mr-2" src={process.env.PUBLIC_URL+"avatars/batman.png"} rounded width="60" height="60"/>
        </Row>
      </Container>
      <Container className="pt-4"></Container>
      <Container className="pt-5">
        <Row className="d-flex justify-content-around">
          <Col>
            <Image className="poster shadow" src={process.env.PUBLIC_URL+"posters/lupin.jpg"} rounded/>
          </Col>
          <Col>
            <h2 className="text-break">Lupin</h2>
            <p>de <span className="text-break font-weight-bold">George Kay</span></p>
            <p><FontAwesomeIcon icon={faVideo}/> <span className="text-break font-weight-bold">2020</span></p>
            <p>avec <span className="text-break font-weight-bold">Omar Sy, Ludivine Sagnier</span></p>
          </Col>
        </Row>
        <Jumbotron className="my-4 bgGrey borderRadius py-3 shadow">
          <p className="text-center font-weight-bold">Il y a 10 scènes filmées dans les rues de Paris</p>
          <Row className="d-flex justify-content-center">
            <Button className="normalButton font-weight-bold shadow py-3">Voir les lieux de tournages</Button>
          </Row>
        </Jumbotron>
      </Container>
      <Container>
        <Jumbotron className="my-4 bgGrey borderRadius py-3 shadow">
          <div className='player-wrapper'>
            <ReactPlayer responsive="true" className='react-player' controls={true} url='https://www.youtube.com/watch?v=gCmuYqeeNpc' width='100%' height='100%'/>
          </div>
        </Jumbotron>
      </Container>
      <Container>
        <Jumbotron className="my-4 bgGrey borderRadius py-3 shadow">
          <Jumbotron className="mt-1 mb-4 bgLightGrey borderRadius py-3 shadow">
            <Form.Control className="input-border shadow py-5" type="text" placeholder="Ecrivez ici ..." />
            <Row className="d-flex justify-content-center">
              <Button className="normalButton font-weight-bold shadow my-2">Commenter</Button>
            </Row>
          </Jumbotron>
          <Jumbotron className="comments pt-2 pb-1 my-2">
            <Row className="justify-content-between px-3">
              <p className="font-weight-bold">User65123</p>
              <p className="small">Ajouté le 26/02/2021</p>
            </Row>
            <Row className="px-3">
              <p>Super Cool !!</p>
            </Row>
          </Jumbotron>
          <Jumbotron className="comments pt-2 pb-1 my-2">
            <Row className="justify-content-between px-3">
              <p className="font-weight-bold">User35197</p>
              <p className="small">Ajouté le 01/02/2021</p>
            </Row>
            <Row className="px-3">
              <p>go mettre 20/20 !!</p>
            </Row>
          </Jumbotron>
          <Jumbotron className="comments pt-2 pb-1 my-2">
            <Row className="justify-content-between px-3">
              <p className="font-weight-bold">User789984</p>
              <p className="small">Ajouté le 12/02/2021</p>
            </Row>
            <Row className="px-3">
              <p>Je kiff ce film !!</p>
            </Row>
          </Jumbotron>
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
export default SingleFilmPage;
