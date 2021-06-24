import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect, useParams} from "react";
import {getIcon} from '../functions/global'
import axios from 'axios';
import { Container, Col, Image, Row, Form, FormControl, Button, Jumbotron } from 'react-bootstrap';
import { BrowserRouter, Switch, Route, Link, useHistory, Redirect } from "react-router-dom";

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faVideo, faCircle, faListUl, faSearch, faMap, faMapMarkerAlt, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import ViewAllFilms from './viewAllFilms';
import Map from './Home';
import { BASE_API_URL } from '../utils/constant';

function ListMode() {
    const [hasError, setErrors] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
    async function fetchData() {
        const res = await fetch(`${BASE_API_URL}/viewAllFilms`)
        res
        .json()
        .then(res => {setData(res)})
        .catch(err => setErrors(err));
    }

    fetchData();
    }, []);

    const history = useHistory();
    const goAccount = () => history.push('/account');
    const goMap = () => history.push('/Map');
    // const dataSingle = useParams()
    const goSingleFilmPage = () => history.push('/singleFilmPage');
    // const goSingleFilmPage = () => history.push('/singleFilmPage/:data');
    // const goSingleFilmPage = () => history.push({pathname: '/singleFilmPage',state: {singleFilm: data}});

    const goViewAllFilms = () => history.push('/viewAllFilms');

    function getOccurrence(array, value) {
        var count = 0;
        array.forEach((v) => (v === value && count++));
        return count;
    }

    function affichFilms(){
        var rows = [];
        var final_data = []

        for (var i = 0; i < data.length; i++) {
            rows.push(<a href="" role="button" onClick={goSingleFilmPage}>
            <Image key={data[i].image_url} className="viewAllFilmsPoster px-2 my-2" src={data[i].image_url} rounded/>
        </a>);
        }

        return (
            <div>
                {rows}
            </div>
        )
        // this.dataSingle = data[i]
    }

    return (
        <div>
            <Container className="pt-2 fixed-top">
                <Row className="d-flex justify-content-between">
                    <FontAwesomeIcon onClick={() => history.goBack()} className="backButton ml-2" icon={faArrowCircleLeft}/>        
                    <Image onClick={goAccount} className="mr-2" src={process.env.PUBLIC_URL+"/avatars/batman.png"} rounded width="60" height="60"/>
                </Row>
            </Container>

            <Container className="pt-3 mt-5 ">
                <p className="my-1 font-weight-bold">Filtrer :</p>
                <Form>
                    <Form.Row>
                        <Col>
                            <Form.Group controlId="exampleForm.SelectCustomSizeLg">
                            <Form.Label>année :</Form.Label>
                            <Form.Control as="select" size="sm" custom>
                                <option>All</option>
                                <option>2016</option>
                                <option>2017</option>
                                <option>2018</option>
                                <option>2019</option>
                                <option>2020</option>
                                <option>2021</option>
                            </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="exampleForm.SelectCustomSizeLg">
                            <Form.Label>type :</Form.Label>
                            <Form.Control as="select" size="sm" custom>
                                <option selected>Films & Séries</option>
                                <option>Séries</option>
                                <option>Films</option>
                            </Form.Control>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                </Form>
            </Container>

            <Container className="text-center mb-2">
                <Button  className="normalButton font-weight-bold shadow">Filtrer</Button>
            </Container>
            
            <Container>
                {affichFilms()}
            </Container>

            <Container className="pt-2 fixed-bottom">
                <Row className="d-flex justify-content-between pb-2">
                    <FontAwesomeIcon onClick={goMap} className="MapIcon"  icon={faMapMarkedAlt}/>        
                    <FontAwesomeIcon className="ListIcon" icon={faSearch}/>        
                </Row>
            </Container>
        {/* className="buttonFont ml-3 shadow" 
        className="buttonFont mr-3 shadow"*/}
        </div>
    );
}
export default ListMode;
