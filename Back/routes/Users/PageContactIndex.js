const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post('/api/v1', function(req, res) {
  let data = req.body;

  let smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  let mailOptions = {
    from: data.email,
    to: process.env.EMAIL_ADDRESS,
    subject: 'client Contact Myflash.fr',
    html: `<p>${data.name}</p>
          <p>${data.email}</p>
          <p>${data.message}</p>`
  };

  smtpTransport.sendMail(mailOptions,
    (error, response) => {
      if (error) {
        res.send(error)
      } else {
        res.send('Success')
      }
      smtpTransport.close();
    });

})

module.exports = router;