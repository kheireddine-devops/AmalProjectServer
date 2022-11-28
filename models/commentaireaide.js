const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('commentaireaide', {
    idCommentaire: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    txtCommentaire: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    dateCommentaire: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    idCompte: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idDemandeAide: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'demandeaide',
        key: 'id_demande_aide'
      }
    },
    like: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(15),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'commentaireaide',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idCommentaire" },
        ]
      },
      {
        name: "FKcommentaireAide",
        using: "BTREE",
        fields: [
          { name: "idDemandeAide" },
        ]
      },
    ]
  });
};
