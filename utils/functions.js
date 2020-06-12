const comparePercentage = (a, b) => {
   const keyA = a.percentage,
      keyB = b.percentage;
   return keyB - keyA;
};

module.exports = { comparePercentage };
