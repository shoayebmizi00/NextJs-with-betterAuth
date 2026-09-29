import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const databaseUrl = process.env.BETTER_AUTH_DB_URL;

if (!databaseUrl) {
  throw new Error("BETTER_AUTH_DB_URL environment variable is not set");
}

const client = new MongoClient(databaseUrl);
const db = client.db();

export const auth = betterAuth({
    emailAndPassword: { 
    enabled: true, 
  }, 
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
})