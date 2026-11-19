import type { Tables, TablesInsert, TablesUpdate } from "./database";

export type User = Tables<"users">; // a row read from the table: every column is present
export type NewUser = TablesInsert<"users">; // for inserts: required columns must be given, columns with defaults (like id) are optional
export type UserUpdate = TablesUpdate<"users">; // for updates: every column is optional, pass only what you're changing
