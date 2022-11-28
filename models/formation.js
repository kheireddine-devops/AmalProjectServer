const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('formation', {
    id_formation: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    theme: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    descriptif: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    date_debut: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    dateFin: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Nbr_jours: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Nbr_personnes: {
      type: DataTypes.INTEGER,
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
    tableName: 'formation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_formation" },
        ]
      },
      {
        name: "FKformation",
        using: "BTREE",
        fields: [
          { name: "id_compte" },
        ]
      },
    ]
  });
};
