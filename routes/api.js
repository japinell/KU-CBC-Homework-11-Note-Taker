//
// Libraries
//
const fs = require("fs");
const util = require("util");
const uniqid = require("uniqid");
//
const readFileAsync = util.promisify(fs.readFile); // ReadFile using promises instead of a callback function
const writeFileAsync = util.promisify(fs.writeFile); // WriteFile using promises instead of a callback function
//
const JSON_DB = "./db/db.json";
const notesTable = [];
//
const readJsonDB = () => {
  //
  return new Promise((resolve, reject) => {
    //
    fs.readFile(JSON_DB, "utf8", (error, data) => {
      //
      if (error != null) {
        //
        reject(error);
        //
      } else if (data) {
        //
        resolve(JSON.parse(data));
        //
      }
    });
    //
  });
};
//
const writeJsonDB = () => {
  //
  return new Promise((resolve, reject) => {
    //
    fs.writeFile(JSON_DB, JSON.stringify(notesTable), "utf8", (error) => {
      //
      if (error != null) {
        reject(error);
      }
      //
    });
    //
  });
};
//
//  Add the "remove" method to the Array object
//
Array.prototype.remove = function (value) {
  //
  //  Search for id equals value within the current array
  //
  const index = this.findIndex((obj) => obj.id.localeCompare(value) === 0);
  //
  //  Return the current array minus the item to remove
  //
  return index >= 0
    ? [...this.slice(0, index), ...this.slice(index + 1)]
    : this;
  //
};
//
// API routes
//
module.exports = (app) => {
  //
  //  Return all notes
  //
  app.get("/api/notes", (req, res) => {
    //
    readJsonDB().then((data) => {
      //
      if (data) {
        //
        //  Clear the notesTable array
        //
        notesTable.length = 0;
        //
        //  And then load it with the notes from the data object
        //
        for (const note of data) {
          //
          notesTable.push(note);
          //
        }
        //
        //  Return the notesTable array
        //
        res.send(notesTable);
        //
      }
      //
    });
    //
  });
  //
  //  Search for a note
  //
  app.get("/api/notes/:id", (req, res) => {
    //
    //  Return the note which id matches the parameter "id"
    //
    const searchId = req.params.id;
    const foundNotes = notesTable.filter((note) => note.id === searchId);
    //
    res.send(foundNotes);
    //
  });
  //
  //  Insert a note
  //
  app.post("/api/notes", (req, res) => {
    //
    const note = req.body;
    //
    //  Push the note to the notesTable array
    //
    note.id = uniqid();
    notesTable.push(note);
    //
    //  Save the notesTable array to file
    //
    writeJsonDB().then((err) => {
      //
      if (err) {
        //
        console.log(`Error: ${err}`);
        //
      } else {
        //
        console.log(`Data written to ${JSON_DB} file`);
        //
      }
      //
    });
    //
    res.json(true);
    //
  });
  //
  //  Remove a note
  //
  app.delete("/api/notes/:id", (req, res) => {
    //
    //  Remove the note which id matches the parameter "id"
    //
    const searchId = req.params.id;
    const newNotesTable = notesTable.remove(searchId);
    //
    //  Clear the notesTable array
    //
    notesTable.length = 0;
    //
    //  And then load it with the notes from the newNotesTable array
    //
    for (const note of newNotesTable) {
      //
      notesTable.push(note);
      //
    }
    //
    //  Save the notesTable array to file
    //
    writeJsonDB().then((err) => {
      //
      if (err) {
        //
        console.log(`Error: ${err}`);
        //
      } else {
        //
        console.log(`${searchId} deleted from ${JSON_DB} file`);
        //
      }
      //
    });
    //
    res.json(true);
    //
  });
  //
};
//
