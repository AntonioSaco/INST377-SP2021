function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  const mymap = L.map('mapid').setView([38.9897, -76.9378], 13);
  
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibG9mdHlsIiwiYSI6ImNrbTJyZnB3cDFhMGkyd3BmamFwNDN3eXUifQ.9wC-Cx9iT7Iwk62DQnTISw'
  }).addTo(mymap);
  console.log('mymap', mymap);
  return mymap;
}

async function dataHandler(mapObjectFromFunction) {
  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers
  const form = document.querySelector('.search-form');
  const search = document.querySelector('.search');
  const targetList = document.querySelector('.targetList');

  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'; // Where we fetch from
  const request = await fetch(endpoint);
  const places = await request.json();

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('searched', search.value);

    // Filter list for zip and coordinates
    const filt = places.filter((record) => record.zip.includes(search.value) && record.geocoded_column_1);
    const listFive = filt.slice(0,5);
    console.table(listFive);

    // Find the coordinates of the first location and move the map focus to it
    const firstLong = listFive[0].geocoded_column_1.coordinates[0];
    const firstLat = listFive[0].geocoded_column_1.coordinates[1];
    mapObjectFromFunction.setView(new L.LatLng(firstLat, firstLong), 8);
    mapObjectFromFunction.setZoom(15);

    targetList.innerHTML = ''; // Clear the list to prevent buildup beyond 5

    listFive.forEach((item) => {
      const longLat = item.geocoded_column_1.coordinates;
      console.log('Marked', longLat[0], longLat[1]);
      const marker = L.marker([longLat[1], longLat[0]]).addTo(mapObjectFromFunction);

      const appendObj = document.createElement('li');
      appendObj.classList.add('block');
      appendObj.classList.add('list-item');
      appendObj.classList.add('box');
      appendObj.classList.add('has-background-primary');
      appendObj.classList.add('has-text-black');
      appendObj.classList.add('mt-10');
      appendObj.innerHTML = `<div class="list-header is-size-5 has-text-weight-bold">${item.name}</div> <address class="is-size-6"> ${item.address_line_1} </address>`;
      targetList.append(appendObj);

    });

  });
 
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions; 