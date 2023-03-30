'use strict';
// catController
const catModel = require('../models/catModel');


const cats = catModel.cats;

const getCatList = async (req, res) => {
    try {
        const cats = await catModel.getAllCats();
        console.log(cats);
        res.json(cats);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const getCat = async (req, res) => {
    try {
        const cat = await catModel.getCat(req.params.id);
        res.json(cat);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


const postCat = async (req, res) => {
      console.log(req.body);
}
const cat_create_post = async (req,res) => {
    try {
      catModel.addCat(req)
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error')
    }
  };
const cat_update_put = async (req,res) => {
    try {
        catModel.updateCat(req.body)
    } catch (error) {
        console.error(error);
      res.status(500).send('Internal Server Error')
    }
}
const cat_delete = async (req,res) => {
    try {
        catModel.deleteCat(req.params.id)
        res.json({message: 'Cat deleted!'})
    } catch (error) {
        console.error(error);
      res.status(500).send('Internal Server Error')
    }
}
module.exports = {
    getCatList, getCat, postCat, cat_create_post, cat_update_put, cat_delete
};