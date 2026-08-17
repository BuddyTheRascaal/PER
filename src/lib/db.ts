import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";

/**
 * Persistence MVP : SQLite fichier local. Suffisant pour la démo /
 * pré-lancement. Avant mise en production réelle, remplacer par la base
 * gérée par l'infra (Postgres, etc.) — l'accès passe entièrement par ce
 * module, donc un seul point à faire évoluer.
 */

const DATA_DIR = path.join(process.cwd(), ".data");
const DB_PATH = path.join(DATA_DIR, "per-grand-prix.db");

declare global {
  var __perGpDb: Database.Database | undefined;
}

function createDb(): Database.Database {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS copilotes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE NOT NULL,
      nom TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      organisation TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS clicks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      copilote_code TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      copilote_code TEXT,
      nom TEXT NOT NULL,
      email TEXT NOT NULL,
      telephone TEXT,
      tmi INTEGER,
      revenu_annuel INTEGER,
      age INTEGER,
      economie_impot INTEGER,
      capital_projete INTEGER,
      source TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS commissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      copilote_code TEXT NOT NULL,
      lead_id INTEGER,
      libelle TEXT NOT NULL,
      montant INTEGER NOT NULL,
      statut TEXT NOT NULL DEFAULT 'en attente',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_clicks_code ON clicks(copilote_code);
    CREATE INDEX IF NOT EXISTS idx_leads_code ON leads(copilote_code);
    CREATE INDEX IF NOT EXISTS idx_commissions_code ON commissions(copilote_code);
  `);

  return db;
}

export function getDb(): Database.Database {
  if (!global.__perGpDb) {
    global.__perGpDb = createDb();
  }
  return global.__perGpDb;
}
