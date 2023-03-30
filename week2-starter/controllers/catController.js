'use strict';
const catModel = require('../models/catModel');

const cats = catModel.cats;

const getCatList = (req, res) => {
  res.json(cats);
};

const getCat = (req, res) => {
  //console.log(req.params);
  const id = req.params.catId;
  // filter matching cat(s) based on id
  const filteredCats = cats.filter(cat => id == cat.id);
  if (filteredCats.length > 0) {
    res.json(filteredCats[0]);
  } else {
    // send response 404 if id not found in array 
    // res.sendStatus(404);
    res.status(404).json({message: 'Cat not found.'})
  }
};

const postCat = (req, res) => {
  console.log('posting a cat', req.body, req.file);
  // add cat details to cats array
  const newCat = req.body;
  newCat.filename = 'http://localhost:3000/uploads/' + req.file.filename;
  cats.push(newCat);
  // send correct response if upload successful
  res.status(201).send('new cat added!');
};


const putCat = (req, res) => {
  res.send('With this endpoint you can modify a cat');
};

const deleteCat = (req, res) => {
  res.send('With this endpoint you can delete a cat');
};

const catController = {getCatList, getCat, postCat, putCat, deleteCat};
module.exports = catController;