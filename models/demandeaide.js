const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('demandeaide', {
    id_demande_aide: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    contenue: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    date_publication: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    sujet: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'beneficier',
        key: 'id_user'
      }
    },
    typeDemande: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    nombre: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Status: {
      type: DataTypes.STRING(15),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'demandeaide',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_demande_aide" },
        ]
      },
      {
        name: "FKaide",
        using: "BTREE",
        fields: [
          { name: "id_user" },
        ]
      },
    ]
  });
};
