
const express = require('express');
const path = require('path');
const app = express();
var cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors());

// Serve the images from this server
app.use('/images', express.static(path.join(__dirname, 'images')));

const chefs = require("./data/data.json");
const slides = require("./data/slides.json");

const toAbsolute = (req, value) =>
    typeof value === "string" && value.startsWith("/images/")
        ? `${req.protocol}://${req.get("host")}${value}`
        : value;

// Build a copy of the chef list with image URLs.
const chefsWithUrls = (req) =>
    chefs.map((chef) => ({
        ...chef,
        chefPicture: toAbsolute(req, chef.chefPicture),
        recipes: chef.recipes.map((recipe) => ({
            ...recipe,
            thumbnail: toAbsolute(req, recipe.thumbnail),
        })),
    }));

app.get('/', (req, res) => {
    res.send(`This server is running on port: ${port}`)
});
app.get("/chefs", (req, res) => {
    res.send(chefsWithUrls(req))
})
app.get("/slides", (req, res) => {
    res.send(slides)
})

app.get("/chefs/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const selectedId = chefsWithUrls(req).find(n => n.id === id);
    res.send(selectedId);
});

app.listen(port, () => {
    console.log(`This server is running on port ${port}`)
})
