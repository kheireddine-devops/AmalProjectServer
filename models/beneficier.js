const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('beneficier', {
    carte_handicap: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      unique: "carte_handicap"
    },
    date_expiration: {
      type: DataTypes.DATEONLY,
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
    tableName: 'beneficier',
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
        name: "carte_handicap",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "carte_handicap" },
        ]
      },
    ]
  });
};
