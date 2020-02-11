<!DOCTYPE html >
<html lang="en">

<head>
  <title>Basic Mappa Tutorial</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.16/p5.min.js" type="text/javascript"></script>
  <script src="https://unpkg.com/mappa-mundi/dist/mappa.js" type="text/javascript"></script>
</head>

<body>
  <script>
    
 
let myMap;
let canvas;
const mappa = new Mappa('Leaflet');

const options = {
  lat: 49.26,
  lng: -123.25,
  zoom:3,
  
style: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
}


function setup(){
   canvas = createCanvas(640,640);
  myMap = mappa.tileMap(options); 
  myMap.overlay(canvas) 

  meteorites = loadTable('Meteorite_Landings.csv', 'csv', 'header');

  myMap.onChange(drawMeteorites);

  fill(52, 64, 235); 
  stroke(50);
}

// Draw the meteorites
function drawMeteorites() {
  // Clear the canvas
  clear();

  for (let i = 0; i < meteorites.getRowCount(); i++) {
    // Get the lat/lng of each meteorite 
    const latitude = Number(meteorites.getString(i, 'reclat'));
    const longitude = Number(meteorites.getString(i, 'reclong'));

   
    if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
      const pos = myMap.latLngToPixel(latitude, longitude);
     
      let size = meteorites.getString(i, 'mass (g)');
      size = map(size, 558, 60000000, 1, 25) + myMap.zoom();
      triangle(pos.x, pos.y, pos.x +5, pos.y - 10, pos.x + 10, pos.y);
    }
  }
}
  </script>
</body>

</html>