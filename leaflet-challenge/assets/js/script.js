var map = L.map("map", {
    center: [0, -10], // lat and lon
    zoom: 3
  });

  const getColor = depth => depth>90 ? 'rgb(255,0,0)' : depth < 11 ? 'rgb(255, 246, 0)' : depth < 51 ? 'rgb(255,191,0)' : 'orange';

  d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson').then(data => {
    x = data;

    console.log(data);

    L.geoJSON(data, {
        pointToLayer: function(data, latlng) {
            return L.circleMarker(latlng);
        },

        style: function (feature) {
            return {fillColor: getColor(feature.geometry.coordinates[2]), fillOpacity: 1, radius: feature.properties.mag*4};
        }
    }).bindPopup(function (layer) {
        return `<h4>${layer.feature.properties.place}<br>Magnitude: ${layer.feature.properties.mag}</h4>`;
    }).addTo(map);

  })
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  let legend = L.control({position:"bottomright"});

  let div = L.DomUtil.create('div', 'legend');

  let colors = ['rgb(255,0,0)','orange','rgb(255,191,0)', 'rgb(255, 246, 0)'];
  let range = ['>90','>50','>10','<10'];

  colors.forEach((color,i) => {
    div.innerHTML += `<div style="background:${color}">${range[i]}</div>`
  });

  legend.onAdd = () => div;
  legend.addTo(map);

