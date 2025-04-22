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
        randomizedExerciseList: null,
        errorMessage: null,
        previousInput: null,
    });
});


function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}


app.post("/search", async(req,res) => {
    const userInput = req.body.searchExercise ? req.body.searchExercise.trim().toLowerCase() : "";
    
    if (!userInput || !(userInput in muscleIds)) {
        return res.render("index.ejs", {
            errorMessage: "We couldn't find that muscle group. Try something like 'abs', 'arms', 'legs', etc.",
            previousInput: req.body.searchExercise
        });
        
    }

    const muscleID = muscleIds[userInput];

    const userInfo = {
        username: process.env.API_USERNAME,
        password: process.env.API_PASSWORD
    };

    // Add API_USERNAME, API_PASSWORD, refresh and access api keys
    try {
        const resultTokens = await axios.post(API_URL + "token", userInfo);
        const accessToken = resultTokens.data.access;
        const config = {
            headers: { Authorization: `Bearer ${accessToken}` }};

        const result = await axios.get(API_URL + "exerciseinfo?category=" + muscleID, config);
        const fetchedResults = result.data.results;

        const exerciseList = [];

        for (const element of fetchedResults) {
            for (const translation of element.translations) {
                if (translation.language === 2) {
                    const exercise = translation.name;
                    const formattedName = exercise.toLowerCase().split(" ").map(word => capitalizeFirstLetter(word)).join(" ");
                    exerciseList.push(formattedName);
                }
            }
        }

        const shuffledList = exerciseList.sort(() => 0.5 - Math.random());
        const randomizedExerciseList = shuffledList.slice(0,5);

        console.log(randomizedExerciseList);

        res.render("index.ejs", {
            randomizedExerciseList,
            errorMessage: null,
            previousInput: null,
        });

    } catch (error){
        console.error("Server Error:", error);
        res.render("index.ejs", {
        errorMessage: "An unexpected error occurred. Please try again.",
        previousInput: req.body.searchExercise
        });
    }
});

app.post("/download", async(req,res) => {
    return res.sendStatus(200);
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});