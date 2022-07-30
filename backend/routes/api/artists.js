const express = require("express");

// const { requireAuth } = require("../../utils/auth");
const { Album, Song, User, sequelize } = require("../../db/models");

const router = express.Router();

router.get("/:artistId/songs", async (req, res) => {
  let { artistId } = req.params;
  artistId = parseInt(artistId);

  const artist = await User.findByPk(artistId);

  if (!artist) {
    res.status(404);
    return res.json({
      message: "Artist couldn't be found",
      statusCode: 404,
    });
  }

  const Songs = await Song.findAll({
    where: {
      userId: artist.id,
    },
    attributes: [
      "id",
      "userId",
      "albumId",
      "title",
      "description",
      "url",
      "createdAt",
      "updatedAt",
      ["imageUrl", "previewImage"],
    ],
  });

  return res.json({
    Songs,
  });
});

router.get("/:artistId", async (req, res) => {
  let { artistId } = req.params;
  artistId = parseInt(artistId);

  const artist = await User.findByPk(artistId);

  if (!artist) {
    res.status(404);
    return res.json({
      message: "Artist couldn't be found",
      statusCode: 404,
    });
  }

  const artists = await User.findByPk(artistId, {
    include: [
      {
        model: Song,
      },
      {
        model: Album,
      },
    ],
    attributes: ["id", "username", "previewImage"],
  });

  artists.dataValues.totalSongs = artists.dataValues.Songs.length;
  delete artists.dataValues.Songs;

  artists.dataValues.totalAlbums = artists.dataValues.Albums.length;
  delete artists.dataValues.Albums;

  return res.json(artists);
});

module.exports = router;
