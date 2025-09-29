import { Client, Account, ID ,TablesDB } from "appwrite";

// Client setup
export const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // .env.local se
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
  // .env.local se


export const account = new Account(client);


export const tableDB = new TablesDB(client)
