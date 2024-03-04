const express = require('express');
const multer = require('multer');
const router = express.Router();

const {
  CreateItemHandler,
  GetAllItemsHandler,
  GetItemByIdHandler,
  UpdateItemByIdHandler,
  GetItemsByParamsHandler,
  GetItemsForSearchHandler,
} = require('../controller');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/thumbnails/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get('/', (req, res, next) => {
  console.log('new req');
  res.status(200).json({ status: 'success' });
});

router.post('/item', upload.single('thumbnail'), CreateItemHandler);

router.get('/item', GetAllItemsHandler);
router.get('/item/:itemId', GetItemByIdHandler);

router.put('/item/:itemId', UpdateItemByIdHandler);

router.delete('/item/:itemId');

router.get('/item/search', GetItemsForSearchHandler);
router.get('/item/filters', GetItemsByParamsHandler);

module.exports = router;
