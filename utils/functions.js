const comparePercentage = ((a, b) => {
    var keyA = a.percentage,
        keyB = b.percentage;
    return keyB - keyA;
});

module.exports = { comparePercentage }