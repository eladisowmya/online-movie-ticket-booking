const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../frontend")));

// Display movies
app.get("/api/movies", (req, res) => {
    db.query("SELECT * FROM movies", (err, result) => {
        if (err) return res.status(500).send("Movie loading error");
        res.json(result);
    });
});

// Display shows
app.get("/api/shows", (req, res) => {
    const sql = `
        SELECT shows.*, movies.movie_name
        FROM shows
        JOIN movies ON shows.movie_id = movies.movie_id
    `;

    db.query(sql, (err, result) => {
        if (err) return res.status(500).send("Show loading error");
        res.json(result);
    });
});

// Save booking
app.post("/book", (req, res) => {
    const { show_id, customer_name, email, number_of_tickets } = req.body;

    const sql = "SELECT ticket_price FROM shows WHERE id = ?";

    db.query(sql, [show_id], (err, result) => {
        if (err || result.length === 0) {
            return res.status(400).send("Invalid show selected");
        }

        const total = result[0].ticket_price * Number(number_of_tickets);

        const insert = `
            INSERT INTO bookings
            (show_id, customer_name, email, number_of_tickets, total_amount, booking_date)
            VALUES (?, ?, ?, ?, ?, CURDATE())
        `;

        db.query(
            insert,
            [show_id, customer_name, email, number_of_tickets, total],
            (err) => {
                if (err) return res.status(500).send("Booking failed");

                res.send(`
                    <h1>Booking Successful!</h1>
                    <p>Total Amount: ₹${total}</p>
                    <a href="/">Go to Home Page</a>
                `);
            }
        );
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});