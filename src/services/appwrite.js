import { Client, Account, ID } from "appwrite";

// Client setup
export const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // .env.local se
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
  // .env.local se

// Account service
export const account = new Account(client);

// Re-export ID utility
export { ID };
