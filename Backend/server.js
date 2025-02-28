const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;
const SECRET_KEY = "marya2005";

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: allowedOrigins, 
    credentials: true, 
  })
);

const users = []; 

app.post("/signup", (req, res) => {
    const { username, email, password } = req.body;

    if (users.find(user => user.username === username)) {
        return res.status(400).json({ success: false, message: "User already exists" });
    }

    users.push({ username, email, password });
    res.json({ success: true, message: "User registered successfully" });
});

app.post("/signin", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });

    res.cookie("token", token, { httpOnly: true, sameSite: "Strict" });
    res.json({ success: true, message: "Logged in successfully", token });
});

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ success: false, message: "Invalid token" });
        req.user = user;
        next();
    });
};

app.get("/profile", authenticateToken, (req, res) => {
    res.json({ success: true, message: `Welcome ${req.user.username} to your profile!` });
});

app.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ success: true, message: "Logged out successfully" });
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
