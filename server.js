// create port, import express
const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();
const path = require('path');

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// static function
app.use(express.static('Develop/public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

// activates app
app.listen(PORT, () => {
    console.log('Your server is now active!')
})