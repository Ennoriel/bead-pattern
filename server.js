const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
var path = require('path');

//  app.get("/favicon.ico", function(req, res) {
//      console.log('!!')
//   res.statusCode = 200;
// //   res.setHeader('Content-Length', 325);
//   res.setHeader('Content-Type', 'image/x-icon');
// //   res.setHeader("Cache-Control", "public, max-age=2592000"); // expiers after a month
// //   res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
// console.log(path.join(__dirname + '/public/lang/fr.svg'))
//   res.sendFile(path.join(__dirname + '/public/favicon.svg'));
//  });



app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')));
// app.use('/favicon.svg', express.static('/public/favicon.svg'));
app.use('/public', express.static('public'));
app.use('/script', express.static('script'));
app.use('/style', express.static('style'));

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});