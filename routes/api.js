//
const notesTable = require("../db/db.json");
const uniqid = require("uniqid");
//
// API routes
//
module.exports = (app) => {
  //
  //  Returns all notes
  //
  app.get("/api/notes", (req, res) => {
    //
    res.send(notesTable);
    //
  });
  //
  //  Searches and returns notes which id matches the parameter "id"
  //
  app.get("/api/notes/:id", (req, res) => {
    //
    const searchId = req.params.id;
    const foundNotes = notesTable.filter((note) => note.id === searchId);
    //
    res.send(foundNotes);
    //
  });
  //
  //  Inserts a note
  //
  app.post("/api/notes", (req, res) => {
    //
    const note = req.body;
    const id = uniqid();
    //
    note.id = id;
    notesTable.push(note);
    //
    console.log(notesTable);
    res.json(true);
    //
  });
  //
  //  Deletes notes which id matches the parameter "id"
  //
  app.delete("/api/notes/:id", (req, res) => {
    //
    const searchId = req.params.id;
    const foundNotes = notesTable.filter((note) => note.id === searchId);
    //
    //foundNotes.forEach((note) => notesTable);
    //
    res.json(true);
    //
  });
  //
};
//
