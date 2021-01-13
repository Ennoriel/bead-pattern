const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
var path = require('path');

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')));
app.get('/menu', (req, res) => res.sendFile(path.join(__dirname + '/menu.html')));

app.use('/public', express.static('public'));
app.use('/components', express.static('components'));
app.use('/script', express.static('script'));
app.use('/style', express.static('style'));

app.listen(port, () => {
	console.log('Server app listening on port ' + port);
});
