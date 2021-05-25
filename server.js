//
// Dependencies
//
const express = require("express");
//
// Set up
//
const app = express();
const PORT = process.env.PORT || 8080;
//
// Data parsing handling
//
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(express.static("public"));
//
// Application routes
//
require("./routes/api")(app);
require("./routes/html")(app);
//
// Rock & Roll
//
app.listen(PORT, () => {
  console.log(`Application listening on PORT: ${PORT}`);
});
//
