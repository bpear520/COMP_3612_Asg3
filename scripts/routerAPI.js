const data = require("./dataProvider.js");

// Generic helper function to filter data, if no matches, return 404
const filterData = (dataset, filterFunc, notFoundMessage, req, res) => {
    const matches = dataset.filter(filterFunc);
    if (matches.length > 0) {
        res.json(matches.length === 1 ? matches[0] : matches);
    } else {
        res.status(404).send(notFoundMessage);
    }
};

// Generic helper function to handle all methods, if the dataset is empty, return 404
const handleAllData = (dataset, notFoundMessage, res) => {
  if (dataset && dataset.length > 0) {
      res.json(dataset);
  } else {
      res.status(404).send(notFoundMessage);
  }
};

const handleAllPaintings = (app) => {
  app.get("/api/paintings", (req, res) => {
    handleAllData(data.dataPaintings, "No paintings found", res);
  });
};

const handleAllGalleries = (app) => {
  app.get("/api/galleries", (req, res) => {
    handleAllData(data.dataGalleries, "No galleries found", res);
  });
};

const handleAllArtists = (app) => {
  app.get("/api/artists", (req, res) => {
    handleAllData(data.dataArtists, "No artists found", res);
  });
};

const handlePaintingById = (app) => {
  app.get("/api/painting/:id", (req, res) => {
    const paintingID = parseInt(req.params.id, 10);
    filterData(
      data.dataPaintings,
      (painting) => painting.paintingID === paintingID,
      `No painting with id: ${req.params.id} found`,
      req,
      res
    );
  });
};

const handlePaintingByGalleryId = (app) => {
  app.get("/api/painting/gallery/:id", (req, res) => {
    const galleryID = parseInt(req.params.id, 10);
    filterData(
      data.dataPaintings,
      (painting) => painting.gallery.galleryID === galleryID,
      `No paintings with galleryId: ${req.params.id} found`,
      req,
      res
    );
  });
};

const handlePaintingByArtistId = (app) => {
  app.get("/api/painting/artist/:id", (req, res) => {
    const artistID = parseInt(req.params.id, 10);
    filterData(
      data.dataPaintings,
      (painting) => painting.artist.artistID === artistID,
      `No paintings with artistId: ${req.params.id} found`,
      req,
      res
    );
  });
};

const handlePaintingByYearMinMax = (app) => {
  app.get("/api/painting/year/:min/:max", (req, res) => {
    const yearOfWorkMin = parseInt(req.params.min, 10);
    const yearOfWorkMax = parseInt(req.params.max, 10);
    filterData(
      data.dataPaintings,
      (painting) => painting.yearOfWork >= yearOfWorkMin && painting.yearOfWork <= yearOfWorkMax,
      `No paintings with year between ${req.params.min} and ${req.params.max} found`,
      req,
      res
    );
  });
};

const handlePaintingByTitle = (app) => {
  app.get("/api/painting/title/:title", (req, res) => {
    const title = req.params.title;
    filterData(
      data.dataPaintings,
      (painting) => painting.title.toLowerCase().includes(title.toLowerCase()),
      `No paintings with title: ${req.params.title} found`,
      req,
      res
    );
  });
};

const handlePaintingsByColorName = (app) => {
  app.get("/api/painting/color/:color", (req, res) => {
    const colorName = req.params.color.toLowerCase();
    filterData(
      data.dataPaintings,
      (painting) => painting.details.annotation.dominantColors.some((colorObject) =>
        colorObject.name.toLowerCase().includes(colorName)
      ),
      `No paintings with color name: ${req.params.color} found`,
      req,
      res
    );
  });
};

const handleArtistsByCountry = (app) => {
  app.get("/api/artists/:country", (req, res) => {
    const country = req.params.country;
    filterData(
      data.dataArtists,
      (artist) => artist.Nationality.toLowerCase().includes(country.toLowerCase()),
      `No artists from the country: ${country} found`,
      req,
      res
    );
  });
};

const handleGalleriesByCountry = (app) => {
  app.get("/api/galleries/:country", (req, res) => {
    const country = req.params.country;
    filterData(
      data.dataGalleries,
      (gallery) => gallery.GalleryCountry.toLowerCase().includes(country.toLowerCase()),
      `No galleries from the country: ${country} found`,
      req,
      res
    );
  });
};

module.exports = {
  handleAllPaintings,
  handleAllGalleries,
  handleAllArtists,
  handlePaintingById,
  handlePaintingByGalleryId,
  handlePaintingByArtistId,
  handlePaintingByYearMinMax,
  handlePaintingByTitle,
  handlePaintingsByColorName,
  handleArtistsByCountry,
  handleGalleriesByCountry
};
