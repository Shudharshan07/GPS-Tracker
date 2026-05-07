const mongoose = require('mongoose');

const uri = "mongodb+srv://shudharshan07_db_user:km51agaT1NODj0Od@cluster0.d8ck8ca.mongodb.net/?appName=Cluster0";

async function run() {
  try {
    console.log("Trying with default options...");
    await mongoose.connect(uri);
    console.log("Connected successfully with default options!");
  } catch (err) {
    console.error("Failed with default:", err.message);
    
    try {
      console.log("\nTrying with family: 4...");
      await mongoose.connect(uri, { family: 4 });
      console.log("Connected successfully with family: 4!");
    } catch (err2) {
      console.error("Failed with family: 4:", err2.message);
      
      try {
        console.log("\nTrying direct connection string with family: 4...");
        const uri2 = "mongodb://shudharshan07_db_user:km51agaT1NODj0Od@ac-mjmj9uo-shard-00-00.d8ck8ca.mongodb.net:27017,ac-mjmj9uo-shard-00-01.d8ck8ca.mongodb.net:27017,ac-mjmj9uo-shard-00-02.d8ck8ca.mongodb.net:27017/?ssl=true&replicaSet=atlas-mjmj9uo-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";
        await mongoose.connect(uri2, { family: 4 });
        console.log("Connected successfully with direct string and family 4!");
      } catch (err3) {
        console.error("Failed with direct string:", err3.message);
      }
    }
  }
  process.exit(0);
}
run();
