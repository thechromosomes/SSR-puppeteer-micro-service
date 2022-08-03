const router = express.Router();
const { resolve } = require('path');
const homePageController = require('../controller/homePageController.js')
var verifyToken = require('../middleware/verifyToken').verifyToken


router.get('/getHomePage', verifyToken, homePageController.getHomePage)

module.exports = router;

