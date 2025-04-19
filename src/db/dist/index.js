"use strict";
exports.__esModule = true;
exports.db = void 0;
var dotenv_1 = require("dotenv");
var libsql_1 = require("drizzle-orm/libsql");
var client_1 = require("@libsql/client");
dotenv_1.config({ path: ".env.local" });
var client = client_1.createClient({
    url: process.env.NEXT_PUBLIC_TURSO_CONNECTION_URL,
    authToken: process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN
});
exports.db = libsql_1.drizzle(client);
