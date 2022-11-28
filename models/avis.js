const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('avis', {
    id_avis: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    text: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    dateA: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    id_produit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'produit',
        key: 'id_produit'
      }
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
    tableName: 'avis',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_avis" },
        ]
      },
      {
        name: "FK_AVIS_COMPTE",
        using: "BTREE",
        fields: [
          { name: "id_compte" },
        ]
      },
      {
        name: "FK_AVIS_PRODUIT",
        using: "BTREE",
        fields: [
          { name: "id_produit" },
        ]
      },
    ]
  });
};
