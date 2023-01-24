const express = require("express");
const app = express();
const uuid = require("uuid");
const notes = require("./db/db.json");
const fs = require("fs")
const path = require("path");
const PORT = 3001;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//API Routing
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"))
});


//Post function to add notes to db.json file
app.post("/api/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const newNotes = req.body;
    newNotes.id = uuid.v4();
    notes.push(newNotes);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes);
})


//call for homepage
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
})



//starting the listen
app.listen(PORT, () => console.log('Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT));