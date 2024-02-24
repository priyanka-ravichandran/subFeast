const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/addtocart', cartController.addtoCart);
router.get('/getCartDetails', cartController.getCartDetails);
router.put('/updateCart', cartController.updateCart);
router.delete('/deleteCartItem', cartController.deleteCartItem);


module.exports = router;