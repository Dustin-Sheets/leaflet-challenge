d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").
then(function(data){
    console.log(data);
})

var map = L.map('map', {
    center: [38.52, -97.67],
    zoom: 5
});


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}',
{ foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").
then(function(data){
    let features = data.features
    
    for (let i = 0; i < features.length; i++) {

        let quake = features[i]
    
        L.circle([quake.geometry.coordinates[1], quake.geometry.coordinates[0]], {

            radius: quake.properties.mag * 20000,
            fillColor: "green",
            fillOpacity: quake.geometry.coordinates[2]/50,
            color: "green"
        }).bindPopup(`<h1>Magnitude: ${quake.properties.mag}/10</h1> <h1>Depth: ${quake.geometry.coordinates[2]} Miles</h1> <h2>located ${quake.properties.place}</h2>`).addTo(map);
    
    }
})