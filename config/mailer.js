const nodemailer = require('nodemailer');
  
  // create reusable transporter object using the default SMTP transport
  exports.transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'thegamestarts20013@gmail.com', // generated ethereal user
      pass: 'cxhilhhlofawygzt', // generated ethereal password
    },
  });