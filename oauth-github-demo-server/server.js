const express = require("express");
const axios = require("axios");
const app = express();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

let access_token = "";

app.get("/login", async (req, res) => {
    const { code } = req.query;

    try {
        // Exchange the code for a GitHub access token
        const response = await axios.post("https://github.com/login/oauth/access_token", {
            client_id: clientId,
            client_secret: clientSecret,
            code: code,
        }, {
            headers: {
                'Accept': 'application/json' }
        });

        ({access_token} = response.data);
        console.log(access_token);
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
        res.json({access_token});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch access token" });
    }
});

app.get("/user", async (req, res) => {
    const { code } = req.query;

    try {
        // Exchange the code for a GitHub access token
        const response = await axios.get("https://api.github.com/user",  {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${access_token}`}
        });
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch user data" });
    }
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});