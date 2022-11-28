const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('produit', {
    id_produit: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    libelleP: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    prixP: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    descriptionP: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    photoP: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    numVendeur: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cathegorie: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    dateP: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    id_beneficier: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'produit',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_produit" },
        ]
      },
      {
        name: "FK_STOREP_BENEFICIER",
        using: "BTREE",
        fields: [
          { name: "id_beneficier" },
        ]
      },
    ]
  });
};
