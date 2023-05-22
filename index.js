
const express = require('express');
const app = express();
var cors = require('cors');
const port = process.env.PORT;

app.use(cors());

const chefs = require("./data/data.json")
const slides = require("./data/slides.json")

app.get('/', (req, res) => {
    res.send(`This server is running on port: ${port}`)
});
app.get("/chefs", (req, res) => {
    res.send(chefs)
})
app.get("/slides", (req, res) => {
    res.send(slides)
})

app.get("/chefs/:id", (req, res) => {
    const id = parseInt(req.params.id);
    // console.log(id);
    const selectedId = chefs.find(n => n.id === id);
    res.send(selectedId);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})