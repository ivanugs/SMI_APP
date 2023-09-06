const express = require("express");
const app = express();
const port = 3000;
var requests = require('requests');

app.get("/", (req, res) => {
  requests("http://192.168.1.70:8000/api/rutas/get_route")
    .on("data", function (chunk) {
      console.log(chunk);
    })
    .on("end", function (err) {
      if (err) return console.log("connection closed due to errors", err);

      console.log("end");
    });
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
