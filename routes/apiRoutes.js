const router = require("express").Router();
const { fstat } = require("fs");
var db = require("../db/db.json");
var fs = require("fs");
router.get("/api/notes", function(req, res){
    db = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    console.log("get route", db);
    res.json(db);
});
router.post("/api/notes", function(req, res){
    var newNote = {
        title: req.body.title, 
        text: req.body.text,
        id: Math.floor(Math.random() * 1000)
    };
    db.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(db), function(error){
        if (error) throw error
        console.log("db updated")
    });
    console.log("post route", db);
    res.json(db);
});
router.delete("/api/notes/:id", function(req, res){
    var deleteId = req.params.id
    var updatedDb = []
    for (let i = 0; i < db.length; i++) {
        if (db[i].id !== deleteId) {
            updatedDb.push(db[i])
        }
    }
    db = updatedDb;
    fs.writeFileSync("./db/db.json", JSON.stringify(db), function(error){
        if (error) throw error
        console.log("db updated")
    });
    console.log("delete route", db);
    res.json(db);
});

module.exports = router