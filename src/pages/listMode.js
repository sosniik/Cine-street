import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Container, Col, Image, Row, Form, FormControl, Button, Jumbotron } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link, useHistory, Redirect } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faVideo, faCircle, faListUl, faSearch } from '@fortawesome/free-solid-svg-icons';


function ListMode() {

  const history = useHistory();
  const goAccount = () => history.push('/account');
  const golistMode = () => history.push('/listMode');

  return (
    <div>
      <Container className="pt-2 fixed-top">
        <Row className="d-flex justify-content-between">
          <FontAwesomeIcon onClick={() => history.goBack()} className="backButton ml-2" icon={faArrowCircleLeft}/>        
          <Image onClick={goAccount} className="mr-2" src=".\batman.png" rounded width="60" height="60"/>
        </Row>
      </Container>
      <Container className="d-flex justify-content-between py-5">
        ListMOOOOOOOOOOOOOOODE
      </Container>
      
   
      <Container className="pt-2 fixed-bottom">
        <Row className="d-flex justify-content-between pb-2">
          <FontAwesomeIcon onClick={golistMode} className="buttonFont ml-3 shadow" icon={faListUl}/>        
          <FontAwesomeIcon className="buttonFont mr-3 shadow" icon={faSearch}/>        
        </Row>
      </Container>
    </div>
  );
}
export default ListMode;
