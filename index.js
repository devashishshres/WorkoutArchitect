import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://wger.de/api/v2/";

app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});