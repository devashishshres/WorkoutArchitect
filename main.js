import express from "express";
import dotenv from "dotenv";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://wger.de/api/v2/";


app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
dotenv.config();


app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/search", async(req,res) => {
    const muscleIds = {
        "abs": 10,
        "arms": 8,
        "back": 12,
        "calves": 14,
        "cardio": 15,
        "chest": 11,
        "legs": 9,
        "shoulders": 13
    };
    const userInput = req.body.searchExercise;
    if (!(userInput.toLowerCase() in muscleID)) {
        
    } else {
        
        /*
        const muscleID = muscleIds[userInput.toLowerCase()];
        const userInfo = {
            username: process.env.API_USERNAME,
            password: process.env.API_PASSWORD
        };
        // Add API_USERNAME, API_PASSWORD, refresh and access api keys
        try {
            const resultTokens = await axios.post(API_URL + "/token", userInfo);
            const accessToken = resultTokens.data.access;
            const config = {
                headers: { Authorization: `Bearer ${accessToken}` }};

            const result = await axios.get(API_URL + "/exerciseinfo?category=" + muscleID, config);


        } catch (error){

        }

        */
    }
    
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});