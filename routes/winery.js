const express = require("express");
const router = express.Router();
const data = require('../data/mockData.json');

const comparePercentage = ((a, b) => {
    var keyA = a.percentage,
        keyB = b.percentage;
    return keyB - keyA;
});

router.get("/getYearBreakdown/:lotCode", async (req, res) => {
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

router.get("/getVarietyBreakdown/:lotCode", async (req, res) => {
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

router.get("/getRegionBreakdown/:lotCode", async (req, res) => {
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

router.get("/getYearAndVarietyBreakdown/:lotCode", async (req, res) => {
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

module.exports = router;
