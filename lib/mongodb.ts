import mongoose from 'mongoose';

// Using a local MongoDB connection for development
const MONGODB_URI = 'mongodb://localhost:27017/portfolio';

// Define the shape of the cached mongoose connection object
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Add mongoose connection to global type
declare global {
  var mongooseCache: MongooseCache | undefined;
}

// Initialize cached connection
if (!global.mongooseCache) {
  global.mongooseCache = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (global.mongooseCache!.conn) {
    return global.mongooseCache!.conn;
  }

  if (!global.mongooseCache!.promise) {
    const opts = {
      bufferCommands: false,
    };

    // Attempt connection with retry logic
    let retries = 5;
    while (retries > 0) {
      try {
        global.mongooseCache!.promise = mongoose.connect(MONGODB_URI, opts);
        break;
      } catch (e) {
        console.error(`Failed to connect to MongoDB, retries left: ${retries}`);
        retries--;
        // Wait for a second before retrying
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  try {
    global.mongooseCache!.conn = await global.mongooseCache!.promise;
    console.log('Connected to MongoDB');
  } catch (e) {
    global.mongooseCache!.promise = null;
    console.error('Failed to connect to MongoDB:', e);
    throw e;
  }

  return global.mongooseCache!.conn;
}

export default connectToDatabase;