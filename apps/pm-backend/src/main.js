const cors = require('cors');
const express = require('express');
const dbConnection = require('./config/database');
const errorHandler = require('./middleware/error');
const bodyParser = require('body-parser');

// Connect to MongoDB
dbConnection();

// Start Express Server
const app = express();

app.use(cors());

app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// importing routes
const users = require('./routes/users.js');
const interests = require('./routes/interests.js');
const conversations = require('./routes/conversations.js');

// mounting routes
app.use('/api/v1/users', users);
app.use('/api/v1/interests', interests);
app.use('/api/v1/conversations', conversations);

// error Handler
app.use(errorHandler);

const server = app.listen(
  process.env.PORT || 8000,
  console.log(`Server is listening on port : ${process.env.PORT || 8000}\nMode: ${process.env.NODE_ENV.toUpperCase()}`)
);

// Error in connecting to MongoDB triggers unhandledRejection at global level
// That is being handled here. This stops server if MongoDB is NOT connected.
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
