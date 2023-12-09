const express = require('express');
const path = require('path');
const app = express();
app.use('/static', express.static(path.join(__dirname, 'public')));

const router = require('./scripts/routerAPI.js');
router.handleAllPaintings(app);
router.handleAllGalleries(app);
router.handleAllArtists(app);
router.handlePaintingById(app);
router.handlePaintingByGalleryId(app);
router.handlePaintingByArtistId(app);
router.handlePaintingByYearMinMax(app);
router.handlePaintingByTitle(app);
router.handlePaintingsByColorName(app);
router.handleArtistsByCountry(app);
router.handleGalleriesByCountry(app);

let port = 8080;
app.listen(port, () => { console.log(`Server running on port:${port}`); });