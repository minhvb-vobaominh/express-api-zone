db = db.getSiblingDB('realestatedoc');
db.createUser({
  user: 'minhvb',
  pwd: 'example',
  roles: [{ role: 'readWrite', db: 'realestatedoc' }],
});
db.createCollection('users');
db.users.insert({ name: 'minh' });
db.books.createIndex({ name: 'text', category: 'text' });
