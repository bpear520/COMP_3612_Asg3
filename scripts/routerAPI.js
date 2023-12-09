const data = require("./dataProvider.js");

//TODO: 404 response for these endpoints
const handleAllPaintings = (app) => {
  app.get("/api/paintings", (req, res) => {
    res.json(data.dataPaintings);
  });
};

const handleAllGalleries = (app) => {
  app.get("/api/galleries", (req, res) => {
    res.json(data.dataGalleries);
  });
};

const handleAllArtists = (app) => {
  app.get("/api/artists", (req, res) => {
    res.json(data.dataArtists);
  });
};

const handlePaintingById = (app) => {
  app.get("/api/painting/:id", (req, res) => {
    const paintingID = parseInt(req.params.id, 10);
    const matches = data.dataPaintings.filter(
      (p) => p.paintingID == paintingID
    );

    if (matches.length > 0) {
      res.json(matches[0]);
    } else {
      res.status(404).send(`No painting with id: ${req.params.id} found`);
    }
  });
};

const handlePaintingByGalleryId = (app) => {
  app.get("/api/painting/gallery/:id", (req, res) => {
    const galleryID = parseInt(req.params.id, 10);
    const matches = data.dataPaintings.filter(
      (p) => p.gallery.galleryID === galleryID
    );

    if (matches.length > 0) {
      res.json(matches);
    } else {
      res
        .status(404)
        .send(`No paintings with galleryId: ${req.params.id} found`);
    }
  });
};

const handlePaintingByArtistId = (app) => {
  app.get("/api/painting/artist/:id", (req, res) => {
    const artistID = parseInt(req.params.id, 10);
    const matches = data.dataPaintings.filter(
      (p) => p.artist.artistID === artistID
    );

    if (matches.length > 0) {
      res.json(matches);
    } else {
      res
        .status(404)
        .send(`No paintings with artistId: ${req.params.id} found`);
    }
  });
};

const handlePaintingByYearMinMax = (app) => {
  app.get("/api/painting/year/:min/:max", (req, res) => {
    const yearOfWorkMin = parseInt(req.params.min, 10);
    const yearOfWorkMax = parseInt(req.params.max, 10);
    const matches = data.dataPaintings.filter(
      (p) => p.yearOfWork >= yearOfWorkMin && p.yearOfWork <= yearOfWorkMax
    );
    if (matches.length > 0) {
      res.json(matches);
    } else {
      res
        .status(404)
        .send(
          `No paintings with year between ${req.params.min} and ${req.params.max} found`
        );
    }
  });
};

const handlePaintingByTitle = (app) => {
  app.get("/api/painting/title/:title", (req, res) => {
    const title = req.params.title;
    const matches = data.dataPaintings.filter((p) =>
      p.title.toLowerCase().includes(title.toLowerCase())
    );
    if (matches.length > 0) {
      res.json(matches);
    } else {
      res
        .status(404)
        .send(`No paintings with title: ${req.params.title} found`);
    }
  });
};

const handlePaintingsByColorName = (app) => {
  app.get("/api/painting/color/:color", (req, res) => {
    const colorName = req.params.color.toLowerCase();

    const matches = data.dataPaintings.filter((painting) =>
      painting.details.annotation.dominantColors.some((colorObject) =>
        colorObject.name.toLowerCase().includes(colorName)
      )
    );

    if (matches.length > 0) {
      res.json(matches);
    } else {
      res
        .status(404)
        .send(`No paintings with color name: ${req.params.color} found`);
    }
  });
};

const handleArtistsByCountry = (app) => {
  app.get("/api/artists/:country", (req, res) => {
    const country = req.params.country;
    const matches = data.dataArtists.filter((p) =>
      p.Nationality.toLowerCase().includes(country.toLowerCase())
    );
    if (matches.length > 0) {
      res.json(matches);
    } else {
      res.status(404).send(`No artists from the country: ${country} found`);
    }
  });
};

const handleGalleriesByCountry = (app) => {
    app.get("/api/galleries/:country", (req, res) => {
        const country = req.params.country;
        const matches = data.dataGalleries.filter((p) =>
        p.GalleryCountry.toLowerCase().includes(country.toLowerCase())
        );
        if (matches.length > 0) {
        res.json(matches);
        } else {
        res.status(404).send(`No galleries from the country: ${country} found`);
        }
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
