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

// function to create new note and push to array
function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, 'Develop/db/db.json'),
        JSON.stringify({notes:notesArray}, null, 2)
    );
    return note;
}

// gives note an id, respinds with json of new note
app.post('/api/notes', (req, res) => {
    // sets id
    req.body.id = notes.length.toString();

    // validation
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted. Please make sure all fields are filled.');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(req.body); 
    }
});

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

// activates app
app.listen(PORT, () => {
    console.log('Your server is now active!')
})