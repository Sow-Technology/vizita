import mongoose from "mongoose";
export async function connectDB() {
  try {
    mongoose.connect(process.env.MONGO_URI);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Mongoose is connected to " + process.env.MONGO_URI);
    });
    connection.on("error", (err) => {
      console.log(`Connection error: ${err}`);
      process.exit();
    });
  } catch (error) {
    console.log("Error connecting to DB");
    throw error;
  }
}
