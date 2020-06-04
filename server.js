
const http = require('http');
const express = require("express");
const app = express();
const cors = require("cors");
const data = require('./data/mockData.json');

app.use(cors());
app.use(express.json());

app.get("/getYearBreakdown/:lotCode", async (req, res) => {
    try {
        const { lotCode } = req.params;
        const searchResult = data.find(item => item.lotCode === lotCode);

        res.json(searchResult);
    } catch (err) {
        console.error(err.message)
    }
})

const server = http.createServer(app);
server.listen(5000);