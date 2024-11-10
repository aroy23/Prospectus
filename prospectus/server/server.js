const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
    origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));

const FB_admin = require('firebase-admin'); 
const FB_serviceAccount = require('./prospectus-35l-admin.json')

FB_admin.initializeApp({
    credential: FB_admin.credential.cert(FB_serviceAccount),
});

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(403).send("unauthorized: no token");
    }

    const loginToken = authHeader.split("Bearer ")[1];
    if (!loginToken)
    {
        return res.status(403).send("unauth: missing loginToken");
    }


    FB_admin.auth().verifyIdToken(loginToken)
        .then((decodedToken) => { 
            req.user = decodedToken;
            next(); 
        })
        .catch((error) => {
            console.error("error with token verification", error); 
            res.status(401).send("invalid token"); 
        }
        ); 
}; 

app.get("/api", (req, res) => {
    res.json({"fruits": ["apple", "orange", "banana"] })
});


app.get("/protected-api", verifyToken, (req, res) => {
    res.json({
        message: "in protected API",
        user: req.user, 
    });
});

app.listen(8080, () => {
    console.log("Server started on port 8080")
});

