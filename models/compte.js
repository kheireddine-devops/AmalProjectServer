const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('compte', {
    id_compte: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: "login"
    },
    password: {
      type: DataTypes.CHAR(65),
      allowNull: false
    },
    role: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    temp_reset_password: {
      type: DataTypes.CHAR(65),
      allowNull: true
    },
    temp_validate_mail: {
      type: DataTypes.CHAR(6),
      allowNull: true
    },
    temp_validate_phone: {
      type: DataTypes.CHAR(6),
      allowNull: true
    },
    phone: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      unique: "phone"
    },
    email: {
      type: DataTypes.STRING(320),
      allowNull: false,
      unique: "email"
    },
    photo: {
      type: DataTypes.CHAR(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'compte',
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
        name: "login",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
        ]
      },
      {
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "phone",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "phone" },
        ]
      },
    ]
  });
};
