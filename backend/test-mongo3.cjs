const mongoose = require('mongoose');

const uri = "mongodb://shudharshan07_db_user:km51agaT1NODj0Od@ac-mjmj9uo-shard-00-00.d8ck8ca.mongodb.net:27017/?ssl=true&authSource=admin&directConnection=true";

async function run() {
  console.log("Starting connection test...");
  const start = Date.now();
  
  const options = {
    family: 4,
    serverSelectionTimeoutMS: 60000,
    connectTimeoutMS: 60000,
  };

  try {
    console.log("Connecting to:", uri.replace(/:([^:@]{1,})@/, ':****@'));
    await mongoose.connect(uri, options);
    console.log("Success! Connected in", (Date.now() - start), "ms");
    
    const admin = mongoose.connection.db.admin();
    const info = await admin.command({ hello: 1 });
    console.log("Connection info:", info);
    
  } catch (err) {
    console.error("Failed after", (Date.now() - start), "ms");
    console.error("Error Name:", err.name);
    console.error("Error Message:", err.message);
    if (err.reason) {
        console.error("Error Reason:", JSON.stringify(err.reason, null, 2));
    }
  }
  process.exit(0);
}
run();
