const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('playlist', {
    id_playlist: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nom_playlist: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    date_create: {
      type: DataTypes.DATEONLY,
      allowNull: false

    },
    id_compte: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'compte',
        key: 'id_compte'
      }
    }
  }, {
    sequelize,
    tableName: 'playlist',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_playlist" },
        ]
      },
      {
        name: "FK_PLAYLIST_COMPTE",
        using: "BTREE",
        fields: [
          { name: "id_compte" },
        ]
      },
    ]
  });
};
