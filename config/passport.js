const {ExtractJwt, JwtStrategy} = require("passport-jwt");
const passport = require("passport");

const initModels = require("./../models/init-models");
const db = require("./../models/index");
const {Op} = require("sequelize");
const models = initModels(db.sequelize);

module.exports = (passport) => {
    const JwtStrategy = require('passport-jwt').Strategy;
    const ExtractJwt = require('passport-jwt').ExtractJwt;
    const opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.JWT_SECRET;

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        // console.log(jwt_payload)
        // const data = {
        //     _id: jwt_payload.sub,
        //     _role: jwt_payload.role
        // };
        // return done(null, data);

        const _id = jwt_payload.sub;
        if(_id !== undefined) {
            models.compte.findByPk(_id).then(result => {
                const user = {
                    id: result.id_compte,
                    role: result.role
                };
                return done(null, user);
            }).catch((error) => {
                return done(error, false);
            });
        }
    }));
}