const Router = require('express');
const router = new Router();

const controller = require('../controllers/exchangesController');

router.get('/exchangesList', controller.exchangesList);
router.get('/updateData', controller.updateExchangesList);


module.exports = router;