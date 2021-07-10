mapboxgl.accessToken = mapToken;
const grounds = JSON.parse(campground);
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: grounds.geometry.coordinates, // starting position [lng, lat]
    zoom: 10 // starting zoom
});

const marker = new mapboxgl.Marker()
    .setLngLat(grounds.geometry.coordinates)
    .addTo(map);