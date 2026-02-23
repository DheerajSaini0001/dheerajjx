const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Memory = require('./models/Memory');
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
    const memories = await Memory.find();
    console.log(JSON.stringify(memories, null, 2));
    process.exit(0);
});
