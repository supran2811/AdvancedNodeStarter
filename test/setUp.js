
const mongoose = require('mongoose');
const keys = require('../config/keys');
require('../models/User');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });