const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('emplois', {
    id_emploi: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    titre_emploi: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    descriptif_emploi: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    secteur: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    ref_emploi: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "ref_emploi"
    },
    date_expiration: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    id_compte: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'organisation',
        key: 'id_compte'
      }
    }
  }, {
    sequelize,
    tableName: 'emplois',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_emploi" },
        ]
      },
      {
        name: "ref_emploi",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ref_emploi" },
        ]
      },
      {
        name: "FKemploi",
        using: "BTREE",
        fields: [
          { name: "id_compte" },
        ]
      },
    ]
  });
};
