// requires npms and port
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');
const fs = require('fs');
const { notes } = require('./Develop/db/db.json')
const uuid = require('uuid');
// const { runInNewContext } = require('vm');


// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// makes files static
app.use(express.static('public'));

// joins landing page to server
app.get('/', (req, res) =>  {
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'));
});

// joins notes page to server
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.send(notes)
});

getTitleInput = () => {

}

// creates a new note to array
app.post('/api/notes', (req, res) => {
    res.send(req.body);
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuid.v4()
    }

    if(!newNote.title || !newNote.text) {
        res.status(400).json({ msg: 'Please include a name and email'});
    } else {
        res.status(200).json()
    }

    notes.push(newNote);
});

// makes server listen
app.listen(PORT, () => {
    console.log('API server is now on port 3001!')
});
