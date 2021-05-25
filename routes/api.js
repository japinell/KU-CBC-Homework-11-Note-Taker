//
const JSON_DB = require("../db/db.json");
//
module.exports = (app) => {
  //
  // API routes
  //
  app.get("/api/notes", (req, res) => {
    //
    res.send(JSON_DB);
    //
  });
  //
  // app.post("/api/notes", (req, res) => {
  //   //
  //   return notesTable;
  //   //
  // });
  //
};
//
