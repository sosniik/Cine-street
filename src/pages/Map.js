
import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import Popup from "./Popup";
import ReactDOM from "react-dom";
import '../App.css'
import DATA from '../data/data.json'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function Map(){
    const coord_y = DATA.map((item) => item.fields.coord_y).splice(1,20);
    const coord_x = DATA.map((item) => item.fields.coord_x).splice(1,20);
  
    // console.log(coord_y);
    // console.log(coord_x);
      
    const mapContainerRef = useRef(null);
    const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));
    
    // initialize map when component mounts
    useEffect(() => {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        // See style options here: https://docs.mapbox.com/api/maps/#styles
        style: "mapbox://styles/mapbox/streets-v11",
        center: [2.35, 48.85],
        zoom: 12.5
    });
  
  
        for (let i = 0 ; i < coord_y.length && i < coord_x.length;i++){
        new mapboxgl.Marker()
        .setLngLat([coord_x[i], coord_y[i]])
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML('...'))//route vers la fiche d'un film
        .addTo(map);
        }
  
  
        // map.addLayer({
        //   'id': 'places',
        //   'type': 'symbol',
        //   'source': 'places',
        //   'layout': {
        //   'icon-image': '{icon}-15',
        //   'icon-allow-overlap': true
        //   }
        //   });
    
        // for (let i = 0 ; i < coord_y.length && i < coord_x.length;i++){
        // map.on('click', 'places', function (e) {
        
        //   // Ensure that if the map is zoomed out such that multiple
        //   // copies of the feature are visible, the popup appears
        //   // over the copy being pointed to.
        //   while (Math.abs(e.lngLat.lng - coord_x) > 180) {
        //   coord_x += e.lngLat.lng > coord_x ? 360 : -360;
        //   }
        
        //   new mapboxgl.Popup()
        //   .setLngLat([coord_x[i], coord_y[i]])
        //   .setHTML("...")
        //   .addTo(map);
        //   });
        // }
  
  
  
  
  
        // add navigation control (zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
  
        // map.on("load", () => {
        // // add the data source for new a feature collection with no features
        // map.addSource("random-points-data", {
        //     type: "geojson",
        //     data: {
        //     type: "FeatureCollection",
        //     features: []
        //     }
        // });
        // // now add the layer, and reference the data source above by name
        // map.addLayer({
        //     id: "random-points-layer",
        //     source: "random-points-data",
        //     type: "symbol",
        //     layout: {
        //     // full list of icons here: https://labs.mapbox.com/maki-icons
        //     "icon-image": "bakery-15", // this will put little croissants on our map
        //     "icon-padding": 0,
        //     "icon-allow-overlap": true
        //     }
        // });
        // });
  
        // map.on("moveend", async () => {
        // // get new center coordinates
        // const { lng, lat } = map.getCenter();
        // // fetch new data
        // const results = await fetchFakeData({ longitude: lng, latitude: lat });
        
        // // update "random-points-data" source with new data
        // // all layers that consume the "random-points-data" data source will be updated automatically
        // map.getSource("random-points-data").setData(results);
        
        // });

        // // change cursor to pointer when user hovers over a clickable feature
        // map.on("mouseenter", "random-points-layer", e => {
        // if (e.features.length) {
        //     map.getCanvas().style.cursor = "pointer";
        // }
        // });

        // // reset cursor to default when user is no longer hovering over a clickable feature
        // map.on("mouseleave", "random-points-layer", () => {
        // map.getCanvas().style.cursor = "";
        // });

        // // add popup when user clicks a point
        // map.on("click", "random-points-layer", e => {
        // if (e.features.length) {
        //     const feature = e.features[0];
        //     // create popup node
        //     const popupNode = document.createElement("div");
        //     ReactDOM.render(<Popup feature={feature} />, popupNode);
        //     // set popup on map
        //     popUpRef.current
        //     .setLngLat(feature.geometry.coordinates)
        //     .setDOMContent(popupNode)
        //     .addTo(map);
        // }
        // });
      
  
        return()=> map.remove();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
    return <div className="map-container" ref={mapContainerRef} />;
}

export default Map;