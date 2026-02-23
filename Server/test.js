const jwt = require('jsonwebtoken');
require('dotenv').config();

const token = jwt.sign({ id: '65f1a3e6c0c2a234f9a56bcd' }, process.env.JWT_SECRET, { expiresIn: '1h' });
console.log(token);
