import express from "express";
import dotenv from "dotenv";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://wger.de/api/v2/";


app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
dotenv.config();


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


app.get("/", (req, res) => {
    res.render("index.ejs", {
        errorMessage: null,
        previousInput: null,
    });
});

app.post("/search", async(req,res) => {
    console.log("req.body:", req.body);

    const userInput = req.body.searchExercise ? req.body.searchExercise.trim().toLowerCase() : "";
    
    if (!userInput || !(userInput in muscleIds)) {
        return res.render("index.ejs", {
            errorMessage: "We couldn't find that muscle group. Try something like 'abs', 'arms', or 'legs'",
            previousInput: req.body.searchExercise
        });
        
    }

    try {
        const muscleID = muscleIds[userInput];
    } catch (error) {
        console.error("Server Error:", error);
        return res.render("index.ejs", {
        errorMessage: "An unexpected error occurred. Please try again.",
        previousInput: req.body.searchExercise
    });
    }
        
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
    
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});