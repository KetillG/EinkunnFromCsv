var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cons = require('consolidate');
var fs = require('fs');
var nodemailer = require('nodemailer');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// Reads data from auth.txt
var authData = fs.readFileSync("./auth.txt", "utf-8").split(',');

// Sets up transponder to send email
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: authData[0],
    pass: authData[1],
  }
});

// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// When the html posts the data it sends the emails
app.post('/files', function(req, res) {
  var text = req.body.text;
  var factorText = req.body.factorText;
  var factorNum = req.body.factorNum;
  var assid = req.body.assid;
  var sendMail = req.body.sendMail;
  console.log(sendMail);

  var textArray = text.split('\n');
  console.log(req.body);
  // Creates the text file for each user
  for(var i = 0; i < textArray.length; i++) {
    var thisText = textArray[i].split(";");
    if(thisText[0] === '') break;
    var genText = 'Vefforritun	Verkefni ' + assid + "\r\n";
    genText += " " + "\r\n";

    genText += "Upplýsingar um einkunnagjöf:" + "\r\n";
    for(var j = 0; j < factorText.length; j++) {
      genText += factorText[j] + ": " + factorNum[j] + "%" + "\r\n";
    }
    genText += "Alls: 100.00%" + "\r\n";
    genText += " " + "\r\n";
    genText += "====================== ÞÍNAR EINKUNNIR ======================" + "\r\n";
    genText += "Nemandi: " + thisText[0] + "\r\n";
    for(var j = 0; j < factorText.length; j++) {
      genText += factorText[j] + ": " + thisText[j+1] + "%" + "\r\n";
    }
    genText += "Alls: " + thisText[thisText.length-2] + "%" + "\r\n";
    genText += " "+ "\r\n";

    genText += "Einkunn: "+ thisText[thisText.length-2] * 1 / 10 + "\r\n";

    genText += "===================== ATHUGASEMDIR ===========================" + "\r\n";
    genText += " "+ "\r\n";
    genText += thisText[thisText.length-1];
    genText += " "+ "\r\n";
    genText += "==============================================================" + "\r\n";

    genText += "emailið er auto-generatað."+ "\r\n";
    console.log(4);
    // Save the text file locally
    fs.writeFile("./out/" + thisText[0] + ".txt", genText, 'utf8', function(err) {
      if(err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
    console.log(5);
    // mail functionality
    if(sendMail) {
      // Set up the mail options
      var mailOptions = {
        from: authData[2] ? authData[2] : authData[0] + '@gmail.com',
        to: thisText[0] + "@hi.is",
        subject: 'Verkefni' + assid,
        text: 'Sjá fylgiskjal',
        attachments: [
          {
              filename: thisText[0] + '.txt',
              path: './out/' + thisText[0] + '.txt'
          },
        ]
      };
      // Send the mail
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }
  }
  res.send('done');
});

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => {
  console.log('server up');
});

module.exports = app;
