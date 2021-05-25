//
const notesTable = require("../db/db.json");
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
  //  Searchs and returns notes which title or text match the parameter "id"
  //
  app.get("/api/notes/:id", (req, res) => {
    //
    const searchNote = req.params.id;
    const foundNotes = notesTable.filter(
      (note) => note.title === searchNote || note.text === searchNote
    );
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
    //
    notesTable.push(note);
    //
    res.json(true);
    //
  });
  //
  //  Deletes the notes which title or text match the parameter "id"
  //
  app.delete("/api/notes/:id", (req, res) => {
    //
    const searchNote = req.params.id;
    const foundNotes = notesTable.filter((note) => note === searchNote);
    //
    // foundNotes.forEach((note) => notesTable);
    //
    res.json(true);
    //
  });
  //
};
//
