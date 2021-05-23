//
// Dependencies
//
const path = require("path");
//
// HTML routes
//
module.exports = (app) => {
  //
  app.get("/notes", (req, res) => {
    //
    return res.sendFile(path.join(__dirname, "../public/notes.html"));
    //
  });
  //
  app.get("*", (req, res) => {
    //
    return res.sendFile(path.join(__dirname, "../public/index.html"));
    //
  });
  //
};
//
