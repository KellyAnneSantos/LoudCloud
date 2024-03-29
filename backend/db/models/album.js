"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Album.hasMany(models.Song, {
        foreignKey: "albumId",
        as: "Songs",
        onDelete: "CASCADE",
        hooks: true,
      });
      Album.belongsTo(models.User, {
        foreignKey: "userId",
        as: "Artist",
      });
    }
  }
  Album.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [1, 60],
        },
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [1, 256],
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Album",
    }
  );
  return Album;
};
