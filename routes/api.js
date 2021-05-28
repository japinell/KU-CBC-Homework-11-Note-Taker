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
      //
      if (error != null) {
        reject(error);
        return;
      }
      //
      if (data) {
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
        return;
      }
      //
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
      if (data) {
        //
        notesTable.length = 0;
        //
        for (const note of data) {
          //
          notesTable.push(note);
          //
        }
        //
        res.send(notesTable);
        //
      }
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
    //
    res.json(true);
    //
  });
  //
};
//
