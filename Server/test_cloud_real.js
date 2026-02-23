const cloudinary = require('./config/cloudinary');

async function run() {
    try {
        const res = await cloudinary.uploader.upload('server.js', { folder: 'test' });
        console.log("SUCCESS");
    } catch (e) {
        console.log("FAIL:", e);
    }
}
run();
