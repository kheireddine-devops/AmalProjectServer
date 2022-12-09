const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rapport', {
    id_rapport: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    prenom: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    mail: {
      type: DataTypes.STRING(320),
      allowNull: false
    },
    numTel: {
      type: DataTypes.STRING(8),
      allowNull: false
    },
    sujet: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'rapport',
    timestamps: false
  });
};
