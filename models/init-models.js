var DataTypes = require("sequelize").DataTypes;
var _admin = require("./admin");
var _avis = require("./avis");
var _beneficier = require("./beneficier");
var _benevole = require("./benevole");
var _candidatures = require("./candidatures");
var _commentaireaide = require("./commentaireaide");
var _compte = require("./compte");
var _demandeaide = require("./demandeaide");
var _dons = require("./dons");
var _emplois = require("./emplois");
var _formation = require("./formation");
var _medecin = require("./medecin");
var _organisation = require("./organisation");
var _playlist = require("./playlist");
var _produit = require("./produit");
var _rapport = require("./rapport");
var _rendez_vous = require("./rendez_vous");
var _user = require("./user");
var _video = require("./video");

function initModels(sequelize) {
  var admin = _admin(sequelize, DataTypes);
  var avis = _avis(sequelize, DataTypes);
  var beneficier = _beneficier(sequelize, DataTypes);
  var benevole = _benevole(sequelize, DataTypes);
  var candidatures = _candidatures(sequelize, DataTypes);
  var commentaireaide = _commentaireaide(sequelize, DataTypes);
  var compte = _compte(sequelize, DataTypes);
  var demandeaide = _demandeaide(sequelize, DataTypes);
  var dons = _dons(sequelize, DataTypes);
  var emplois = _emplois(sequelize, DataTypes);
  var formation = _formation(sequelize, DataTypes);
  var medecin = _medecin(sequelize, DataTypes);
  var organisation = _organisation(sequelize, DataTypes);
  var playlist = _playlist(sequelize, DataTypes);
  var produit = _produit(sequelize, DataTypes);
  var rapport = _rapport(sequelize, DataTypes);
  var rendez_vous = _rendez_vous(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var video = _video(sequelize, DataTypes);

  compte.belongsToMany(emplois, { as: 'id_emploi_emplois', through: candidatures, foreignKey: "id_compte", otherKey: "id_emploi" });
  emplois.belongsToMany(compte, { as: 'id_compte_comptes', through: candidatures, foreignKey: "id_emploi", otherKey: "id_compte" });
  demandeaide.belongsTo(beneficier, { as: "id_user_beneficier", foreignKey: "id_user"});
  beneficier.hasMany(demandeaide, { as: "demandeaides", foreignKey: "id_user"});
  rendez_vous.belongsTo(beneficier, { as: "id_beneficier_beneficier", foreignKey: "id_beneficier"});
  beneficier.hasMany(rendez_vous, { as: "rendez_vous", foreignKey: "id_beneficier"});
  avis.belongsTo(compte, { as: "id_compte_compte", foreignKey: "id_compte"});
  compte.hasMany(avis, { as: "avis", foreignKey: "id_compte"});
  candidatures.belongsTo(compte, { as: "id_compte_compte", foreignKey: "id_compte"});
  compte.hasMany(candidatures, { as: "candidatures", foreignKey: "id_compte"});
  dons.belongsTo(compte, { as: "id_compte_compte", foreignKey: "id_compte"});
  compte.hasMany(dons, { as: "dons", foreignKey: "id_compte"});
  formation.belongsTo(compte, { as: "id_compte_compte", foreignKey: "id_compte"});
  compte.hasMany(formation, { as: "formations", foreignKey: "id_compte"});
  organisation.belongsTo(compte, { as: "id_compte_compte", foreignKey: "id_compte"});
  compte.hasOne(organisation, { as: "organisation", foreignKey: "id_compte"});
  playlist.belongsTo(compte, { as: "id_compte_compte", foreignKey: "id_compte"});
  compte.hasMany(playlist, { as: "playlists", foreignKey: "id_compte"});
  user.belongsTo(compte, { as: "id_user_compte", foreignKey: "id_user"});
  compte.hasOne(user, { as: "user", foreignKey: "id_user"});
  commentaireaide.belongsTo(demandeaide, { as: "idDemandeAide_demandeaide", foreignKey: "idDemandeAide"});
  demandeaide.hasMany(commentaireaide, { as: "commentaireaides", foreignKey: "idDemandeAide"});
  candidatures.belongsTo(emplois, { as: "id_emploi_emploi", foreignKey: "id_emploi"});
  emplois.hasMany(candidatures, { as: "candidatures", foreignKey: "id_emploi"});
  rendez_vous.belongsTo(medecin, { as: "id_medecin_medecin", foreignKey: "id_medecin"});
  medecin.hasMany(rendez_vous, { as: "rendez_vous", foreignKey: "id_medecin"});
  emplois.belongsTo(organisation, { as: "id_compte_organisation", foreignKey: "id_compte"});
  organisation.hasMany(emplois, { as: "emplois", foreignKey: "id_compte"});
  video.belongsTo(playlist, { as: "id_playlist_playlist", foreignKey: "id_playlist"});
  playlist.hasMany(video, { as: "videos", foreignKey: "id_playlist"});
  avis.belongsTo(produit, { as: "id_produit_produit", foreignKey: "id_produit"});
  produit.hasMany(avis, { as: "avis", foreignKey: "id_produit"});
  admin.belongsTo(user, { as: "id_user_user", foreignKey: "id_user"});
  user.hasOne(admin, { as: "admin", foreignKey: "id_user"});
  beneficier.belongsTo(user, { as: "id_user_user", foreignKey: "id_user"});
  user.hasOne(beneficier, { as: "beneficier", foreignKey: "id_user"});
  benevole.belongsTo(user, { as: "id_user_user", foreignKey: "id_user"});
  user.hasOne(benevole, { as: "benevole", foreignKey: "id_user"});
  medecin.belongsTo(user, { as: "id_user_user", foreignKey: "id_user"});
  user.hasOne(medecin, { as: "medecin", foreignKey: "id_user"});

  return {
    admin,
    avis,
    beneficier,
    benevole,
    candidatures,
    commentaireaide,
    compte,
    demandeaide,
    dons,
    emplois,
    formation,
    medecin,
    organisation,
    playlist,
    produit,
    rapport,
    rendez_vous,
    user,
    video,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
