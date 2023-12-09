const path = require('path');
const fs = require('fs');
const jsonPathArtists = path.join(__dirname, '../data', 'artists.json');
const jsonDataArtists = fs.readFileSync(jsonPathArtists, 'utf8');
const dataArtists = JSON.parse(jsonDataArtists);
const jsonPathGalleries = path.join(__dirname, '../data', 'galleries.json');
const jsonDataGalleries = fs.readFileSync(jsonPathGalleries, 'utf8');
const dataGalleries = JSON.parse(jsonDataGalleries);
const jsonPathPaintings = path.join(__dirname, '../data', 'paintings-nested.json');
const jsonDataPaintings = fs.readFileSync(jsonPathPaintings, 'utf8');
const dataPaintings = JSON.parse(jsonDataPaintings);

module.exports = { dataArtists, dataGalleries, dataPaintings};