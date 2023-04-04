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
router.post('/', 
upload.single('cat'), 
body('name').isAlpha().isLength({min: 3}).withMessage('Name must be atleast 3 characters').trim().escape(),
body('birthdate').isISO8601().withMessage('Invalid birthdate'),
body('weight').isNumeric().withMessage('Weight must be a number'),
body('owner').notEmpty().withMessage('Owner is required'),
body('cat').custom((value, {req}) => {
  if (!req.file) {
    throw new Error('File is required');

  }else if (!['image/png', 'image/jpeg', 'image/gif'].includes(req.file.mimetype)) {
    throw new Error ('Invalid file type');
  }else {
    return true;
  }
}),
(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });

  }
  controller.cat_create_post(req,res);
});
// PUT
router.put('/', body('name').isAlpha().isLength({min: 3}).withMessage('Name must be atleast 3 characters').trim().escape(),
body('birthdate').isISO8601().withMessage('Invalid birthdate'),
body('weight').isNumeric().withMessage('Weight must be a number'),
body('owner').notEmpty().withMessage('Owner is required'),
(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
  }
  controller.cat_update_put(req, res);

}); 
// DELETE
router.delete('/:id', controller.cat_delete);
module.exports = router