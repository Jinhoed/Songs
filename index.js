const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Sample data for 5 songs
const songs = [
    { song: "I love you", artist: "Juice WRLD", genre: "Rap", link: "https://youtu.be/lzG91CHPz-A?list=RDISIVPjIm_v4" },
    { song: "Drugs And Love", artist: "Juice WRLD", genre: "Rap", link: "https://youtu.be/ISIVPjIm_v4" },
    { song: "Tears", artist: "Juice WRLD", genre: "Rap", link: "https://youtu.be/3ID8O5kJynA" },
    { song: "Wasted", artist: "Juice WRLD", genre: "Rap", link: "https://youtu.be/6n4wt6gj7pA?list=RDISIVPjIm_v4" },
    { song: "Blueberry Faygo", artist: "Lil Mosey", genre: "Rap", link: "https://youtu.be/V_jHc_n0p9c?list=RDISIVPjIm_v4" }
];

// Get all songs
app.get('/songs', (req, res) => {
    res.json(songs);
});

// Get a specific song by index
app.get('/songs/:index', (req, res) => {
    const index = req.params.index;
    if (index >= 0 && index < songs.length) {
        res.json(songs[index]);
    } else {
        res.status(404).send('Song not found');
    }
});

// Create a new song
app.post('/songs', (req, res) => {
    const data = req.body;
    if (data.song && data.artist && data.genre && data.link) {
        songs.push(data);
        res.status(201).send('Song created');
    } else {
        res.status(400).send('Incomplete data');
    }
});

// Update a song by index
app.put('/songs/:index', (req, res) => {
    const index = req.params.index;
    if (index >= 0 && index < songs.length) {
        const data = req.body;
        if (data.song && data.artist && data.genre && data.link) {
            songs[index] = data;
            res.send('Song updated');
        } else {
            res.status(400).send('Incomplete data');
        }
    } else {
        res.status(404).send('Song not found');
    }
});

// Delete a song by index
app.delete('/songs/:index', (req, res) => {
    const index = req.params.index;
    if (index >= 0 && index < songs.length) {
        songs.splice(index, 1);
        res.status(204).send('Song deleted');
    } else {
        res.status(404).send('Song not found');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});