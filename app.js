const nodemailer = require("nodemailer");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("views", __dirname + "/views");
app.engine("html", require("ejs").renderFile);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  return res.render("index.html");
});

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post("/send-mail", urlencodedParser, (req, res) => {
  const subject = req.body.subject;
  const body = `
Name: ${req.body.name},
Email: ${req.body.email},
Mobile Number: ${req.body.phone},
Subject: ${req.body.subject},
Message: ${req.body.message},
  `;

  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "4ece5dcc125c7f",
      pass: "e505948e23e2a0",
    },
  });

  message = {
    from: req.body.email,
    to: "kesavanmsd99@gmail.com",
    subject: subject,
    text: body,
  };

  transporter.sendMail(message, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
  return res.status(200).json({success: true});
});

app.get("/enquiry", (req, res) => {
  res.render("enquiry.html");
});

app.listen(PORT, () => {
  console.log("Server up and running at port " + PORT);
});
