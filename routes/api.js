//
const JSON_DB = "./db/db.json";
const fs = require("fs");
const util = require("util");
const uniqid = require("uniqid");
const readFileAsync = util.promisify(fs.readFile); // ReadFile using promises instead of a callback function
const writeFileAsync = util.promisify(fs.writeFile); // WriteFile using promises instead of a callback function
const notesTable = [];
//
const readJsonDB = () => {
  //
  return new Promise((resolve, reject) => {
    //
    fs.readFile(JSON_DB, "utf8", (error, data) => {
      if (error != null) {
        reject(error);
        return;
      }
      resolve(data);
    });
    //
  });
};
//
// API routes
//
module.exports = (app) => {
  //
  //  Returns all notes
  //
  app.get("/api/notes", (req, res) => {
    //
    readJsonDB().then((data) => {
      //
      notesTable.push(data);
      res.send(notesTable);
      //
    });
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
    console.log(req.params);
    const searchId = req.params.id;
    //
    for (let i = 0, l = notesTable.length; i < l; i++) {
      //
      if (searchId === notesTable[i].id) {
        //
        notesTable.splice(i, 1);
        //
      }
      //
    }
    console.log(notesTable);
    res.json(true);
    //
  });
  //
};
//
