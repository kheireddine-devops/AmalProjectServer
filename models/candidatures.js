const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('candidatures', {
    id_emploi: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'emplois',
        key: 'id_emploi'
      }
    },
    id_compte: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'compte',
        key: 'id_compte'
      }
    },
    date_candidature: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    url_cv: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    niveau: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'candidatures',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_emploi" },
          { name: "id_compte" },
        ]
      },
      {
        name: "id_emploi",
        using: "BTREE",
        fields: [
          { name: "id_emploi" },
        ]
      },
      {
        name: "id_compte",
        using: "BTREE",
        fields: [
          { name: "id_compte" },
        ]
      },
    ]
  });
};
