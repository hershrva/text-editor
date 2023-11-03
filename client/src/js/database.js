// Import the openDB function from idb
import { openDB } from 'idb';

// Define the database name, version, and object store name
const DB_NAME = 'jate';
const DB_VERSION = 1;
const OBJECT_STORE_NAME = 'jate';

// Initialize the database
const initdb = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(database) {
      // Create an object store if it doesn't exist
      if (!database.objectStoreNames.contains(OBJECT_STORE_NAME)) {
        const store = database.createObjectStore(OBJECT_STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('content', 'content', { unique: false });
        console.log(`${OBJECT_STORE_NAME} object store created`);
      }
    },
  });
  console.log('Database initialized');
  return db;
};

// Add content to the database
export const putDb = async (content) => {
  const db = await initdb();
  const transaction = db.transaction(OBJECT_STORE_NAME, 'readwrite');
  const store = transaction.objectStore(OBJECT_STORE_NAME);

  try {
    const newItem = { content };
    const id = await store.add(newItem);
    console.log(`Content added with ID: ${id}`);
  } catch (error) {
    console.error('Error adding content:', error);
  } finally {
    transaction.done;
  }
};

// Get all content from the database
export const getDb = async () => {
  const db = await initdb();
  const transaction = db.transaction(OBJECT_STORE_NAME, 'readonly');
  const store = transaction.objectStore(OBJECT_STORE_NAME);

  try {
    const content = await store.getAll();
    console.log('Retrieved content:', content);
    return content;
  } catch (error) {
    console.error('Error retrieving content:', error);
    return [];
  } finally {
    transaction.done;
  }
};
