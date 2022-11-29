const passport = require("passport");

const IsAuth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            res.status(401).send("You are not authorized to access this area");
        } else {
            req.user = user;
            return next();
        }
    })(req, res, next);
};

const hasRoleDoctor = (req, res, next) => {
    if(req.user !== undefined && req.user.role === "ROLE_DOCTOR") {
        next();
    } else {
        res.status(401).send("PERMISSIONS_ONLY_HAS_ROLE_DOCTOR");
    }
}

const hasRoleAdmin = (req, res, next) => {
    if(req.user !== undefined && req.user.role === "ROLE_ADMIN") {
        next();
    } else {
        res.status(401).send("PERMISSIONS_ONLY_HAS_ROLE_ADMIN");
    }
}

const hasRoleBenevole = (req, res, next) => {
    if(req.user !== undefined && req.user.role === "ROLE_BENEVOLE") {
        next();
    } else {
        res.status(401).send("PERMISSIONS_ONLY_HAS_ROLE_BENEVOLE");
    }
}

const hasRoleOrganization = (req, res, next) => {
    if(req.user !== undefined && req.user.role === "ROLE_ORGANIZATION") {
        next();
    } else {
        res.status(401).send("PERMISSIONS_ONLY_HAS_ROLE_ORGANIZATION");
    }
}

const hasRoleBeneficier = (req, res, next) => {
    if(req.user !== undefined && req.user.role === "ROLE_BENEFICIER") {
        next();
    } else {
        res.status(401).send("PERMISSIONS_ONLY_HAS_ROLE_BENEFICIER");
    }
}

module.exports = {
    IsAuth,
    hasRoleDoctor,
    hasRoleBenevole,
    hasRoleOrganization,
    hasRoleBeneficier,
    hasRoleAdmin
};