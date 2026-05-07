const mongoose = require('mongoose');
const uri = "mongodb://shudharshan07_db_user:km51agaT1NODj0Od@159.41.196.60:27017/?ssl=true&directConnection=true&authSource=admin&appName=Cluster0";

async function run() {
  try {
    console.log("Connecting via direct IPv4 address...");
    await mongoose.connect(uri);
    console.log("Success! Connected to MongoDB Atlas via raw IPv4.");
  } catch (err) {
    console.error("Failed:", err.message);
  }
  process.exit(0);
}
run();
