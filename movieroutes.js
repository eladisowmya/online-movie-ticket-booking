const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Display all movies
router.get("/", (req, res) => {
    const sql = "SELECT * FROM movies";

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error loading movies");
        }

        res.json(result);
    });
});

module.exports = router;