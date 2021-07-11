mapboxgl.accessToken = mapToken;
const grounds = JSON.parse(campground);
const map = new mapboxgl.Map({
    container: 'show-map', // container ID
    style: 'mapbox://styles/mapbox/outdoors-v11', // style URL
    center: grounds.geometry.coordinates, // starting position [lng, lat]
    zoom: 10 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

const marker = new mapboxgl.Marker()
    .setLngLat(grounds.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h3> ${grounds.title} </h3>`)
    )
    .addTo(map);