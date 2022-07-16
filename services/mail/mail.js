
require('dotenv').config({ path: './../../.env' })
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');
 

var readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};

smtpTransport = nodemailer.createTransport(smtpTransport({
    host: 'smtp.zoho.in',
      port: '587',
      secure: false,
      auth: {
        user: 'dsf',
        pass: 'dfsfs'
      }
}));

/**  TODO: GO WITH ENV VARIABLES

smtpTransport = nodemailer.createTransport(smtpTransport({
    host: process.env.MAIL_HOST,
    secure: process.env.MAIL_SECURE,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
})); */


/** SENDING MAIL USING NODE MAILER WITH DIFFERENT TEMPLATES */
 exports.sendMail = async (name,email) => {
    var user_email = email;
    var user_name = name;
    try{
    readHTMLFile('./services/mail/template/yout.html', function(err, html) {
        var template = handlebars.compile(html);
        var replacements = {
             username: user_name,
             email: user_email
        };
        var htmlToSend = template(replacements);
        var mailOptions = {
            from: 'fdsf',
            to : user_email,
            subject : 'Verification mail',
            html : htmlToSend
         };
         smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
                // callback(error);
            }
        });
    });
    }catch(err){
        console.log(err);
    }   
 } 

