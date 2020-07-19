const nodemailer = require("nodemailer");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
require('dotenv').config();

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.json());
app.use(cors());
// app.use(bodyParser.json({limit: "50mb"}));
// app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.post('/sendFormData', (req, res) => {
    debugger;
  console.log(req.body, 'data of form');
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: 'true',
    port: '465',
    auth: {
      user: process.env.EMAIL_USER, // must be Gmail
      pass: process.env.EMAIL_PASSWORD
    }
  });

  var mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_SEND_TO, // must be Gmail
    bcc: process.env.EMAIL_BCC,
    //cc:`${req.body.name} <${req.body.email}>`,
    subject: 'New LDB User Application Request',
    html: `
    <!DOCTYPE html>
    <html style="margin: 0;padding: 0;">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>LDB Application Form</title>
    </head>
    <body style="background-color: #F4F4F4;margin: 0;padding: 0;font-size: 0;line-height: 0;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
        <center>    
          <table class="container600" cellpadding="0" cellspacing="0" border="0" width="100%" style="width: calc(100%);max-width: calc(600px);margin: 0 auto;padding: 0;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
            <tr style="margin: 0;padding: 0;">
              <td width="100%" style="text-align: left;margin: 0;padding: 0;border-collapse: collapse;">    
                    <table width="100%" cellpadding="0" cellspacing="0" style="min-width: 100%;margin: 0;padding: 0;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                      <tr style="margin: 0;padding: 0;">
                        <td style="background-color: #0d5eaf;color: #000000;padding: 30px;text-align: center;margin: 0;border-collapse: collapse;">
                        <h2 style="margin: 0;padding: 0;font-family: Arial;font-size: 24px;line-height: 28px; color: #ffffff;"><b>LDBPOLSKA</b></h2>
                        </td>
                      </tr>
                    </table>
                    <table width="100%" cellpadding="0" cellspacing="0" style="min-width: 100%;margin: 0;padding: 0;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                      
                      <tr style="margin: 0;padding: 0;">
                        <td style="padding: 20px;background-color: #ffffff;margin: 0;border-collapse: collapse;">
    
                            <table class="smarttable" width="100%" cellpadding="0" cellspacing="0" style="min-width: 100%;margin: 0;padding: 0;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                             
                              <tbody style="margin: 0;padding: 0;">
                                <tr style="margin: 0;padding: 0;">
                                  <td valign="top" style="text-align: left;padding: 5px;font-family: Arial,sans-serif;font-size: 12px;line-height: 20px;margin: 0;border-collapse: collapse;">First name</td>
                                  <td data-label="First name" valign="top" style="padding: 5px;font-family: Arial,sans-serif;font-size: 12px;line-height: 20px;margin: 0;border-collapse: collapse;">${req.body.firstName}</td>
                                </tr>  
                                <tr style="margin: 0;padding: 0;">
                                  <td valign="top" style="text-align: left;padding: 5px;font-family: Arial,sans-serif;font-size: 12px;line-height: 20px;margin: 0;border-collapse: collapse;">Last name</td>
                                  <td data-label="Last name" valign="top" style="padding: 5px;font-family: Arial,sans-serif;font-size: 12px;line-height: 20px;margin: 0;border-collapse: collapse;">${req.body.lastName}</td>
                                  </tr>  
                                  <tr style="margin: 0;padding: 0;">
                                  <td valign="top" style="text-align: left;padding: 5px;font-family: Arial,sans-serif;font-size: 12px;line-height: 20px;margin: 0;border-collapse: collapse;">Email</td>
                                  <td data-label="Email" valign="top" style="padding: 5px;font-family: Arial,sans-serif;font-size: 12px;line-height: 20px;margin: 0;border-collapse: collapse;">${req.body.userEmail}</td>
                                </tr>
                                <tr style="margin: 0;padding: 0;">
                                <td valign="top" style="text-align: left;padding: 5px;font-family: Arial,sans-serif;font-size: 12px;line-height: 20px;margin: 0;border-collapse: collapse;">Pesel or Passport no.</td>
                                  <td data-label="Pesel or Passport" valign="top" style="padding: 5px;font-family: Arial,sans-serif;font-size: 12px;line-height: 20px;margin: 0;border-collapse: collapse;">${req.body.userPeselorPassport}</td>
                                  </tr>   
                                  <tr style="margin: 0;padding: 0;">
                                  <td valign="top" style="text-align: left;padding: 5px;font-family: Arial,sans-serif;font-size: 12px;line-height: 20px;margin: 0;border-collapse: collapse;">Address</td>
                                  <td data-label="Address" valign="top" style="padding: 5px;font-family: Arial,sans-serif;font-size: 12px;line-height: 20px;margin: 0;border-collapse: collapse;">${req.body.address.inputAddress}<br>
                      ${req.body.address.inputAddress2}<br>
                      ${req.body.address.inputCity}, ${req.body.address.inputState}, ${req.body.address.inputZip}<br>
                      ${req.body.address.inputCountry} </td>
                      </tr>
                      <tr style="margin: 0;padding: 0;">
                      <td valign="top" style="text-align: left;padding: 5px;font-family: Arial,sans-serif;font-size: 12px;line-height: 20px;margin: 0;border-collapse: collapse;">Phone</td>
                                  <td data-label="Phone" valign="top" style="padding: 5px;font-family: Arial,sans-serif;font-size: 12px;line-height: 20px;margin: 0;border-collapse: collapse;">${req.body.address.inputPhone}</td>
                                </tr>
                               
                              </tbody>
                            </table>
    
                        </td>
                      </tr>
                    </table>
                   
                  </td>
            </tr>
        </table>
    
     
        </center>
    </body>
    </html>
          `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({
        message: 'successfuly sent!'
      })
    }
  });

});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("server run!!!");
});