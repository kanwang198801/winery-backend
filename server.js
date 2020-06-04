
const http = require('http');
const express = require("express");
const app = express();
const cors = require("cors");
const data = require('./data/mockData.json');

app.use(cors());
app.use(express.json());

const comparePercentage = ((a, b) => {
    var keyA = a.percentage,
        keyB = b.percentage;
    return keyB - keyA;
});

app.get("/getYearBreakdown/:lotCode", async (req, res) => {
    try {
        const { lotCode } = req.params;
        const searchResult = data.find(item => item.lotCode === lotCode);

        let breakdown = [];
        let years = [];
        searchResult.components.sort(comparePercentage).forEach(item => {
            if (!years.includes(item.year)) {
                breakdown.push({
                    percentage: item.percentage,
                    key: item.year,
                });
                years.push(item.year);
            }
        });

        const response = {
            breakDownType: "year",
            breakdown,
        }
        res.json(response);

    } catch (err) {
        console.error(err.message)
    }
})

app.get("/getVarietyBreakdown/:lotCode", async (req, res) => {
    try {
        const { lotCode } = req.params;
        const searchResult = data.find(item => item.lotCode === lotCode);

        let breakdown = [];
        let varieties = [];
        searchResult.components.forEach(item => {
            if (!varieties.includes(item.variety)) {
                breakdown.push({
                    percentage: item.percentage,
                    key: item.variety,
                });
                varieties.push(item.variety);
            }
        });

        const response = {
            breakDownType: "variety",
            breakdown,
        }
        res.json(response);

    } catch (err) {
        console.error(err.message)
    }
})

app.get("/getRegionBreakdown/:lotCode", async (req, res) => {
    try {
        const { lotCode } = req.params;
        const searchResult = data.find(item => item.lotCode === lotCode);

        let breakdown = [];
        let regions = [];
        searchResult.components.forEach(item => {
            if (!regions.includes(item.region)) {
                breakdown.push({
                    percentage: item.percentage,
                    key: item.region,
                });
                regions.push(item.region);
            }
        });

        const response = {
            breakDownType: "region",
            breakdown,
        }
        res.json(response);

    } catch (err) {
        console.error(err.message)
    }
})

app.get("/getYearAndVarietyBreakdown/:lotCode", async (req, res) => {
    try {
        const { lotCode } = req.params;
        const searchResult = data.find(item => item.lotCode === lotCode);

        let breakdown = [];
        let yearVarieties = [];
        searchResult.components.forEach(item => {
            if (!yearVarieties.includes(`${item.year} ${item.variety}`)) {
                breakdown.push({
                    percentage: item.percentage,
                    key: `${item.year} ${item.variety}`,
                });
                yearVarieties.push(`${item.year} ${item.variety}`);
            }
        });

        const response = {
            breakDownType: "year + variety",
            breakdown,
        }
        res.json(response);

    } catch (err) {
        console.error(err.message)
    }
})

const server = http.createServer(app);
server.listen(5000);