//
// Libraries
//
const path = require("path");
//
// HTML routes
//
module.exports = (app) => {
  //
  //  Return the notes.html file
  //
  app.get("/notes", (req, res) => {
    //
    res.sendFile(path.join(__dirname, "../public/notes.html"));
    //
  });
  //
  //  Return the index.html file
  //
  app.get("*", (req, res) => {
    //
    res.sendFile(path.join(__dirname, "../public/index.html"));
    //
  });
  //
};
//
