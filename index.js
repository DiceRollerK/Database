//Ievietot datus
//const insert = db.prepare('INSERT INTO time (time_id, start_date, end_date) VALUES (?, ?, ?)');
//insert.run('2','1989-07-05 12:00:00.0000','1998-05-14 12:00:00.0000');

//Izvadīt datus
//console.log(db.prepare('SELECT * FROM time;').all());

import express from'express';
import path from'path';
const app = express();
const port = 3000;

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname,'static')));
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.post('/search', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    let searchSID;
    let searchTerm;
    if (req.query.showid) { 
        //console.log(db.prepare(`SELECT show_id FROM show WHERE name = '${req.query.showid}' LIMIT 1`).all()[0]);
        //console.log(req.query.showid)
        let a = decodeURIComponent(req.query.showid);
        console.log(`SELECT show_id FROM show WHERE name = '${a}' LIMIT 1`)
        searchSID = db.prepare(`SELECT show_id FROM show WHERE name = '${a}' LIMIT 1`).all()[0].show_id;
    }
    if (req.query.term) {
        searchTerm = req.query.term;
    }

    if (req.query.term) {
        if (searchTerm == '') {
            searchTerm = 'Pier Pressure'
        }
    }
    if (req.query.showid) {
        res.send(db.prepare(`SELECT *, e.name AS ename FROM episode AS e, show AS s, time, genre, theme, story 
        WHERE (s.show_id = e.id_show) AND (s.show_id = ${searchSID}) AND (time_id = id_time) AND (genre_id = id_genre) AND (story_id = id_story) AND (theme_id = id_theme)
        ORDER BY season ASC, episode ASC`).all());
    } else if (req.query.term) {
        res.send(db.prepare(`SELECT *, e.name AS ename FROM episode AS e, show AS s 
        WHERE (s.show_id = e.id_show) AND (ename LIKE '%${searchTerm}%' OR s.name LIKE '%${searchTerm}%');`).all());
    }
})

app.get('/clicked', (req, res) => {
    const click = {clickTime: new Date()};
    console.log(click);
    
    //let search = document.querySelector("#text-input").value
    //console.log(db.prepare(`SELECT *, e.name AS ename FROM episode AS e, show AS s WHERE s.show_id = e.id_show WHERE ename LIKE '%${search}%'`).all());
    res.send(db.prepare(`SELECT *, e.name AS ename FROM episode AS e, show AS s WHERE (s.show_id = e.id_show);`).all());
});

app.get('/show', (req, res) => {
    console.log(db.prepare(`SELECT * FROM show, time, genre, theme WHERE (time_id = id_time) AND (genre_id = id_genre) AND (theme_id = id_theme)`).all())
    res.send(db.prepare(`SELECT * FROM show, time, genre, theme WHERE (time_id = id_time) AND (genre_id = id_genre) AND (theme_id = id_theme)`).all());
});

import Database from 'better-sqlite3';
const db = new Database('./database/EpisodeDatabase.db');

console.log(db.prepare('SELECT * FROM show, theme, genre WHERE (theme_id = id_theme) AND (genre_id = id_genre)').all()[0]);

/*
function meklet(search_id) {

}
*/