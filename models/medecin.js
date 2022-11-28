const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('medecin', {
    matricule: {
      type: DataTypes.CHAR(12),
      allowNull: false,
      unique: "matricule"
    },
    specialite: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    cin: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      unique: "cin"
    },
    assurance: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id_user'
      }
    }
  }, {
    sequelize,
    tableName: 'medecin',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_user" },
        ]
      },
      {
        name: "matricule",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "matricule" },
        ]
      },
      {
        name: "cin",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cin" },
        ]
      },
    ]
  });
};
