const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const ProductCart= require('../models/ProductCart');
const { raw } = require('express');

const getAll = catchError(async(req, res) => {
   const purchases= await Purchase.findAll({
    include:[Product],
    where:{userID : req.user.id}
   });
    return res.json(purchases)
});

const create =catchError(async(req,res) =>{
const productsCart = await ProductCart.findAll({
    where:{userId: req.user.id},
    attributes: ['quantity','productId','userId'],
    raw:true,
});
const purchases =await Purchase.bulkCreate(productsCart);
await ProductCart.destroy({where:{userId: req.user.id}})
return res.status(201).json(productsCart);
});

module.exports = {
    getAll,
    create,
}