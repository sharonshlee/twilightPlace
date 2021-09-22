// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const morgan = require("morgan");
const express = require("express");
const cookieSession = require("cookie-session");
const app = express();

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.

app.use(morgan("dev"));
app.use(
  cookieSession({
    name: "session",
    keys: ["key1"],
  })
);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded",
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const menuRoutes = require("./routes/menu");
const confirmationRoutes = require("./routes/confirmation");
const thankyouRoutes = require("./routes/thankyou");
const rewardsRoutes = require("./routes/rewards");
const searchMenuRoutes = require("./routes/searchMenu");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own

app.use("/menu", menuRoutes(db));
app.use("/confirmation", confirmationRoutes(db));
app.use("/thankyou", thankyouRoutes(db));
app.use("/searchMenu", searchMenuRoutes(db));
app.use("/api/rewards", rewardsRoutes(db));

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  const user = req.session.user;
  const templateVars = { user };
  res.render("index", templateVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
