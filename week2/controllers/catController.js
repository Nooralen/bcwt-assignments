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
  const cat_update_put = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        res.status(400).json({
            status: 400,
            errors: validationErrors.array(),
            message: 'Invalid PUT data'
        });
        return;
    }
    const cat = req.body;
    const user = req.user[0];
    const catId = Number(req.params.id);
    console.log('updating a cat', req.params);
    try {
        const response = await catModel.updateCat(cat, catId, user);
        if (response.affectedRows > 0) {
            res.status(200).json({ message: 'Cat modified!' });
        } else {
            res.status(200).json({ message: "Not your Cat" });
        }
    } catch (error) {
        res.status(500).json({ error: 500, message: error.message });
    }
};
const cat_delete = async (req, res) => {
    console.log('deleting a cat', req.params.id);
    try {
        const userId = req.user[0].user_id;
        const userRole = req.user[0].role;
        const response = await catModel.deleteCat(req.params.id, userId, userRole);
        if (response.affectedRows > 0) {
            res.status(200).json({ message: "Cat deleted" });
        } else {
            res.status(200).json({ message: "Not your Cat" });
        }
    } catch (error) {
        res.status(500).json({ error: 500, message: error.message });
    }
};
module.exports = {
    getCatList, getCat, postCat, cat_create_post, cat_update_put, cat_delete
};