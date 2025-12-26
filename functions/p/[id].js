import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static HTML posts
app.use("/p", express.static(path.join(__dirname, "p")));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
