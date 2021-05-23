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
//
// Application routes
//
require("./routes/html")(app);
require("./routes/api")(app);
//
// Rock & Roll
//
app.listen(PORT, () => {
  console.log(`Application listening on PORT: ${PORT}`);
});
//
