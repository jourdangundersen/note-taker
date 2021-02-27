var express = require("express");
var apiRoutes = require("./routes/apiRoutes");
var htmlRoutes = require("./routes/htmlRoutes");
var port = 8080;
var app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));
app.use(apiRoutes);
app.use(htmlRoutes);
app.listen(port, function(){
    console.log("app running on port", port);
})