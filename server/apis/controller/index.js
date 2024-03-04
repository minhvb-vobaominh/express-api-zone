const { v4: uuidv4 } = require('uuid');

const service = require('../services');

const GetAllItemsHandler = async (req, res, next) => {
  try {
    const items = await service.getAllItems();

    if (!items) {
      res.status(500).json({ status: 'fail', msg: "Can't get all items." });
    }

    itemsWithoutObjectId = items.map((item) => {
      const { _id, ...rest } = item;
      return { ...rest };
    });

    res.json({ status: 'success', data: itemsWithoutObjectId });
  } catch (error) {
    res.status(500).json({ status: 'fail', msg: 'Something went wrong.' });
  }
};

const GetItemByIdHandler = async (req, res, next) => {
  const itemId = req.params.itemId;
  try {
    const item = await service.getItemById(itemId);
    if (!item) {
      res.status(500).json({ status: 'fail', msg: "Can't get item." });
    }
    res.status(200).json({ status: 'success', data: item });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'fail', msg: 'Internal error.' });
  }
};

const GetItemByNameHandler = async (req, res, next) => {
  const itemName = req.params.itemName;
  const item = await service.getItemByName(itemName);
  res.json({ status: 'success', data: item });
};

const CreateItemHandler = async (req, res, next) => {
  const { name, category, price } = req.body;
  const filePath = req.file.path;
  const data = {
    id: uuidv4(),
    name,
    price,
    category,
    status: 'active',
    created_at: Date.now(),
    thumbnail_path: filePath,
  };

  const item = await service.createItem(data);
  res.json({
    status: 'success',
    msg: 'The item is created successfully.',
    data: item,
  });
};

const UpdateItemByIdHandler = async (req, res, next) => {
  const itemId = req.params.itemId;
  const data = req.body;

  const item = service.updateItem(itemId, data);
  console.log(item);

  res.status(200).json({ status: 'success' });
};

const DisableItemByIdHandler = async (req, res, next) => {
  const itemId = req.params.itemId;
};

const GetItemsForSearchHandler = async (req, res, next) => {
  const items = await service.searchItem(req.query.term);
};

const GetItemsByParamsHandler = async (req, res, next) => {
  const { field, filter } = req.query;
};

module.exports = {
  CreateItemHandler,
  GetAllItemsHandler,
  GetItemByIdHandler,
  GetItemByNameHandler,
  UpdateItemByIdHandler,
  GetItemsByParamsHandler,
  GetItemsForSearchHandler,
};
