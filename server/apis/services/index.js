const { MongoClient, ObjectId } = require('mongodb');

const DB_URL = process.env.DB_URL;

const connectMongoDB = async () => {
  const client = new MongoClient(DB_URL);
  try {
    // Connect the client to the MongoDB server
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log('Successfully connected to MongoDB Server');
  } catch (error) {
    throw error;
  } finally {
    // Ensures that the client will close when finish/error
    await client.close();
  }
};

const createItem = async (data) => {
  const client = new MongoClient(DB_URL);

  try {
    await client.connect();
    const db = client.db('realestatedoc');
    const collection = db.collection('books');
    const item = await collection.insertOne(data);
    const itemObject = await collection.findOne({ _id: item.insertedId });

    const { _id, ...rest } = itemObject;
    const itemObjectWithoutObjectId = { ...rest };
    return itemObjectWithoutObjectId;
  } catch (e) {
    console.log('Error creating item: ', e);
    throw e;
  }
};

const getAllItems = async () => {
  const client = new MongoClient(DB_URL);
  try {
    await client.connect();
    const db = client.db('realestatedoc');
    const collection = db.collection('books');
    const items = collection.find({}).toArray();
    return items;
  } catch (e) {
    console.log('Error getting all items: ', e);
    throw e;
  }
};

const getItemById = async (itemId) => {
  const client = new MongoClient(DB_URL);

  try {
    await client.connect();
    const db = client.db('realestatedoc');
    const collection = db.collection('books');
    const item = await collection.findOne({ id: itemId });
    return item;
  } catch (e) {
    console.log('Error getting item by id: ', e);
    throw e;
  }
};

const getItemByName = async (itemName) => {
  const client = new MongoClient(DB_URL);

  try {
    await client.connect();
    const db = client.db('realestatedoc');
    const collection = db.collection('books');
    const item = collection.findOne({ _id: itemName });
    return item;
  } catch (e) {
    console.log('Error getting item by name: ', e);
    throw e;
  }
};

const updateItem = async (itemId, data) => {
  const client = new MongoClient(DB_URL);
  try {
    await client.connect();

    const db = client.db('realestatedoc');
    const collection = db.collection('books');

    const filter = { id: itemId };
    const update = { $set: { ...data } };
    const options = { returnOriginal: false };

    const result = await collection.findOneAndUpdate(filter, update, options);
  } catch (e) {
    console.log('Error updating item by id: ', e);
    throw e;
  }
};

const searchItem = async (term) => {
  const client = new MongoClient(DB_URL);
  try {
    await client.connect();

    const db = client.db('realestatedoc');
    const collection = db.collection('books');

    const result = collection.find({ $text: { $search: term } }).toArray();
    return result;
  } catch (e) {
    console.log('Error updating item by id: ', e);
    throw e;
  }
};

const getItemsByCategory = async (catagory) => {};

module.exports = {
  getAllItems,
  getItemById,
  getItemByName,
  createItem,
  updateItem,
  searchItem,
};
