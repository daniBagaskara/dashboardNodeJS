const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/eSPP', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
//   useCreateIndex:true,
//   createIndexes: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB!');
});