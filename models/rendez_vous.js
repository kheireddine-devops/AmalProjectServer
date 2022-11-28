const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rendez_vous', {
    id_rendez_vous: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    date_rendez_vous: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    id_medecin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'medecin',
        key: 'id_user'
      }
    },
    id_beneficier: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'beneficier',
        key: 'id_user'
      }
    }
  }, {
    sequelize,
    tableName: 'rendez_vous',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_rendez_vous" },
        ]
      },
      {
        name: "FKrdvM",
        using: "BTREE",
        fields: [
          { name: "id_medecin" },
        ]
      },
      {
        name: "FKrdvB",
        using: "BTREE",
        fields: [
          { name: "id_beneficier" },
        ]
      },
    ]
  });
};
