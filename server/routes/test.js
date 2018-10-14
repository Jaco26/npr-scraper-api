const router = require('express').Router();
const { cleanMakeItGo } = require('../cleanup/scrape');
const { main } = require('../cleanup/migrate');

router.get('/scrape', async (req, res) => {
  try {
    await cleanMakeItGo();
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get('/migrate', async (req, res) => {
  try {
    await main();
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});



module.exports = router;