const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dons', {
    id_dons: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    libele_dons: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    description_dons: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    photo_produit_dons: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    type_dons: {
      type: DataTypes.STRING(25),
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
    tableName: 'dons',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_dons" },
        ]
      },
      {
        name: "FKdons",
        using: "BTREE",
        fields: [
          { name: "id_compte" },
        ]
      },
    ]
  });
};
