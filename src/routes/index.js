const express = require('express');
const router = express.Router();
const userRouter = require('./user.router');
const categoryRouter = require('./category.router');
const imageRouter= require('./image.router')
const productRouter= require('./product.router');
const productCartRouter = require('./productCart.route');
const purchaseRouter = require('./purchase.router');

// colocar las rutas aquí
router.use(userRouter);
router.use(categoryRouter);
router.use(productRouter)
router.use(imageRouter);
router.use(productCartRouter)
router.use(purchaseRouter)


module.exports = router;