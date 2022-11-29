const initModels = require("./../models/init-models");
const db = require("./../models/index");
const {Op} = require("sequelize");
const models = initModels(db.sequelize);

const { createHash } = require('node:crypto');
const JWT = require("jsonwebtoken");


const login =  (req,res,next) => {
    const _username = req.body.username;
    const _password = req.body.password;

    if(_username !== undefined && _password !== undefined) {
        const query = {};
        query.username = { [Op.eq] : _username };
        query.password = { [Op.eq] : crypt(_password) };

        console.log(_username,_password);

        models.compte.findAll({
            where: query
        })
            .then(result => {
                if(result.length === 1) {
                    const _expire = process.env.JWT_EXPIRATION;
                    const _secret = process.env.JWT_SECRET;
                    console.log(_secret,_expire);
                    const jwt = JWT.sign({
                        sub: result[0]["id_compte"],
                        user: result[0]["login"],
                        role: result[0]["role"]
                        // data: {
                        //     username: result[0]["login"],
                        //     accountId: result[0]["id_compte"]
                        // }
                    },_secret, {
                        expiresIn: _expire
                    });

                    console.log("*".repeat(100));
                    console.log(JWT.decode(jwt));
                    console.log("*".repeat(100));

                    res.status(200).send({valid: true, token: jwt });
                } else {
                    res.status(404).send({ valid: false, data: "Invalid Username or Password"});
                }
            }).catch((error) => {
            res.status(500).send(error);
        });
    } else {
        res.status(401).send({valid: false, data: "Please enter the required username and password!"});
    }
}

const getAllAccounts = (req,res,next) => {
    models.compte.findAll({
        include: ["user", "organisation"]
    })
        .then(result => {
            res.status(200).send(result);
        }).catch((error) => {
        res.status(500).send(error);
    });
};

const crypt = (content) => {
    return createHash('sha256').update(content).digest('hex')
}

module.exports = {
    login,
    getAllAccounts
}
