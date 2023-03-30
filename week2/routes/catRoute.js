'use strict';
const express = require('express');
// catRoute
const router = express.Router();
const multer  = require('multer')
// piettää kuvalle vanhan nimen
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, './uploads');
  },
  filename: function (req, file, callback) {
      const filename = file.originalname || new Date().toISOString();
      callback(null, filename);
  }
});

const upload = multer({ storage })
const controller = require('../controllers/catController')

router.get('/', controller.getCatList);

//Tietty kissa
router.get('/:id', controller.getCat);
// POST
router.post('/', upload.single('cat'), controller.cat_create_post, controller.postCat);
// PUT
router.put('/', controller.cat_update_put)
// DELETE
router.delete('/:id', controller.cat_delete);
module.exports = router