import * as React from 'react'
import mapboxgl from 'mapbox-gl'
import AWS from 'aws-sdk'
import { BrowserRouter, Switch, Route, Link, useHistory } from "react-router-dom";
import '../App.css';
import { getAllFilms } from '../core/Films'
import Map from './Home';
import { Container, Col, Image, Row, Form, FormControl, Button, Jumbotron } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'
import ViewAllFilms from './viewAllFilms';


function Home() {
    const history = useHistory();
    const goList = () => history.push('/List');
    const mapContainerRef = React.useRef(null)
    const popUpRef = React.useRef(new mapboxgl.Popup({ offset: 15 }))

    React.useEffect(
        () => {
            async function loadMap() {
                const map = new mapboxgl.Map({
                    container: mapContainerRef.current,
                    // See style options here: https://docs.mapbox.com/api/maps/#styles
                    style: "mapbox://styles/mapbox/streets-v11",
                    center: [2.35, 48.85],
                    zoom: 12.5
                });      
                const films = (await getAllFilms()).slice(0, 50)
                for (let i=0; i < films.length; i++) {
                    const film = films[i];
                    const { titre } = film
                    const {x, y} = JSON.parse(film.coords)
                    
                    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=${titre}`)
                    const { results } = await response.json()

                    const posterPath = (results.length > 0)
                    ? `https://image.tmdb.org/t/p/w500${results[0].poster_path}`
                    : 'https://www.coved.com/wp-content/uploads/2016/11/orionthemes-placeholder-image-1.png'

                    new mapboxgl.Marker()
                    .setLngLat([x, y])
                    .setPopup(new mapboxgl.Popup({closeButton: false, offset: 25 })
                    .setHTML(`<img width="80" src='${posterPath}'/><p>${titre}</p>`)) 
                    .addTo(map)
                }
            }
        loadMap()
        },
    [],
    )

    return (
    <div>
        <div className="map-container" ref={mapContainerRef} />
        <Container className="pt-2 fixed-bottom">
            <Row className="d-flex justify-content-between pb-2">
            <FontAwesomeIcon className="MapIcon" icon={faMapMarkedAlt}/>        
            <FontAwesomeIcon onClick={goList} className="ListIcon" icon={faSearch}/>        
        </Row>
        </Container>
    </div>
    )
}

export default Home
