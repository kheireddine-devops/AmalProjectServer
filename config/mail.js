const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

//mzxzsyzthixlzpwa coiebhbrufhqgmoh
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'mkd.dev.ops@gmail.com',
        pass: 'kdjazzkaanikfapf'
    }
});

module.exports = transporter;