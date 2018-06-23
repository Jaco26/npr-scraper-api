const fs = require('fs');

const writePracticeFileWithScraperResults = (fileName, scrapings) => {
  fs.writeFile(fileName, JSON.stringify(scrapings, null, 4), (err) => {
    if (err) throw err;
    console.log('Check the roooooot');
  });
}

module.exports = writePracticeFileWithScraperResults;