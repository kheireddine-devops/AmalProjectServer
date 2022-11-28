const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('organisation', {
    matricule_fiscale: {
      type: DataTypes.CHAR(17),
      allowNull: false,
      unique: "matricule_fiscale"
    },
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    forme_juridique: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    adresse: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    id_compte: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'compte',
        key: 'id_compte'
      }
    }
  }, {
    sequelize,
    tableName: 'organisation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_compte" },
        ]
      },
      {
        name: "matricule_fiscale",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "matricule_fiscale" },
        ]
      },
    ]
  });
};
