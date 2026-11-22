
import "server-only";

import dns from "node:dns";
import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

// Use explicit DNS resolvers only for local development.
if (process.env.NODE_ENV === "development") {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

// Validate the connection string before initializing Better Auth.
const mongoUri = process.env.BETTER_AUTH_DB_URI;

if (!mongoUri) {
    throw new Error("BETTER_AUTH_DB_URI is missing");
}

// Reuse one MongoClient within each Node.js runtime instance.
type MongoGlobal = typeof globalThis & {
    __jontroLagbeMongoClient?: MongoClient;
};

const globalForMongo = globalThis as MongoGlobal;

const client =
    globalForMongo.__jontroLagbeMongoClient ??
    new MongoClient(mongoUri, {
        maxPoolSize: 5,
        minPoolSize: 0,
        maxConnecting: 2,
        maxIdleTimeMS: 60_000,
        appName: "JontroLagbe-BetterAuth",
    });

globalForMongo.__jontroLagbeMongoClient = client;

// Same database used by the Express server.
const db = client.db("jontrolagbedb");

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6,
    },

    user: {
        additionalFields: {
            role: {
                type: "string",
                input: false,
                defaultValue: "customer",
            },
            phone: {
                type: "string",
                required: false,
            },
            address: {
                type: "string",
                required: false,
            },
        },
    },

    session: {
        cookieCache: {
            enabled: true,
            strategy: "jwt",
            maxAge: 60,
        },
    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },

    plugins: [jwt()],

    // Keep the replica-set client so MongoDB transactions remain enabled.
    database: mongodbAdapter(db, { client }),
});
