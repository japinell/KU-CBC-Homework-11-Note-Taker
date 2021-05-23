//
// API routes
//
const notesData = () => {
  //
  return fetch("./db/db").then((res) => {
    //
    return res.json();
    //
  });
  //
};
//
module.exports = (app) => {
  //
  // API routes
  //
  app.get("/api/notes", (req, res) => {
    //
    return notesData;
    //
  });
  //
  app.post("/api/notes", (req, res) => {
    //
    return notesTable;
    //
  });
  //
};
//
