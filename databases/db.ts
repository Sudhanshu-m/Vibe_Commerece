import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (db) return db;
  
  db = await SQLite.openDatabaseAsync("vibecommerce.db");
  await initDatabase(db);
  return db;
}

async function initDatabase(database: SQLite.SQLiteDatabase) {
  await database.execAsync(`
    PRAGMA journal_mode = WAL;
    
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      total REAL NOT NULL,
      items TEXT NOT NULL,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      timestamp TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    );
    
    CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
  `);
  
  console.log("Database initialized");
}

export interface User {
  id: number;
  email: string;
  name: string;
  created_at: string;
}

export interface Order {
  id: number;
  user_id: number;
  total: number;
  items: string;
  customer_name: string;
  customer_email: string;
  timestamp: string;
  created_at: string;
}

export async function createUser(
  email: string,
  password: string,
  name: string
): Promise<User> {
  const database = await getDatabase();
  
  const result = await database.runAsync(
    "INSERT INTO users (email, password, name) VALUES (?, ?, ?)",
    [email, password, name]
  );
  
  const user = await database.getFirstAsync<User>(
    "SELECT id, email, name, created_at FROM users WHERE id = ?",
    [result.lastInsertRowId]
  );
  
  if (!user) throw new Error("Failed to create user");
  return user;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const database = await getDatabase();
  
  const user = await database.getFirstAsync<User>(
    "SELECT id, email, name, created_at FROM users WHERE email = ?",
    [email]
  );
  
  return user || null;
}

export async function verifyUser(
  email: string,
  password: string
): Promise<User | null> {
  const database = await getDatabase();
  
  const user = await database.getFirstAsync<User>(
    "SELECT id, email, name, created_at FROM users WHERE email = ? AND password = ?",
    [email, password]
  );
  
  return user || null;
}

export async function createOrder(
  userId: number,
  total: number,
  items: string,
  customerName: string,
  customerEmail: string,
  timestamp: string
): Promise<Order> {
  const database = await getDatabase();
  
  const result = await database.runAsync(
    "INSERT INTO orders (user_id, total, items, customer_name, customer_email, timestamp) VALUES (?, ?, ?, ?, ?, ?)",
    [userId, total, items, customerName, customerEmail, timestamp]
  );
  
  const order = await database.getFirstAsync<Order>(
    "SELECT * FROM orders WHERE id = ?",
    [result.lastInsertRowId]
  );
  
  if (!order) throw new Error("Failed to create order");
  return order;
}

export async function getOrdersByUserId(userId: number): Promise<Order[]> {
  const database = await getDatabase();
  
  const orders = await database.getAllAsync<Order>(
    "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
    [userId]
  );
  
  return orders;
}
