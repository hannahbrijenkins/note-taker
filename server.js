// create port, import express, path, uuid
const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();
const path = require('path');
const uuid = require('uuid');
const { notes } = require('./Develop/db/db.json');
const fs = require('fs');

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// static function to get bootstrap and jquery
app.use(express.static('Develop/public'));

// recieves index.html file + notes.html to server
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

// get api
app.get('/api/notes', (req, res) =>{
    res.json(notes);
})


function createNewNote(body, notesArray) {
    const notes = body;
    notesArray.push(notes);
    fs.writeFileSync(
        patj.join(__dirname, './Develop/db/db.json'),
        JSON.stringify({ notes: notesArray}, null, 2)
    );
    return notes;
}

// creates a new task
app.post('/api/notes', (req, res) => {
    const notes = createNewNote(req.body, notes);
    req.body.id = notes.length.toString();
    
    res.json(req.body); 
});

// activates app
app.listen(PORT, () => {
    console.log('Your server is now active!')
})