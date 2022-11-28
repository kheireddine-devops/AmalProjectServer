const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('video', {
    id_video: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    url: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    titre: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    id_playlist: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'playlist',
        key: 'id_playlist'
      }
    }
  }, {
    sequelize,
    tableName: 'video',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_video" },
        ]
      },
      {
        name: "FK_VIDEO_PLAYIST",
        using: "BTREE",
        fields: [
          { name: "id_playlist" },
        ]
      },
    ]
  });
};
